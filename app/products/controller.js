const model = require('./model');

/**
 * Category Controllers
 */
const getCategories = async (req, res) => {
  try {
    const categories = await model.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching categories', error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await model.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching category', error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await model.createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating category', error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    // First check if category exists
    const existingCategory = await model.getCategoryById(req.params.id);

    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = await model.updateCategory(req.params.id, req.body);
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error updating category', error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    // Check if category exists
    const existingCategory = await model.getCategoryById(req.params.id);

    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if there are products using this category
    const productsWithCategory = await model.getProductsByCategory(
      req.params.id
    );

    if (productsWithCategory && productsWithCategory.length > 0) {
      return res.status(400).json({
        message:
          'Cannot delete category that has products. Reassign or delete products first.',
      });
    }

    const success = await model.deleteCategory(req.params.id);

    if (!success) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting category', error: error.message });
  }
};

/**
 * Product Controllers
 */
const getProducts = async (req, res) => {
  try {
    const products = await model.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching products', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await model.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching product', error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    // Check if category exists
    const category = await model.getCategoryById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await model.getProductsByCategory(req.params.categoryId);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching products by category',
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    // Verify category exists
    const categoryExists = await model.getCategoryById(req.body.category_id);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Use the request body directly, as it already has the right field names
    const productData = {
      ...req.body,
    };

    // No need to map fields if the request body matches the database schema

    const product = await model.createProduct(productData);

    return res.status(201).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error creating product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    // First check if the product exists
    const existingProduct = await model.getProductById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If category_id is being updated, verify it exists
    if (req.body.category_id) {
      const categoryExists = await model.getCategoryById(req.body.category_id);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
    }

    // Use the request body directly
    const productData = {
      ...req.body,
    };

    const product = await model.updateProduct(req.params.id, productData);

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error updating product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await model.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message });
  }
};

const getCompleteProductsData = async (req, res) => {
  try {
    const data = await model.getCompleteProductsData();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching complete products data',
      error: error.message,
    });
  }
};

module.exports = {
  // Categories
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,

  // Products
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,

  // Complete Data
  getCompleteProductsData,
};
