const model = require('./model');

// Complete Team Data
const getCompleteTeamData = async (req, res) => {
  try {
    const teamData = await model.getCompleteTeamData();
    res.status(200).json(teamData);
  } catch (error) {
    console.error('Error in getCompleteTeamData controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Team Section Controllers
const getTeamSection = async (req, res) => {
  try {
    const section = await model.getTeamSection();

    if (!section) {
      return res.status(404).json({ message: 'Team section not found' });
    }

    res.status(200).json(section);
  } catch (error) {
    console.error('Error in getTeamSection controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const createTeamSection = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required fields' });
    }

    // Check if section already exists
    const existingSection = await model.getTeamSection();
    if (existingSection) {
      return res
        .status(409)
        .json({ message: 'Team section already exists. Use PUT to update.' });
    }

    const newSection = await model.createTeamSection({ title, description });

    res.status(201).json(newSection);
  } catch (error) {
    console.error('Error in createTeamSection controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateTeamSection = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required fields' });
    }

    // Check if section exists
    const existingSection = await model.getTeamSection();
    if (!existingSection) {
      return res.status(404).json({ message: 'Team section not found' });
    }

    const updatedSection = await model.updateTeamSection(id, {
      title,
      description,
    });

    res.status(200).json(updatedSection);
  } catch (error) {
    console.error('Error in updateTeamSection controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Team Members Controllers
const getAllTeamMembers = async (req, res) => {
  try {
    const members = await model.getAllTeamMembers();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error in getAllTeamMembers controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const getTeamMemberById = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await model.getTeamMemberById(id);

    if (!member) {
      return res
        .status(404)
        .json({ message: `Team member with ID ${id} not found` });
    }

    res.status(200).json(member);
  } catch (error) {
    console.error('Error in getTeamMemberById controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const { fullname, title, description, photo_url } = req.body;

    // Validate required fields
    if (!fullname || !title || !description) {
      return res.status(400).json({
        message: 'Fullname, title, and description are required fields',
      });
    }

    const newMember = await model.createTeamMember({
      fullname,
      title,
      description,
      photo_url,
    });

    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error in createTeamMember controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const id = req.params.id;
    const { fullname, title, description, photo_url } = req.body;

    // Validate required fields
    if (!fullname || !title || !description) {
      return res.status(400).json({
        message: 'Fullname, title, and description are required fields',
      });
    }

    // Check if member exists
    const existingMember = await model.getTeamMemberById(id);
    if (!existingMember) {
      return res
        .status(404)
        .json({ message: `Team member with ID ${id} not found` });
    }

    const updatedMember = await model.updateTeamMember(id, {
      fullname,
      title,
      description,
      photo_url,
    });

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error('Error in updateTeamMember controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if member exists
    const existingMember = await model.getTeamMemberById(id);
    if (!existingMember) {
      return res
        .status(404)
        .json({ message: `Team member with ID ${id} not found` });
    }

    const deleted = await model.deleteTeamMember(id);

    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete team member' });
    }

    res
      .status(200)
      .json({ message: `Team member with ID ${id} successfully deleted` });
  } catch (error) {
    console.error('Error in deleteTeamMember controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Team Gallery Controllers
const getAllGalleryImages = async (req, res) => {
  try {
    const images = await model.getAllGalleryImages();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error in getAllGalleryImages controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const getGalleryImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await model.getGalleryImageById(id);

    if (!image) {
      return res
        .status(404)
        .json({ message: `Gallery image with ID ${id} not found` });
    }

    res.status(200).json(image);
  } catch (error) {
    console.error('Error in getGalleryImageById controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const createGalleryImage = async (req, res) => {
  try {
    const { image_url, caption } = req.body;

    // Validate required fields
    if (!image_url) {
      return res.status(400).json({ message: 'Image URL is a required field' });
    }

    const newImage = await model.createGalleryImage({ image_url, caption });

    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error in createGalleryImage controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateGalleryImage = async (req, res) => {
  try {
    const id = req.params.id;
    const { image_url, caption } = req.body;

    // Validate required fields
    if (!image_url) {
      return res.status(400).json({ message: 'Image URL is a required field' });
    }

    // Check if image exists
    const existingImage = await model.getGalleryImageById(id);
    if (!existingImage) {
      return res
        .status(404)
        .json({ message: `Gallery image with ID ${id} not found` });
    }

    const updatedImage = await model.updateGalleryImage(id, {
      image_url,
      caption,
    });

    res.status(200).json(updatedImage);
  } catch (error) {
    console.error('Error in updateGalleryImage controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if image exists
    const existingImage = await model.getGalleryImageById(id);
    if (!existingImage) {
      return res
        .status(404)
        .json({ message: `Gallery image with ID ${id} not found` });
    }

    const deleted = await model.deleteGalleryImage(id);

    if (!deleted) {
      return res
        .status(500)
        .json({ message: 'Failed to delete gallery image' });
    }

    res
      .status(200)
      .json({ message: `Gallery image with ID ${id} successfully deleted` });
  } catch (error) {
    console.error('Error in deleteGalleryImage controller:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  // Complete Data
  getCompleteTeamData,

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
};
