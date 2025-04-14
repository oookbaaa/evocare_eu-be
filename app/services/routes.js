const express = require('express');
const { body } = require('express-validator');
const servicesController = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

// Service Categories Routes

// GET /api/services/categories - Get all service categories
router.get('/categories', servicesController.getAllServiceCategories);

// GET /api/services/categories/:id - Get a specific service category by ID
router.get('/categories/:id', servicesController.getServiceCategoryById);

// POST /api/services/categories - Create a new service category (protected)
router.post(
  '/categories',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('icon_url').not().isEmpty().withMessage('Icon URL is required'),
  ],
  servicesController.createServiceCategory
);

// PUT /api/services/categories/:id - Update a service category (protected)
router.put(
  '/categories/:id',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('icon_url').not().isEmpty().withMessage('Icon URL is required'),
  ],
  servicesController.updateServiceCategory
);

// DELETE /api/services/categories/:id - Delete a service category (protected)
router.delete('/categories/:id', servicesController.deleteServiceCategory);

// Services Routes

// GET /api/services - Get all services
router.get('/', servicesController.getAllServices);

// GET /api/services/category/:categoryId - Get services by category
router.get('/category/:categoryId', servicesController.getServicesByCategory);

// GET /api/services/:id - Get a specific service by ID
router.get('/:id', servicesController.getServiceById);

// POST /api/services - Create a new service (protected)
router.post(
  '/',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('image_url').not().isEmpty().withMessage('Image URL is required'),
  ],
  servicesController.createService
);

// PUT /api/services/:id - Update a service (protected)
router.put(
  '/:id',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('image_url').not().isEmpty().withMessage('Image URL is required'),
  ],
  servicesController.updateService
);

// DELETE /api/services/:id - Delete a service (protected)
router.delete('/:id', auth, servicesController.deleteService);

// Complete Data Route
// GET /api/services/data/complete - Get complete services data
router.get('/data/complete', servicesController.getCompleteServicesData);

module.exports = router;
