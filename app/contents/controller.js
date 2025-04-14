const model = require('./model');

/**
 * Content Controllers
 */
// Get all content
const getAllContent = async (req, res) => {
  try {
    const content = await model.getAllContent();
    return res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching all content:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching all content', error: error.message });
  }
};

// Get content by section
const getContentBySection = async (req, res) => {
  try {
    const section = req.params.section;
    const content = await model.getContentBySection(section);

    if (content.length === 0) {
      return res
        .status(404)
        .json({ message: `No content found for section: ${section}` });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching content by section:', error);
    return res.status(500).json({
      message: 'Error fetching content by section',
      error: error.message,
    });
  }
};

// Get content sections
const getContentSections = async (req, res) => {
  try {
    const sections = await model.getContentSections();
    return res.status(200).json(sections);
  } catch (error) {
    console.error('Error fetching content sections:', error);
    return res.status(500).json({
      message: 'Error fetching content sections',
      error: error.message,
    });
  }
};

// Get content by ID
const getContentById = async (req, res) => {
  try {
    const id = req.params.id;
    const content = await model.getContentById(id);

    if (!content) {
      return res
        .status(404)
        .json({ message: `Content with ID ${id} not found` });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching content by id:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching content by id', error: error.message });
  }
};

// Create new content
const createContent = async (req, res) => {
  try {
    const { section, title, content, order } = req.body;

    // Validate required fields
    if (!section || !content) {
      return res
        .status(400)
        .json({ message: 'Section and content are required fields' });
    }

    const newContent = await model.createContent({
      section,
      title,
      content,
      order,
    });

    return res.status(201).json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    return res
      .status(500)
      .json({ message: 'Error creating content', error: error.message });
  }
};

// Update content
const updateContent = async (req, res) => {
  try {
    const id = req.params.id;
    const { section, title, content, order } = req.body;

    // Check if content exists
    const existingContent = await model.getContentById(id);
    if (!existingContent) {
      return res
        .status(404)
        .json({ message: `Content with ID ${id} not found` });
    }

    // Validate required fields
    if (!section || !content) {
      return res
        .status(400)
        .json({ message: 'Section and content are required fields' });
    }

    const updatedContent = await model.updateContent(id, {
      section,
      title,
      content,
      order,
    });

    return res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    return res
      .status(500)
      .json({ message: 'Error updating content', error: error.message });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if content exists
    const existingContent = await model.getContentById(id);
    if (!existingContent) {
      return res
        .status(404)
        .json({ message: `Content with ID ${id} not found` });
    }

    const deleted = await model.deleteContent(id);

    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete content' });
    }

    return res
      .status(200)
      .json({ message: `Content with ID ${id} successfully deleted` });
  } catch (error) {
    console.error('Error deleting content:', error);
    return res
      .status(500)
      .json({ message: 'Error deleting content', error: error.message });
  }
};



module.exports = {
  // Content
  getAllContent,
  getContentBySection,
  getContentSections,
  getContentById,
  createContent,
  updateContent,
  deleteContent,


};
