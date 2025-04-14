const express = require('express');
const router = express.Router();
const controller = require('./controller');

const {
  eventValidationRules,
  eventIdValidationRules,
  eventFilterValidationRules,
} = require('../../middleware/events');

// Public event routes
router.get('/', eventFilterValidationRules, controller.getAllEvents);
router.get('/:id', eventIdValidationRules, controller.getEventById);

// Protected event routes (requires authentication)
router.post(
  '/',
  eventValidationRules,
  controller.createEvent
);
router.put(
  '/:id',
  eventIdValidationRules,
  eventValidationRules,
  controller.updateEvent
);
router.delete(
  '/:id',
  eventIdValidationRules,
  controller.deleteEvent
);

// Event media routes
router.get(
  '/:eventId/media',
  eventIdValidationRules,
  controller.getMediaByEventId
);
router.post(
  '/:eventId/media',
  eventIdValidationRules,
  controller.addEventMedia
);
router.put(
  '/:eventId/media/:mediaId',
  eventIdValidationRules,
  controller.updateEventMedia
);
router.delete(
  '/:eventId/media/:mediaId',
  eventIdValidationRules,
  controller.deleteEventMedia
);

module.exports = router;
