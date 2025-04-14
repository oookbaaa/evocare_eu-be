const { executeQuery } = require('../../config/database');

// Team Section CRUD Operations
const getTeamSection = async () => {
  const query = `SELECT * FROM team_section ORDER BY id`;

  try {
    const result = await executeQuery(query);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching team section:', error);
    throw error;
  }
};

const createTeamSection = async (sectionData) => {
  const { title, description } = sectionData;
  const query = `INSERT INTO team_section (title, description) VALUES (?, ?)`;
  const params = [title, description];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...sectionData };
  } catch (error) {
    console.error('Error creating team section:', error);
    throw error;
  }
};

const updateTeamSection = async (id, sectionData) => {
  const { title, description } = sectionData;
  const query = `UPDATE team_section SET title = ?, description = ? WHERE id = ?`;
  const params = [title, description, id];

  try {
    await executeQuery(query, params);
    return { id, ...sectionData };
  } catch (error) {
    console.error('Error updating team section:', error);
    throw error;
  }
};

// Team Members CRUD Operations
const getAllTeamMembers = async () => {
  const query = `SELECT * FROM team_members ORDER BY id`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all team members:', error);
    throw error;
  }
};

const getTeamMemberById = async (id) => {
  const query = `SELECT * FROM team_members WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching team member by id:', error);
    throw error;
  }
};

const createTeamMember = async (memberData) => {
  const { fullname, title, description, photo_url } = memberData;
  const query = `INSERT INTO team_members (fullname, title, description, photo_url) VALUES (?, ?, ?, ?)`;
  const params = [fullname, title, description, photo_url];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...memberData };
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
};

const updateTeamMember = async (id, memberData) => {
  const { fullname, title, description, photo_url } = memberData;
  const query = `UPDATE team_members SET fullname = ?, title = ?, description = ?, photo_url = ? WHERE id = ?`;
  const params = [fullname, title, description, photo_url, id];

  try {
    await executeQuery(query, params);
    return { id, ...memberData };
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
};

const deleteTeamMember = async (id) => {
  const query = `DELETE FROM team_members WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};

// Team Gallery CRUD Operations
const getAllGalleryImages = async () => {
  const query = `SELECT * FROM team_gallery ORDER BY id`;

  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error fetching all gallery images:', error);
    throw error;
  }
};

const getGalleryImageById = async (id) => {
  const query = `SELECT * FROM team_gallery WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching gallery image by id:', error);
    throw error;
  }
};

const createGalleryImage = async (imageData) => {
  const { image_url, caption } = imageData;
  const query = `INSERT INTO team_gallery (image_url, caption) VALUES (?, ?)`;
  const params = [image_url, caption];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...imageData };
  } catch (error) {
    console.error('Error creating gallery image:', error);
    throw error;
  }
};

const updateGalleryImage = async (id, imageData) => {
  const { image_url, caption } = imageData;
  const query = `UPDATE team_gallery SET image_url = ?, caption = ? WHERE id = ?`;
  const params = [image_url, caption, id];

  try {
    await executeQuery(query, params);
    return { id, ...imageData };
  } catch (error) {
    console.error('Error updating gallery image:', error);
    throw error;
  }
};

const deleteGalleryImage = async (id) => {
  const query = `DELETE FROM team_gallery WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};

// Get complete team data (section, members, gallery)
const getCompleteTeamData = async () => {
  try {
    const section = await getTeamSection();
    const members = await getAllTeamMembers();
    const gallery = await getAllGalleryImages();

    return {
      section,
      members,
      gallery,
    };
  } catch (error) {
    console.error('Error fetching complete team data:', error);
    throw error;
  }
};

module.exports = {
  // Team Section
  getTeamSection,
  createTeamSection,
  updateTeamSection,

  // Team Members
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,

  // Team Gallery
  getAllGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,

  // Complete Data
  getCompleteTeamData,
};
