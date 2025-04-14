const { body, param } = require('express-validator');



// Validation rules for solution
const solutionValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('image_url')
    .notEmpty()
    .withMessage('Image URL is required')
    .isString()
    .withMessage('Image URL must be a string')
    .trim(),

  body('link_url')
    .notEmpty()
    .withMessage('Link URL is required')
    .isString()
    .withMessage('Link URL must be a string')
    .trim(),

  body('business_line')
    .notEmpty()
    .withMessage('Business line is required')
    .isString()
    .withMessage('Business line must be a string')
    .trim(),

];

// Validation rules for product
const productValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('solution_id')
    .notEmpty()
    .withMessage('Solution ID is required')
    .isInt({ min: 1 })
    .withMessage('Solution ID must be a positive integer'),

];

// Validation rules for ID parameter
const idValidationRules = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),

];

// Validation rules for solution ID parameter
const solutionIdValidationRules = [
  param('solutionId')
    .isInt({ min: 1 })
    .withMessage('Solution ID must be a positive integer'),

];

// Validation rules for business line parameter
const businessLineValidationRules = [
  param('businessLine')
    .notEmpty()
    .withMessage('Business line is required')
    .isString()
    .withMessage('Business line must be a string')
    .trim(),

];

module.exports = {
  solutionValidationRules,
  productValidationRules,
  idValidationRules,
  solutionIdValidationRules,
  businessLineValidationRules,
};
