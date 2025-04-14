const { body, param, query } = require('express-validator');

// Validation rules for creating/updating media
const mediaValidationRules = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim(),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('type')
    .notEmpty()
    .withMessage('Media type is required')
    .isString()
    .withMessage('Media type must be a string')
    .isIn(['image', 'video', 'document', 'audio'])
    .withMessage('Media type must be one of: image, video, document, audio')
    .trim(),

  body('url')
    .notEmpty()
    .withMessage('URL is required')
    .isString()
    .withMessage('URL must be a string')
    .trim(),

  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .trim(),

  body('tags').optional().isArray().withMessage('Tags must be an array'),

  body('tags.*')
    .optional()
    .isString()
    .withMessage('Each tag must be a string')
    .trim(),

];

// Validation rules for media ID parameter
const mediaIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Media ID must be a positive integer'),

];

// Validation rules for filtering media
const mediaFilterValidationRules = [
  query('type')
    .optional()
    .isString()
    .withMessage('Type must be a string')
    .isIn(['image', 'video', 'document', 'audio'])
    .withMessage('Type must be one of: image, video, document, audio')
    .trim(),

  query('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .trim(),

  query('tag').optional().isString().withMessage('Tag must be a string').trim(),

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
  mediaValidationRules,
  mediaIdValidationRules,
  mediaFilterValidationRules,
};
