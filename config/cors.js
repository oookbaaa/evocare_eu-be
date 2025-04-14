const cors = require('cors');
require('dotenv').config()

// Allow all origins for now (You can customize this as needed)
const corsOptions = {
  origin: [process.env.ORIGINS, "http://localhost:8080"],
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With'],
};
console.log("allowed origin",process.env.ORIGINS)
module.exports = cors(corsOptions);
