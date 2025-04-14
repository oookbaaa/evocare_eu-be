const { executeQuery } = require('../../config/database');

// Solutions CRUD Operations
const getAllSolutions = async () => {
  const query = `SELECT * FROM solutions ORDER BY created_at DESC`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all solutions:', error);
    throw error;
  }
};

const getSolutionsByBusinessLine = async (businessLine) => {
  const query = `SELECT * FROM solutions WHERE business_line = ? ORDER BY created_at DESC`;
  const params = [businessLine];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching solutions by business line:', error);
    throw error;
  }
};

const getSolutionById = async (id) => {
  const query = `SELECT * FROM solutions WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching solution by id:', error);
    throw error;
  }
};

const createSolution = async (solutionData) => {
  const { name, description, image_url, link_url, business_line } =
    solutionData;
  const query = `INSERT INTO solutions 
                (name, description, image_url, link_url, business_line) 
                VALUES (?, ?, ?, ?, ?)`;
  const params = [name, description, image_url, link_url, business_line];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...solutionData };
  } catch (error) {
    console.error('Error creating solution:', error);
    throw error;
  }
};

const updateSolution = async (id, solutionData) => {
  const { name, description, image_url, link_url, business_line } =
    solutionData;
  const query = `UPDATE solutions SET 
                name = ?, description = ?, image_url = ?, link_url = ?, business_line = ? 
                WHERE id = ?`;
  const params = [name, description, image_url, link_url, business_line, id];

  try {
    await executeQuery(query, params);
    return { id, ...solutionData };
  } catch (error) {
    console.error('Error updating solution:', error);
    throw error;
  }
};

const deleteSolution = async (id) => {
  const query = `DELETE FROM solutions WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting solution:', error);
    throw error;
  }
};

// Solutions Products CRUD Operations
const getProductsBySolutionId = async (solutionId) => {
  const query = `SELECT * FROM solutions_products WHERE solution_id = ? ORDER BY created_at DESC`;
  const params = [solutionId];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching solution products by solution id:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  const query = `SELECT * FROM solutions_products WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching solution product by id:', error);
    throw error;
  }
};

const createProduct = async (productData) => {
  const { name, description, solution_id } = productData;
  const query = `INSERT INTO solutions_products 
                (name, description, solution_id) 
                VALUES (?, ?, ?)`;
  const params = [name, description, solution_id];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...productData };
  } catch (error) {
    console.error('Error creating solution product:', error);
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  const { name, description, solution_id } = productData;
  const query = `UPDATE solutions_products SET 
                name = ?, description = ?, solution_id = ? 
                WHERE id = ?`;
  const params = [name, description, solution_id, id];

  try {
    await executeQuery(query, params);
    return { id, ...productData };
  } catch (error) {
    console.error('Error updating solution product:', error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM solutions_products WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting solution product:', error);
    throw error;
  }
};

// Get complete solutions data
const getCompleteSolutionsData = async () => {
  try {
    const solutions = await getAllSolutions();

    // For each solution, fetch its products
    const solutionsWithProducts = await Promise.all(
      solutions.map(async (solution) => {
        const products = await getProductsBySolutionId(solution.id);
        return { ...solution, products };
      })
    );

    return {
      solutions: solutionsWithProducts,
    };
  } catch (error) {
    console.error('Error fetching complete solutions data:', error);
    throw error;
  }
};

module.exports = {
  // Solutions
  getAllSolutions,
  getSolutionsByBusinessLine,
  getSolutionById,
  createSolution,
  updateSolution,
  deleteSolution,

  // Solutions Products
  getProductsBySolutionId,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

  // Complete Data
  getCompleteSolutionsData,
};
