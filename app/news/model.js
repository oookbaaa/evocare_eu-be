const { executeQuery } = require('../../config/database');

// News CRUD Operations
const getAllNews = async () => {
  const query = `
    SELECT n.*, sc.name as category_name 
    FROM news n
    LEFT JOIN service_categories sc ON n.category_id = sc.id
    ORDER BY n.publish_date DESC
  `;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all news:', error);
    throw error;
  }
};

const getFeaturedNews = async () => {
  const query = `
    SELECT n.*, sc.name as category_name 
    FROM news n
    LEFT JOIN service_categories sc ON n.category_id = sc.id
    WHERE n.is_featured = true
    ORDER BY n.publish_date DESC
  `;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching featured news:', error);
    throw error;
  }
};

const getNewsByCategory = async (categoryId) => {
  const query = `
    SELECT n.*, sc.name as category_name 
    FROM news n
    LEFT JOIN service_categories sc ON n.category_id = sc.id
    WHERE n.category_id = ?
    ORDER BY n.publish_date DESC
  `;
  const params = [categoryId];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    throw error;
  }
};

const getNewsById = async (id) => {
  const query = `
    SELECT n.*, sc.name as category_name 
    FROM news n
    LEFT JOIN service_categories sc ON n.category_id = sc.id
    WHERE n.id = ?
  `;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching news by id:', error);
    throw error;
  }
};

const createNews = async (newsData) => {
  const {
    title,
    subtitle,
    publish_date,
    is_featured,
    content,
    image_url,
    category_id,
  } = newsData;

  const query = `
    INSERT INTO news 
    (title, subtitle, publish_date, is_featured, content, image_url, category_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    title,
    subtitle,
    publish_date,
    is_featured || false,
    content,
    image_url || null,
    category_id || null,
  ];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...newsData };
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
};

const updateNews = async (id, newsData) => {
  const {
    title,
    subtitle,
    publish_date,
    is_featured,
    content,
    image_url,
    category_id,
  } = newsData;

  const query = `
    UPDATE news SET 
    title = ?, 
    subtitle = ?, 
    publish_date = ?, 
    is_featured = ?, 
    content = ?, 
    image_url = ?, 
    category_id = ? 
    WHERE id = ?
  `;
  const params = [
    title,
    subtitle,
    publish_date,
    is_featured || false,
    content,
    image_url || null,
    category_id || null,
    id,
  ];

  try {
    await executeQuery(query, params);
    return { id, ...newsData };
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

const deleteNews = async (id) => {
  const query = `DELETE FROM news WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
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
