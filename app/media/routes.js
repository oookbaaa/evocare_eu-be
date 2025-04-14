const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
  mediaValidationRules,
  mediaIdValidationRules,
  mediaFilterValidationRules,
} = require('../../middleware/media');

// Public media routes
router.get('/', mediaFilterValidationRules, controller.getAllMedia);
router.get('/search', mediaFilterValidationRules, controller.searchMedia);
router.get('/type/:type', controller.getMediaByType);
router.get('/:id', mediaIdValidationRules, controller.getMediaById);

// Protected media routes (requires authentication)
router.post(
  '/',
  mediaValidationRules,
  controller.createMedia
);
router.put(
  '/:id',
  mediaIdValidationRules,
  mediaValidationRules,
  controller.updateMedia
);
router.delete(
  '/:id',
  mediaIdValidationRules,
  controller.deleteMedia
);

module.exports = router;
