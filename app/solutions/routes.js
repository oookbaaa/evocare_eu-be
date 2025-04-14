const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
  solutionValidationRules,
  idValidationRules,
  solutionIdValidationRules,
  productValidationRules,
  businessLineValidationRules,
} = require('../../middleware/solutions');

const { productIdValidationRules } = require('../../middleware/products');

/**
 * Solutions Routes
 */
// Get all solutions
router.get('/', controller.getAllSolutions);

// Get complete data - gets solutions and their products in one call
router.get('/complete-data', controller.getCompleteSolutionsData);

// Get solutions by business line
router.get(
  '/business-line/:businessLine',
  businessLineValidationRules,
  controller.getSolutionsByBusinessLine
);

// Get solution by ID (includes products)
router.get('/:id', idValidationRules, controller.getSolutionById);

// Create solution - admin only
router.post('/', solutionValidationRules, controller.createSolution);

// Update solution - admin only
router.put(
  '/:id',
  idValidationRules,
  solutionValidationRules,
  controller.updateSolution
);

// Delete solution - admin only
router.delete('/:id', idValidationRules, controller.deleteSolution);

/**
 * Solution Products Routes
 */
// Get solution products by solution ID
router.get(
  '/:solutionId/products',
  solutionIdValidationRules,
  controller.getProductsBySolutionId
);

// Get solution product by ID
router.get('/products/:id', idValidationRules, controller.getProductById);

// Create solution product - admin only
router.post('/products', productValidationRules, controller.createProduct);

// Update solution product - admin only
router.put(
  '/products/:id',
  idValidationRules,
  productValidationRules,
  controller.updateProduct
);

// Delete solution product - admin only
router.delete('/products/:id', idValidationRules, controller.deleteProduct);

module.exports = router;
