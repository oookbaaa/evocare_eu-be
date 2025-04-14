const model = require('./model');


/**
 * References Controllers
 */
const getAllReferences = async (req, res) => {
  try {
    const references = await model.getAllReferences();
    return res.status(200).json(references);
  } catch (error) {
    console.error('Error fetching references:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching references', error: error.message });
  }
};

const getFeaturedReferences = async (req, res) => {
  try {
    const featuredReferences = await model.getFeaturedReferences();
    return res.status(200).json(featuredReferences);
  } catch (error) {
    console.error('Error fetching featured references:', error);
    return res.status(500).json({
      message: 'Error fetching featured references',
      error: error.message,
    });
  }
};

const getReferenceById = async (req, res) => {
  try {
    const id = req.params.id;
    const reference = await model.getReferenceById(id);

    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }

    return res.status(200).json(reference);
  } catch (error) {
    console.error('Error fetching reference:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching reference', error: error.message });
  }
};

const createReference = async (req, res) => {
  try {
    const newReference = await model.createReference(req.body);
    return res.status(201).json(newReference);
  } catch (error) {
    console.error('Error creating reference:', error);
    return res
      .status(500)
      .json({ message: 'Error creating reference', error: error.message });
  }
};

const updateReference = async (req, res) => {
  try {
    const id = req.params.id;
    const reference = await model.getReferenceById(id);

    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }

    const updatedReference = await model.updateReference(id, req.body);
    return res.status(200).json(updatedReference);
  } catch (error) {
    console.error('Error updating reference:', error);
    return res
      .status(500)
      .json({ message: 'Error updating reference', error: error.message });
  }
};

const deleteReference = async (req, res) => {
  try {
    const id = req.params.id;
    const reference = await model.getReferenceById(id);

    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }

    const deleted = await model.deleteReference(id);

    if (deleted) {
      return res
        .status(200)
        .json({ message: 'Reference deleted successfully' });
    } else {
      return res.status(500).json({ message: 'Error deleting reference' });
    }
  } catch (error) {
    console.error('Error deleting reference:', error);
    return res
      .status(500)
      .json({ message: 'Error deleting reference', error: error.message });
  }
};

const getCompleteReferencesData = async (req, res) => {
  try {
    const completeData = await model.getCompleteReferencesData();
    return res.status(200).json(completeData);
  } catch (error) {
    console.error('Error fetching complete references data:', error);
    return res.status(500).json({
      message: 'Error fetching complete references data',
      error: error.message,
    });
  }
};

module.exports = {

  // References
  getAllReferences,
  getFeaturedReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,

  // Complete Data
  getCompleteReferencesData,
};
