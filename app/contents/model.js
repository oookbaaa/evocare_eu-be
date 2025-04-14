const { executeQuery } = require('../../config/database');

/**
 * About Content CRUD Operations
 */
// Get all about content
const getAllContent = async () => {
  const query = `SELECT * FROM about_content ORDER BY \`order\``;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all content:', error);
    throw error;
  }
};

// Get content by section
const getContentBySection = async (section) => {
  const query = `SELECT * FROM about_content WHERE section = ? ORDER BY \`order\``;
  const params = [section];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching content by section:', error);
    throw error;
  }
};

// Get sections list
const getContentSections = async () => {
  const query = `SELECT DISTINCT section FROM about_content ORDER BY MIN(\`order\`)`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching content sections:', error);
    throw error;
  }
};

// Get content by ID
const getContentById = async (id) => {
  const query = `SELECT * FROM about_content WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching content by id:', error);
    throw error;
  }
};

// Create new content
const createContent = async (contentData) => {
  const { section, title, content, order } = contentData;
  const query = `INSERT INTO about_content (section, title, content, \`order\`) VALUES (?, ?, ?, ?)`;
  const params = [section, title, content, order || 0];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...contentData };
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};

// Update content
const updateContent = async (id, contentData) => {
  const { section, title, content, order } = contentData;
  const query = `UPDATE about_content SET 
                 section = ?, 
                 title = ?, 
                 content = ?, 
                 \`order\` = ? 
                 WHERE id = ?`;
  const params = [section, title, content, order || 0, id];

  try {
    await executeQuery(query, params);
    return { id, ...contentData };
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
};

// Delete content
const deleteContent = async (id) => {
  const query = `DELETE FROM about_content WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
};

module.exports = {
  // About Content
  getAllContent,
  getContentBySection,
  getContentSections,
  getContentById,
  createContent,
  updateContent,
  deleteContent,

};
