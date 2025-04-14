const { executeQuery } = require('../../config/database');

// Service Categories CRUD Operations
const getAllServiceCategories = async () => {
  const query = `SELECT * FROM service_categories ORDER BY name ASC`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all service categories:', error);
    throw error;
  }
};

const getServiceCategoryById = async (id) => {
  const query = `SELECT * FROM service_categories WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching service category by id:', error);
    throw error;
  }
};

const createServiceCategory = async (categoryData) => {
  const { name, description, icon_url } = categoryData;
  const query = `
    INSERT INTO service_categories 
    (name, description, icon_url) 
    VALUES (?, ?, ?)
  `;
  const params = [name, description, icon_url];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...categoryData };
  } catch (error) {
    console.error('Error creating service category:', error);
    throw error;
  }
};

const updateServiceCategory = async (id, categoryData) => {
  const { name, description, icon_url } = categoryData;
  const query = `
    UPDATE service_categories SET 
    name = ?, description = ?, icon_url = ? 
    WHERE id = ?
  `;
  const params = [name, description, icon_url, id];

  try {
    await executeQuery(query, params);
    return { id, ...categoryData };
  } catch (error) {
    console.error('Error updating service category:', error);
    throw error;
  }
};

const deleteServiceCategory = async (id) => {
  const query = `DELETE FROM service_categories WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting service category:', error);
    throw error;
  }
};

// Services CRUD Operations
const getAllServices = async () => {
  const query = `
    SELECT s.*, sc.name as category_name 
    FROM services s
    LEFT JOIN service_categories sc ON s.category_id = sc.id
    ORDER BY s.name ASC
  `;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};

const getServicesByCategory = async (categoryId) => {
  const query = `
    SELECT s.*, sc.name as category_name 
    FROM services s
    LEFT JOIN service_categories sc ON s.category_id = sc.id
    WHERE s.category_id = ?
    ORDER BY s.name ASC
  `;
  const params = [categoryId];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    throw error;
  }
};

const getServiceById = async (id) => {
  const query = `
    SELECT s.*, sc.name as category_name 
    FROM services s
    LEFT JOIN service_categories sc ON s.category_id = sc.id
    WHERE s.id = ?
  `;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching service by id:', error);
    throw error;
  }
};

const createService = async (serviceData) => {
  const { name, description, image_url, category_id } = serviceData;
  const query = `
    INSERT INTO services 
    (name, description, image_url, category_id) 
    VALUES (?, ?, ?, ?)
  `;
  const params = [name, description, image_url, category_id || null];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...serviceData };
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

const updateService = async (id, serviceData) => {
  const { name, description, image_url, category_id } = serviceData;
  const query = `
    UPDATE services SET 
    name = ?, description = ?, image_url = ?, category_id = ? 
    WHERE id = ?
  `;
  const params = [name, description, image_url, category_id || null, id];

  try {
    await executeQuery(query, params);
    return { id, ...serviceData };
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

const deleteService = async (id) => {
  const query = `DELETE FROM services WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Get complete services data
const getCompleteServicesData = async () => {
  try {
    const categories = await getAllServiceCategories();

    // For each category, fetch its services
    const categoriesWithServices = await Promise.all(
      categories.map(async (category) => {
        const services = await getServicesByCategory(category.id);
        return { ...category, services };
      })
    );

    return {
      categories: categoriesWithServices,
    };
  } catch (error) {
    console.error('Error fetching complete services data:', error);
    throw error;
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
