const express = require('express');
const router = express.Router();
const controller = require('./controller');
const auth = require('../../middleware/auth');
const {
  contentValidationRules,
  contentIdValidationRules,
  sectionValidationRules,
} = require('../../middleware/contents');

/**
 * Content Routes
 */
// Public routes - Read content
router.get('/', controller.getAllContent);
router.get('/sections', controller.getContentSections);
router.get(
  '/section/:section',
  sectionValidationRules,
  controller.getContentBySection
);
router.get(
  '/:id',
  contentIdValidationRules,
  controller.getContentById
);

// Protected routes - Create, Update, Delete (admin only)
router.post('/', contentValidationRules, controller.createContent);

router.put(
  '/:id',
  contentIdValidationRules,
  contentValidationRules,
  controller.updateContent
);

router.delete(
  '/:id',
  contentIdValidationRules,
  controller.deleteContent
);

module.exports = router;
