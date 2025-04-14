const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: process.env.DB_POOL_MAX
    ? parseInt(process.env.DB_POOL_MAX)
    : 10,
  waitForConnections: true,
  queueLimit: 0,
});

// Function to execute a query
const executeQuery = async (query, params = []) => {
  let connection;
  let results;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    if (process.env.QUERY_LOG === 'true') {
      console.log('Executing Query:', query, params);
    }

    const [rows] = await connection.query(query, params);
    results = rows;

    await connection.commit();
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }

  return results;
};

// Function to run SQL migration files
const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, '../db_migrations');

  try {
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql') && !file.includes('_migrated'));

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      console.log(`Running migration: ${file}`);

      try {
        // For MySQL, we need to execute each statement separately
        // because MySQL doesn't support executing multiple statements at once
        // Split by semicolons but ignore semicolons inside string literals
        const statements = sql
          .split(';')
          .map((statement) => statement.trim())
          .filter((statement) => statement.length > 0);

        for (const statement of statements) {
          if (statement) {
            await executeQuery(statement);
          }
        }

        const newFileName = `${file.replace('.sql', '')}_migrated.sql`;
        fs.renameSync(filePath, path.join(migrationsDir, newFileName));
        console.log(`Migration completed: ${file} -> ${newFileName}`);
      } catch (err) {
        console.error(`Migration failed for ${file}:`, err.message);
      }
    }
  } catch (err) {
    console.error('Error reading migration files:', err.message);
  }
};

module.exports = {
  executeQuery,
  pool,
  runMigrations,
};
