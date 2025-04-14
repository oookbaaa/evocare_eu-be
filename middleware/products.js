const { body, param, query } = require('express-validator');

// Validation rules for creating/updating products
const productValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('short_description')
    .optional()
    .isString()
    .withMessage('Short description must be a string')
    .trim(),

  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),

  body('features.*')
    .optional()
    .isString()
    .withMessage('Each feature must be a string')
    .trim(),

  body('image_url')
    .optional()
    .isString()
    .withMessage('Image URL must be a string')
    .trim(),

  body('solution_id')
    .notEmpty()
    .withMessage('Solution ID is required')
    .isInt({ min: 1 })
    .withMessage('Solution ID must be a positive integer'),

  body('documentation_url')
    .optional()
    .isString()
    .withMessage('Documentation URL must be a string')
    .trim(),

  body('demo_url')
    .optional()
    .isString()
    .withMessage('Demo URL must be a string')
    .trim(),

  body('price_info')
    .optional()
    .isString()
    .withMessage('Price info must be a string')
    .trim(),

  body('is_featured')
    .optional()
    .isBoolean()
    .withMessage('Is featured must be a boolean'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

];

// Validation rules for product ID parameter
const productIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),

];

// Validation rules for solution ID parameter
const solutionIdValidationRules = [
  param('solutionId')
    .isInt({ min: 1 })
    .withMessage('Solution ID must be a positive integer'),

];

// Validation rules for filtering products
const productFilterValidationRules = [
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

  query('search')
    .optional()
    .isString()
    .withMessage('Search query must be a string')
    .trim(),

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
  productValidationRules,
  productIdValidationRules,
  solutionIdValidationRules,
  productFilterValidationRules,
};
