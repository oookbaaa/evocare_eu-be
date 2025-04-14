const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX) : 10, // Pool max connections
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT
    ? parseInt(process.env.DB_IDLE_TIMEOUT)
    : 30000, // Idle timeout
  connectionTimeoutMillis: process.env.DB_CONN_TIMEOUT
    ? parseInt(process.env.DB_CONN_TIMEOUT)
    : 2000, // Connection timeout
});

// Function to execute a query with transaction management
const executeQuery = async (query, params = []) => {
  const client = await pool.connect();
  let results;
  try {
    await client.query("BEGIN");

    if (process.env.QUERY_LOG === "true") {
      console.log("Executing Query:", query, params);
    }

    const res = await client.query(query, params);
    results = res.rows;

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  return results;
};

// Function to run SQL migration files
const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, "../db_migrations");

  try {
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql") && !file.includes("_migrated"));

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");

      console.log(`Running migration: ${file}`);

      try {
        await executeQuery(sql);
        const newFileName = `${file.replace(".sql", "")}_migrated.sql`;
        fs.renameSync(filePath, path.join(migrationsDir, newFileName));
        console.log(`Migration completed: ${file} -> ${newFileName}`);
      } catch (err) {
        console.error(`Migration failed for ${file}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Error reading migration files:", err.message);
  }
};

module.exports = {
  executeQuery,
  pool,
  runMigrations,
};
