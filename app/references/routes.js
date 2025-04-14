const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
  referenceValidationRules,
  referenceIdValidationRules,
  referenceFilterValidationRules,
} = require('../../middleware/references');

/**
 * References Routes
 */
// Get all references
router.get(
  '/',
  referenceFilterValidationRules,
  controller.getAllReferences
);

// Get featured references
router.get('/featured', controller.getFeaturedReferences);

// Get reference by ID
router.get(
  '/:id',
  referenceIdValidationRules,
  controller.getReferenceById
);

// Create reference - admin only
router.post(
  '/',
  referenceValidationRules,
  controller.createReference
);

// Update reference - admin only
router.put(
  '/:id',
  referenceIdValidationRules,
  referenceValidationRules,
  controller.updateReference
);

// Delete reference - admin only
router.delete(
  '/:id',
  referenceIdValidationRules,
  controller.deleteReference
);

/**
 * Complete Data Route - gets page content and all references in one call
 */
router.get('/complete-data', controller.getCompleteReferencesData);

module.exports = router;
