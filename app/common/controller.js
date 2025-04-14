const model = require('./model');

const getUserById = async (request, response) => {
  try {
    const userId = request.params.id; // Get user ID from request params
    const user = await model.getUserById(userId);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json(user);
  } catch (e) {
    console.error("Error fetching user:", e);
    response.status(500).json({ error: e.message });
  }
};

module.exports = {
  getUserById,
};
