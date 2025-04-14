const { executeQuery } = require('../../config/database');


// Partners CRUD Operations
const getAllPartners = async () => {
  const query = `SELECT * FROM partners ORDER BY name`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all partners:', error);
    throw error;
  }
};

const getPartnerById = async (id) => {
  const query = `SELECT * FROM partners WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching partner by id:', error);
    throw error;
  }
};

const createPartner = async (partnerData) => {
  const { name, image_url, description, website_url } = partnerData;
  const query = `INSERT INTO partners (name, image_url, description, website_url) VALUES (?, ?, ?, ?)`;
  const params = [name, image_url, description, website_url];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...partnerData };
  } catch (error) {
    console.error('Error creating partner:', error);
    throw error;
  }
};

const updatePartner = async (id, partnerData) => {
  const { name, image_url, description, website_url } = partnerData;
  const query = `UPDATE partners SET name = ?, image_url = ?, description = ?, website_url = ? WHERE id = ?`;
  const params = [name, image_url, description, website_url, id];

  try {
    await executeQuery(query, params);
    return { id, ...partnerData };
  } catch (error) {
    console.error('Error updating partner:', error);
    throw error;
  }
};

const deletePartner = async (id) => {
  const query = `DELETE FROM partners WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting partner:', error);
    throw error;
  }
};


module.exports = {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};
