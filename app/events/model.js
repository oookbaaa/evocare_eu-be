const { executeQuery } = require('../../config/database');

// Get all events with their media
const getAllEvents = async () => {
  // First, get all events
  const eventsQuery = `
    SELECT * FROM events
    ORDER BY date DESC`;

  try {
    const events = await executeQuery(eventsQuery);

    // For each event, get its media
    for (const event of events) {
      const mediaQuery = `
        SELECT 
          id, url, type, title, caption, thumbnail_url, duration, size, mime_type
        FROM event_media 
        WHERE event_id = ?`;

      const media = await executeQuery(mediaQuery, [event.id]);
      event.media = media || [];
    }

    return events;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
};

// Get event by ID with its media
const getEventById = async (id) => {
  const eventQuery = `SELECT * FROM events WHERE id = ?`;
  const params = [id];

  try {
    const events = await executeQuery(eventQuery, params);

    if (events.length === 0) {
      return null;
    }

    const event = events[0];

    // Get media for this event
    const mediaQuery = `
      SELECT 
        id, url, type, title, caption, thumbnail_url, duration, size, mime_type
      FROM event_media 
      WHERE event_id = ?`;

    const media = await executeQuery(mediaQuery, [id]);
    event.media = media || [];

    return event;
  } catch (error) {
    console.error('Error fetching event by id:', error);
    throw error;
  }
};

// Create new event
const createEvent = async (eventData) => {
  const { title, subtitle, date, description } = eventData;
  const query = `INSERT INTO events (title, subtitle, date, description) VALUES (?, ?, ?, ?)`;
  const params = [title, subtitle, date, description];

  try {
    const result = await executeQuery(query, params);
    return { id: result.insertId, ...eventData };
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update event
const updateEvent = async (id, eventData) => {
  const { title, subtitle, date, description } = eventData;
  const query = `UPDATE events SET 
                 title = ?, 
                 subtitle = ?, 
                 date = ?, 
                 description = ? 
                 WHERE id = ?`;
  const params = [title, subtitle, date, description, id];

  try {
    await executeQuery(query, params);
    return { id, ...eventData };
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete event (will cascade delete related media due to foreign key constraint)
const deleteEvent = async (id) => {
  const query = `DELETE FROM events WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Get media by event ID
const getMediaByEventId = async (eventId) => {
  const query = `SELECT * FROM event_media WHERE event_id = ?`;
  const params = [eventId];

  try {
    return await executeQuery(query, params);
  } catch (error) {
    console.error('Error fetching media by event id:', error);
    throw error;
  }
};

// Get media by ID
const getMediaById = async (id) => {
  const query = `SELECT * FROM event_media WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching media by id:', error);
    throw error;
  }
};

// Add media to event
const addEventMedia = async (mediaData) => {
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
    console.error('Error adding event media:', error);
    throw error;
  }
};

// Update media
const updateEventMedia = async (id, mediaData) => {
  const {
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
    console.error('Error updating event media:', error);
    throw error;
  }
};

// Delete media
const deleteEventMedia = async (id) => {
  const query = `DELETE FROM event_media WHERE id = ?`;
  const params = [id];

  try {
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting event media:', error);
    throw error;
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMediaByEventId,
  getMediaById,
  addEventMedia,
  updateEventMedia,
  deleteEventMedia,
};
