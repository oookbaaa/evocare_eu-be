const express = require('express');
const { body } = require('express-validator');
const newsController = require('./controller');
const auth = require('../../middleware/auth');

const router = express.Router();

// GET /api/news - Get all news articles
router.get('/', newsController.getAllNews);

// GET /api/news/featured - Get featured news
router.get('/featured', newsController.getFeaturedNews);

// GET /api/news/category/:categoryId - Get news by category
router.get('/category/:categoryId', newsController.getNewsByCategory);

// GET /api/news/:id - Get a specific news article by ID
router.get('/:id', newsController.getNewsById);

// POST /api/news - Create a new news article (protected)
router.post(
  '/',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('subtitle').not().isEmpty().withMessage('Subtitle is required'),
    body('publish_date').isDate().withMessage('Valid publish date is required'),
    body('content').not().isEmpty().withMessage('Content is required'),
  ],
  newsController.createNews
);

// PUT /api/news/:id - Update a news article (protected)
router.put(
  '/:id',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('subtitle').not().isEmpty().withMessage('Subtitle is required'),
    body('publish_date').isDate().withMessage('Valid publish date is required'),
    body('content').not().isEmpty().withMessage('Content is required'),
  ],
  newsController.updateNews
);

// DELETE /api/news/:id - Delete a news article (protected)
router.delete('/:id', newsController.deleteNews);

module.exports = router;
