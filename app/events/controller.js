const model = require('./model');

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await model.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error in getAllEvents controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await model.getEventById(id);

    if (!event) {
      return res.status(404).json({ message: `Event with ID ${id} not found` });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error('Error in getEventById controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const { title, subtitle, date, description } = req.body;

    // Validate required fields
    if (!title || !date || !description) {
      return res
        .status(400)
        .json({ message: 'Title, date, and description are required fields' });
    }

    const newEvent = await model.createEvent({
      title,
      subtitle,
      date,
      description,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error in createEvent controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, subtitle, date, description } = req.body;

    // Check if event exists
    const existingEvent = await model.getEventById(id);
    if (!existingEvent) {
      return res.status(404).json({ message: `Event with ID ${id} not found` });
    }

    // Validate required fields
    if (!title || !date || !description) {
      return res
        .status(400)
        .json({ message: 'Title, date, and description are required fields' });
    }

    const updatedEvent = await model.updateEvent(id, {
      title,
      subtitle,
      date,
      description,
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error in updateEvent controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if event exists
    const existingEvent = await model.getEventById(id);
    if (!existingEvent) {
      return res.status(404).json({ message: `Event with ID ${id} not found` });
    }

    const deleted = await model.deleteEvent(id);

    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete event' });
    }

    res
      .status(200)
      .json({ message: `Event with ID ${id} successfully deleted` });
  } catch (error) {
    console.error('Error in deleteEvent controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get media by event ID
const getMediaByEventId = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Check if event exists
    const existingEvent = await model.getEventById(eventId);
    if (!existingEvent) {
      return res
        .status(404)
        .json({ message: `Event with ID ${eventId} not found` });
    }

    const media = await model.getMediaByEventId(eventId);

    res.status(200).json(media);
  } catch (error) {
    console.error('Error in getMediaByEventId controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add media to event
const addEventMedia = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const {
      url,
      type,
      title,
      caption,
      thumbnail_url,
      duration,
      size,
      mime_type,
    } = req.body;

    // Check if event exists
    const existingEvent = await model.getEventById(eventId);
    if (!existingEvent) {
      return res
        .status(404)
        .json({ message: `Event with ID ${eventId} not found` });
    }

    // Validate required fields
    if (!url || !type) {
      return res
        .status(400)
        .json({ message: 'URL and type are required fields' });
    }

    const mediaData = {
      event_id: eventId,
      url,
      type,
      title,
      caption,
      thumbnail_url,
      duration,
      size,
      mime_type,
    };

    const newMedia = await model.addEventMedia(mediaData);

    res.status(201).json(newMedia);
  } catch (error) {
    console.error('Error in addEventMedia controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update media
const updateEventMedia = async (req, res) => {
  try {
    const id = req.params.mediaId;
    const {
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
    if (!url || !type) {
      return res
        .status(400)
        .json({ message: 'URL and type are required fields' });
    }

    const mediaData = {
      url,
      type,
      title,
      caption,
      thumbnail_url,
      duration,
      size,
      mime_type,
    };

    const updatedMedia = await model.updateEventMedia(id, mediaData);

    res.status(200).json(updatedMedia);
  } catch (error) {
    console.error('Error in updateEventMedia controller:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete media
const deleteEventMedia = async (req, res) => {
  try {
    const id = req.params.mediaId;

    // Check if media exists
    const existingMedia = await model.getMediaById(id);
    if (!existingMedia) {
      return res.status(404).json({ message: `Media with ID ${id} not found` });
    }

    const deleted = await model.deleteEventMedia(id);

    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete media' });
    }

    res
      .status(200)
      .json({ message: `Media with ID ${id} successfully deleted` });
  } catch (error) {
    console.error('Error in deleteEventMedia controller:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMediaByEventId,
  addEventMedia,
  updateEventMedia,
  deleteEventMedia,
};
