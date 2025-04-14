const servicesModel = require('./model');
const { validationResult } = require('express-validator');

// Service Categories Controllers
const getAllServiceCategories = async (req, res) => {
  try {
    const categories = await servicesModel.getAllServiceCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error in getAllServiceCategories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service categories',
      error: error.message,
    });
  }
};

const getServiceCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await servicesModel.getServiceCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Service category with id ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error in getServiceCategoryById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service category',
      error: error.message,
    });
  }
};

const createServiceCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const newCategory = await servicesModel.createServiceCategory(req.body);
    res.status(201).json({
      success: true,
      message: 'Service category created successfully',
      data: newCategory,
    });
  } catch (error) {
    console.error('Error in createServiceCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service category',
      error: error.message,
    });
  }
};

const updateServiceCategory = async (req, res) => {
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
    const categoryExists = await servicesModel.getServiceCategoryById(id);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: `Service category with id ${id} not found`,
      });
    }

    const updatedCategory = await servicesModel.updateServiceCategory(
      id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: 'Service category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    console.error('Error in updateServiceCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service category',
      error: error.message,
    });
  }
};

const deleteServiceCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryExists = await servicesModel.getServiceCategoryById(id);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: `Service category with id ${id} not found`,
      });
    }

    const deleted = await servicesModel.deleteServiceCategory(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Service category deleted successfully',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete service category',
      });
    }
  } catch (error) {
    console.error('Error in deleteServiceCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service category',
      error: error.message,
    });
  }
};

// Services Controllers
const getAllServices = async (req, res) => {
  try {
    const services = await servicesModel.getAllServices();
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error in getAllServices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: error.message,
    });
  }
};

const getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const services = await servicesModel.getServicesByCategory(categoryId);
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error in getServicesByCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services by category',
      error: error.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await servicesModel.getServiceById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service with id ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Error in getServiceById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service',
      error: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const newService = await servicesModel.createService(req.body);
    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService,
    });
  } catch (error) {
    console.error('Error in createService:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
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
    const serviceExists = await servicesModel.getServiceById(id);

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: `Service with id ${id} not found`,
      });
    }

    const updatedService = await servicesModel.updateService(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: updatedService,
    });
  } catch (error) {
    console.error('Error in updateService:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service',
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceExists = await servicesModel.getServiceById(id);

    if (!serviceExists) {
      return res.status(404).json({
        success: false,
        message: `Service with id ${id} not found`,
      });
    }

    const deleted = await servicesModel.deleteService(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Service deleted successfully',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete service',
      });
    }
  } catch (error) {
    console.error('Error in deleteService:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: error.message,
    });
  }
};

// Complete Data Controller
const getCompleteServicesData = async (req, res) => {
  try {
    const data = await servicesModel.getCompleteServicesData();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error in getCompleteServicesData:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complete services data',
      error: error.message,
    });
  }
};

module.exports = {
  // Service Categories
  getAllServiceCategories,
  getServiceCategoryById,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,

  // Services
  getAllServices,
  getServicesByCategory,
  getServiceById,
  createService,
  updateService,
  deleteService,

  // Complete Data
  getCompleteServicesData,
};
