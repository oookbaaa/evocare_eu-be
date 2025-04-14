const { body, param, query } = require('express-validator');

// Validation rules for creating/updating testimonials
const testimonialValidationRules = [
  body('author_name')
    .notEmpty()
    .withMessage('Author name is required')
    .isString()
    .withMessage('Author name must be a string')
    .trim(),

  body('author_title')
    .optional()
    .isString()
    .withMessage('Author title must be a string')
    .trim(),

  body('company')
    .optional()
    .isString()
    .withMessage('Company must be a string')
    .trim(),

  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('avatar_url')
    .optional()
    .isString()
    .withMessage('Avatar URL must be a string')
    .trim(),

  body('related_solution_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Related solution ID must be a positive integer'),

  body('is_featured')
    .optional()
    .isBoolean()
    .withMessage('Is featured must be a boolean'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

];

// Validation rules for testimonial ID parameter
const testimonialIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Testimonial ID must be a positive integer'),

];

// Validation rules for filtering testimonials
const testimonialFilterValidationRules = [
  query('solution_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Solution ID must be a positive integer')
    .toInt(),

  query('is_featured')
    .optional()
    .isBoolean()
    .withMessage('Is featured must be a boolean')
    .toBoolean(),

  query('min_rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Minimum rating must be an integer between 1 and 5')
    .toInt(),

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
  testimonialValidationRules,
  testimonialIdValidationRules,
  testimonialFilterValidationRules,
};
