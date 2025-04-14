const newsModel = require('./model');
const { validationResult } = require('express-validator');

// News Controllers
const getAllNews = async (req, res) => {
  try {
    const news = await newsModel.getAllNews();
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Error in getAllNews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
      error: error.message,
    });
  }
};

const getFeaturedNews = async (req, res) => {
  try {
    const featuredNews = await newsModel.getFeaturedNews();
    res.status(200).json({
      success: true,
      data: featuredNews,
    });
  } catch (error) {
    console.error('Error in getFeaturedNews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured news',
      error: error.message,
    });
  }
};

const getNewsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const news = await newsModel.getNewsByCategory(categoryId);
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Error in getNewsByCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news by category',
      error: error.message,
    });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newsModel.getNewsById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: `News with id ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Error in getNewsById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
      error: error.message,
    });
  }
};

const createNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const newNews = await newsModel.createNews(req.body);
    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: newNews,
    });
  } catch (error) {
    console.error('Error in createNews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create news',
      error: error.message,
    });
  }
};

const updateNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const newsExists = await newsModel.getNewsById(id);

    if (!newsExists) {
      return res.status(404).json({
        success: false,
        message: `News with id ${id} not found`,
      });
    }

    const updatedNews = await newsModel.updateNews(id, req.body);
    res.status(200).json({
      success: true,
      message: 'News updated successfully',
      data: updatedNews,
    });
  } catch (error) {
    console.error('Error in updateNews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update news',
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const newsExists = await newsModel.getNewsById(id);

    if (!newsExists) {
      return res.status(404).json({
        success: false,
        message: `News with id ${id} not found`,
      });
    }

    const deleted = await newsModel.deleteNews(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'News deleted successfully',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete news',
      });
    }
  } catch (error) {
    console.error('Error in deleteNews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete news',
      error: error.message,
    });
  }
};

module.exports = {
  getAllNews,
  getFeaturedNews,
  getNewsByCategory,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
