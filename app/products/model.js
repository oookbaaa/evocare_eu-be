const { executeQuery } = require('../../config/database');

// Product Categories CRUD Operations
const getAllCategories = async () => {
  const query = `SELECT * FROM product_categories ORDER BY name`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error;
  }
};

const getCategoryById = async (id) => {
  const query = `SELECT * FROM product_categories WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching category by id:', error);
    throw error;
  }
};

const createCategory = async (categoryData) => {
  const { name, description, image_url, icon_url } = categoryData;
  const query = `INSERT INTO product_categories (name, description, image_url, icon_url) VALUES (?, ?, ?, ?)`;
  const params = [name, description, image_url, icon_url];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...categoryData };
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

const updateCategory = async (id, categoryData) => {
  const { name, description, image_url, icon_url } = categoryData;
  const query = `UPDATE product_categories SET name = ?, description = ?, image_url = ?, icon_url = ? WHERE id = ?`;
  const params = [name, description, image_url, icon_url, id];

  try {
    await executeQuery(query, params);
    return { id, ...categoryData };
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  const query = `DELETE FROM product_categories WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Products CRUD Operations
const getAllProducts = async () => {
  const query = `
    SELECT p.*, pc.name as category_name 
    FROM products p
    LEFT JOIN product_categories pc ON p.category_id = pc.id
    ORDER BY p.name`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  const query = `
    SELECT p.*, pc.name as category_name 
    FROM products p
    JOIN product_categories pc ON p.category_id = pc.id
    WHERE p.id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

const getProductsByCategory = async (categoryId) => {
  const query = `
    SELECT p.*, pc.name as category_name 
    FROM products p
    JOIN product_categories pc ON p.category_id = pc.id
    WHERE p.category_id = ?
    ORDER BY p.name`;
  const params = [categoryId];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

const createProduct = async (productData) => {
  const { name, description, category_id, image_url } = productData;
  const query = `INSERT INTO products (name, description, category_id, image_url) VALUES (?, ?, ?, ?)`;
  const params = [name, description, category_id, image_url];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...productData };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  const { name, description, category_id, image_url } = productData;
  const query = `UPDATE products SET name = ?, description = ?, category_id = ?, image_url = ? WHERE id = ?`;
  const params = [name, description, category_id, image_url, id];

  try {
    await executeQuery(query, params);
    return { id, ...productData };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM products WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get complete products data
const getCompleteProductsData = async () => {
  try {
    const categories = await getAllCategories();
    const products = await getAllProducts();

    // Organize products by category
    const categoriesWithProducts = categories.map((category) => {
      const categoryProducts = products.filter(
        (product) => product.category_id === category.id
      );
      return {
        ...category,
        products: categoryProducts,
      };
    });

    return {
      categories: categoriesWithProducts,
    };
  } catch (error) {
    console.error('Error fetching complete products data:', error);
    throw error;
  }
};

module.exports = {
  // Product Categories
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,

  // Products
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,

  // Complete Data
  getCompleteProductsData,
};
