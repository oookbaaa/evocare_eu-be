const { body, param, query } = require('express-validator');

// Validation rules for creating/updating partners
const partnerValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('logo_url')
    .notEmpty()
    .withMessage('Logo URL is required')
    .isString()
    .withMessage('Logo URL must be a string')
    .trim(),

  body('website_url')
    .optional()
    .isString()
    .withMessage('Website URL must be a string')
    .isURL()
    .withMessage('Website URL must be a valid URL')
    .trim(),

  body('partnership_level')
    .optional()
    .isString()
    .withMessage('Partnership level must be a string')
    .isIn(['platinum', 'gold', 'silver', 'bronze', 'other'])
    .withMessage(
      'Partnership level must be one of: platinum, gold, silver, bronze, other'
    )
    .trim(),

  body('industry')
    .optional()
    .isString()
    .withMessage('Industry must be a string')
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

// Validation rules for partner ID parameter
const partnerIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Partner ID must be a positive integer'),

];

// Validation rules for filtering partners
const partnerFilterValidationRules = [
  query('partnership_level')
    .optional()
    .isString()
    .withMessage('Partnership level must be a string')
    .trim(),

  query('industry')
    .optional()
    .isString()
    .withMessage('Industry must be a string')
    .trim(),

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
  partnerValidationRules,
  partnerIdValidationRules,
  partnerFilterValidationRules,
};
