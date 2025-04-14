const { body, param } = require('express-validator');

// Validation rules for creating/updating content
const contentValidationRules = [
  body('section')
    .notEmpty()
    .withMessage('Section is required')
    .isString()
    .withMessage('Section must be a string')
    .trim(),

  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .trim(),

  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

];

// Validation rules for content ID parameter
const contentIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Content ID must be a positive integer'),

];

// Validation rules for section parameter
const sectionValidationRules = [
  param('section')
    .notEmpty()
    .withMessage('Section name is required')
    .isString()
    .withMessage('Section name must be a string')
    .trim(),

];

module.exports = {
  contentValidationRules,
  contentIdValidationRules,
  sectionValidationRules,
};
