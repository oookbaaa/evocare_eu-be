const model = require('./model');


// Partners Controllers
const getAllPartners = async (req, res) => {
  try {
    const partners = await model.getAllPartners();
    res.status(200).json(partners);
  } catch (error) {
    console.error('Error in getAllPartners controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const partner = await model.getPartnerById(id);

    if (!partner) {
      return res
        .status(404)
        .json({ message: `Partner with ID ${id} not found` });
    }

    res.status(200).json(partner);
  } catch (error) {
    console.error('Error in getPartnerById controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const createPartner = async (req, res) => {
  try {
    const { name, image_url, description, website_url } = req.body;

    // Validate required fields
    if (!name || !image_url || !description || !website_url) {
      return res
        .status(400)
        .json({
          message:
            'Name, image URL, description, and website URL are required fields',
        });
    }

    const newPartner = await model.createPartner({
      name,
      image_url,
      description,
      website_url,
    });

    res.status(201).json(newPartner);
  } catch (error) {
    console.error('Error in createPartner controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const updatePartner = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, image_url, description, website_url } = req.body;

    // Validate required fields
    if (!name || !image_url || !description || !website_url) {
      return res
        .status(400)
        .json({
          message:
            'Name, image URL, description, and website URL are required fields',
        });
    }

    // Check if partner exists
    const existingPartner = await model.getPartnerById(id);
    if (!existingPartner) {
      return res
        .status(404)
        .json({ message: `Partner with ID ${id} not found` });
    }

    const updatedPartner = await model.updatePartner(id, {
      name,
      image_url,
      description,
      website_url,
    });

    res.status(200).json(updatedPartner);
  } catch (error) {
    console.error('Error in updatePartner controller:', error);
    res.status(500).json({ error: error.message });
  }
};

const deletePartner = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if partner exists
    const existingPartner = await model.getPartnerById(id);
    if (!existingPartner) {
      return res
        .status(404)
        .json({ message: `Partner with ID ${id} not found` });
    }

    const deleted = await model.deletePartner(id);

    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete partner' });
    }

    res
      .status(200)
      .json({ message: `Partner with ID ${id} successfully deleted` });
  } catch (error) {
    console.error('Error in deletePartner controller:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};
