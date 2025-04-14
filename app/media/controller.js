const model = require('./model');

// Get all media
const getAllMedia = async (req, res) => {
  try {
    const media = await model.getAllMedia();
    res.status(200).json(media);
  } catch (error) {
    console.error('Error in getAllMedia controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get media by ID
const getMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const media = await model.getMediaById(id);

    if (!media) {
      return res.status(404).json({ message: `Media with ID ${id} not found` });
    }

    res.status(200).json(media);
  } catch (error) {
    console.error('Error in getMediaById controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get media by type
const getMediaByType = async (req, res) => {
  try {
    const type = req.params.type;

    // Validate media type
    if (type !== 'image' && type !== 'video') {
      return res
        .status(400)
        .json({ message: "Invalid media type. Must be 'image' or 'video'" });
    }

    const media = await model.getMediaByType(type);
    res.status(200).json(media);
  } catch (error) {
    console.error('Error in getMediaByType controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create new media
const createMedia = async (req, res) => {
  try {
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
    } = req.body;

    // Validate required fields
    if (!event_id || !url || !type) {
      return res
        .status(400)
        .json({ message: 'Event ID, URL, and type are required fields' });
    }

    // Validate media type
    if (type !== 'image' && type !== 'video') {
      return res
        .status(400)
        .json({ message: "Invalid media type. Must be 'image' or 'video'" });
    }

    const mediaData = {
      event_id,
      url,
      type,
      title,
      caption,
      thumbnail_url,
      duration,
      size,
      mime_type,
    };

    const newMedia = await model.createMedia(mediaData);

    res.status(201).json(newMedia);
  } catch (error) {
    console.error('Error in createMedia controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update media
const updateMedia = async (req, res) => {
  try {
    const id = req.params.id;
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
    } = req.body;

    // Check if media exists
    const existingMedia = await model.getMediaById(id);
    if (!existingMedia) {
      return res.status(404).json({ message: `Media with ID ${id} not found` });
    }

    // Validate required fields
    if (!event_id || !url || !type) {
      return res
        .status(400)
        .json({ message: 'Event ID, URL, and type are required fields' });
    }

    // Validate media type
    if (type !== 'image' && type !== 'video') {
      return res
        .status(400)
        .json({ message: "Invalid media type. Must be 'image' or 'video'" });
    }

    const mediaData = {
      event_id,
      url,
      type,
      title,
      caption,
      thumbnail_url,
      duration,
      size,
      mime_type,
    };

    const updatedMedia = await model.updateMedia(id, mediaData);

    res.status(200).json(updatedMedia);
  } catch (error) {
    console.error('Error in updateMedia controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete media
const deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if media exists
    const existingMedia = await model.getMediaById(id);
    if (!existingMedia) {
      return res.status(404).json({ message: `Media with ID ${id} not found` });
    }

    const deleted = await model.deleteMedia(id);

    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete media' });
    }

    res
      .status(200)
      .json({ message: `Media with ID ${id} successfully deleted` });
  } catch (error) {
    console.error('Error in deleteMedia controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Search media
const searchMedia = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const results = await model.searchMedia(term);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error in searchMedia controller:', error);
    res.status(500).json({ error: error.message });
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
