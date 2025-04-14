const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
  productValidationRules,
  productIdValidationRules,
  productFilterValidationRules,
  solutionIdValidationRules,
} = require('../../middleware/products');

/**
 * Category Routes
 */
// Get all categories
router.get('/categories', controller.getCategories);

// Get category by ID
router.get('/categories/:id', controller.getCategoryById);

// Create category - admin only
router.post('/categories', controller.createCategory);

// Update category - admin only
router.put('/categories/:id', controller.updateCategory);

// Delete category - admin only
router.delete('/categories/:id', controller.deleteCategory);

/**
 * Product Routes
 */
// Get all products with pagination and filters
router.get('/', productFilterValidationRules, controller.getProducts);

// Get product by ID
router.get('/:id', productIdValidationRules, controller.getProductById);

// Get products by category
router.get(
  '/categories/:categoryId/products',
  solutionIdValidationRules,
  controller.getProductsByCategory
);

// Create product - admin only
router.post('/', productValidationRules, controller.createProduct);

// Update product - admin only
router.put(
  '/:id',
  productIdValidationRules,
  productValidationRules,
  controller.updateProduct
);

// Delete product - admin only
router.delete('/:id', productIdValidationRules, controller.deleteProduct);



module.exports = router;
