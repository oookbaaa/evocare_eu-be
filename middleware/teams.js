const { body, param, query } = require('express-validator');

// Validation rules for creating/updating team members
const teamMemberValidationRules = [
  body('first_name')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .trim(),

  body('last_name')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .trim(),

  body('position')
    .notEmpty()
    .withMessage('Position is required')
    .isString()
    .withMessage('Position must be a string')
    .trim(),

  body('bio').optional().isString().withMessage('Bio must be a string'),

  body('photo_url')
    .optional()
    .isString()
    .withMessage('Photo URL must be a string')
    .trim(),

  body('linkedin_url')
    .optional()
    .isString()
    .withMessage('LinkedIn URL must be a string')
    .isURL()
    .withMessage('LinkedIn URL must be a valid URL')
    .trim(),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),

  body('department')
    .optional()
    .isString()
    .withMessage('Department must be a string')
    .trim(),

  body('is_leadership')
    .optional()
    .isBoolean()
    .withMessage('Is leadership must be a boolean'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

];

// Validation rules for team member ID parameter
const teamMemberIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Team member ID must be a positive integer'),

];

// Validation rules for filtering team members
const teamMemberFilterValidationRules = [
  query('department')
    .optional()
    .isString()
    .withMessage('Department must be a string')
    .trim(),

  query('is_leadership')
    .optional()
    .isBoolean()
    .withMessage('Is leadership must be a boolean')
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

// Validation rules for creating/updating departments
const departmentValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Department name is required')
    .isString()
    .withMessage('Department name must be a string')
    .trim(),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),

];

// Validation rules for department ID parameter
const departmentIdValidationRules = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Department ID must be a positive integer'),

];

module.exports = {
  teamMemberValidationRules,
  teamMemberIdValidationRules,
  teamMemberFilterValidationRules,
  departmentValidationRules,
  departmentIdValidationRules,
};
