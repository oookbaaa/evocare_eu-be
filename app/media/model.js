const { executeQuery } = require('../../config/database');

// Get all media
const getAllMedia = async () => {
  const query = `
    SELECT em.*, e.title as event_title 
    FROM event_media em
    LEFT JOIN events e ON em.event_id = e.id
    ORDER BY em.created_at DESC`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all media:', error);
    throw error;
  }
};

// Get media by ID
const getMediaById = async (id) => {
  const query = `
    SELECT em.*, e.title as event_title 
    FROM event_media em
    LEFT JOIN events e ON em.event_id = e.id
    WHERE em.id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching media by id:', error);
    throw error;
  }
};

// Get media by type
const getMediaByType = async (type) => {
  const query = `
    SELECT em.*, e.title as event_title 
    FROM event_media em
    LEFT JOIN events e ON em.event_id = e.id
    WHERE em.type = ?
    ORDER BY em.created_at DESC`;
  const params = [type];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching media by type:', error);
    throw error;
  }
};

// Create new media
const createMedia = async (mediaData) => {
  const {
    event_id,
    url,
    type,
    title,
    caption,
    thumbnail_url,
    duration,
    size,
    mime_type,
  } = mediaData;
  const query = `INSERT INTO event_media 
                (event_id, url, type, title, caption, thumbnail_url, duration, size, mime_type) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    event_id,
    url,
    type,
    title,
    caption,
    thumbnail_url,
    duration,
    size,
    mime_type,
  ];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...mediaData };
  } catch (error) {
    console.error('Error creating media:', error);
    throw error;
  }
};

// Update media
const updateMedia = async (id, mediaData) => {
  const {
    event_id,
    url,
    type,
    title,
    caption,
    thumbnail_url,
    duration,
    size,
    mime_type,
  } = mediaData;
  const query = `UPDATE event_media SET 
                event_id = ?,
                url = ?, 
                type = ?, 
                title = ?, 
                caption = ?, 
                thumbnail_url = ?, 
                duration = ?, 
                size = ?, 
                mime_type = ? 
                WHERE id = ?`;
  const params = [
    event_id,
    url,
    type,
    title,
    caption,
    thumbnail_url,
    duration,
    size,
    mime_type,
    id,
  ];

  try {
    await executeQuery(query, params);
    return { id, ...mediaData };
  } catch (error) {
    console.error('Error updating media:', error);
    throw error;
  }
};

// Delete media
const deleteMedia = async (id) => {
  const query = `DELETE FROM event_media WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};

// Search media
const searchMedia = async (searchTerm) => {
  const query = `
    SELECT em.*, e.title as event_title 
    FROM event_media em
    LEFT JOIN events e ON em.event_id = e.id
    WHERE em.title LIKE ? OR em.caption LIKE ? OR e.title LIKE ?
    ORDER BY em.created_at DESC`;
  const term = `%${searchTerm}%`;
  const params = [term, term, term];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error searching media:', error);
    throw error;
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
  getMediaByType,
  createMedia,
  updateMedia,
  deleteMedia,
  searchMedia,
};
