const { executeQuery } = require('../../config/database');

// Client References CRUD Operations
const getAllReferences = async () => {
  const query = `SELECT * FROM client_references ORDER BY created_at DESC`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all references:', error);
    throw error;
  }
};

const getFeaturedReferences = async () => {
  const query = `SELECT * FROM client_references WHERE is_featured = 1 ORDER BY created_at DESC`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching featured references:', error);
    throw error;
  }
};

const getReferenceById = async (id) => {
  const query = `SELECT * FROM client_references WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching reference by id:', error);
    throw error;
  }
};

const createReference = async (referenceData) => {
  const {
    client_name,
    company_name,
    position,
    testimonial,
    image_url,
    country,
    rating,
    is_featured,
  } = referenceData;
  const query = `INSERT INTO client_references 
                (client_name, company_name, position, testimonial, image_url, country, rating, is_featured) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    client_name,
    company_name,
    position,
    testimonial,
    image_url,
    country,
    rating,
    is_featured || false,
  ];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...referenceData };
  } catch (error) {
    console.error('Error creating reference:', error);
    throw error;
  }
};

const updateReference = async (id, referenceData) => {
  const {
    client_name,
    company_name,
    position,
    testimonial,
    image_url,
    country,
    rating,
    is_featured,
  } = referenceData;
  const query = `UPDATE client_references SET 
                client_name = ?, company_name = ?, position = ?, testimonial = ?, 
                image_url = ?, country = ?, rating = ?, is_featured = ? 
                WHERE id = ?`;
  const params = [
    client_name,
    company_name,
    position,
    testimonial,
    image_url,
    country,
    rating,
    is_featured || false,
    id,
  ];

  try {
    await executeQuery(query, params);
    return { id, ...referenceData };
  } catch (error) {
    console.error('Error updating reference:', error);
    throw error;
  }
};

const deleteReference = async (id) => {
  const query = `DELETE FROM client_references WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting reference:', error);
    throw error;
  }
};

// Get complete references data
const getCompleteReferencesData = async () => {
  try {
    const references = await getAllReferences();
    const featuredReferences = await getFeaturedReferences();

    return {
      references,
      featuredReferences,
    };
  } catch (error) {
    console.error('Error fetching complete references data:', error);
    throw error;
  }
};

module.exports = {
  // Client References
  getAllReferences,
  getFeaturedReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,

  // Complete Data
  getCompleteReferencesData,
};
