const { body, param, query } = require('express-validator');

// Validation rules for creating/updating references
const referenceValidationRules = [
  body('client_name')
    .notEmpty()
    .withMessage('Client name is required')
    .isString()
    .withMessage('Client name must be a string')
    .trim(),

  body('project_title')
    .notEmpty()
    .withMessage('Project title is required')
    .isString()
    .withMessage('Project title must be a string')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('logo_url')
    .optional()
    .isString()
    .withMessage('Logo URL must be a string')
    .trim(),

  body('industry')
    .optional()
    .isString()
    .withMessage('Industry must be a string')
    .trim(),

  body('year_completed')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(
      `Year completed must be a valid year between 1900 and ${new Date().getFullYear()}`
    ),

  body('solution_ids')
    .optional()
    .isArray()
    .withMessage('Solution IDs must be an array'),

  body('solution_ids.*')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Each solution ID must be a positive integer'),

  body('is_featured')
    .optional()
    .isBoolean()
    .withMessage('Is featured must be a boolean'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

];

// Validation rules for reference ID parameter
const referenceIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Reference ID must be a positive integer'),

];

// Validation rules for filtering references
const referenceFilterValidationRules = [
  query('industry')
    .optional()
    .isString()
    .withMessage('Industry must be a string')
    .trim(),

  query('solution_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Solution ID must be a positive integer')
    .toInt(),

  query('year_from')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(
      `Year from must be a valid year between 1900 and ${new Date().getFullYear()}`
    )
    .toInt(),

  query('year_to')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage(
      `Year to must be a valid year between 1900 and ${new Date().getFullYear()}`
    )
    .toInt(),

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
  referenceValidationRules,
  referenceIdValidationRules,
  referenceFilterValidationRules,
};
