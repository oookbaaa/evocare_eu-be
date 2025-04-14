const { executeQuery } = require('../../config/database');

const getUserById = async (userId) => {
  const query = `SELECT * FROM users WHERE id = $1`; // Parameterized query to prevent SQL injection
  const params = [userId];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null; // Return the first user or null if not found
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

module.exports = {
  getUserById,
};
