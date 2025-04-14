const { body, param, query } = require('express-validator');

// Validation rules for creating/updating an event
const eventValidationRules = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO8601 date'),

  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO8601 date'),

  body('location')
    .notEmpty()
    .withMessage('Location is required')
    .isString()
    .withMessage('Location must be a string')
    .trim(),

  body('image_url')
    .optional()
    .isString()
    .withMessage('Image URL must be a string')
    .trim(),

  body('registration_url')
    .optional()
    .isString()
    .withMessage('Registration URL must be a string')
    .trim(),

  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .trim(),

  body('is_featured')
    .optional()
    .isBoolean()
    .withMessage('Is featured must be a boolean'),

];

// Validation rules for event ID parameter
const eventIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Event ID must be a positive integer'),

];

// Validation rules for filtering events
const eventFilterValidationRules = [
  query('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .trim(),

  query('start_date')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO8601 date'),

  query('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO8601 date'),

  query('is_featured')
    .optional()
    .isBoolean()
    .withMessage('Is featured must be a boolean')
    .toBoolean(),

  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer')
    .toInt(),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer')
    .toInt(),

];

module.exports = {
  eventValidationRules,
  eventIdValidationRules,
  eventFilterValidationRules,
};
