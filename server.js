const express = require('express');
const dotenv = require('dotenv')
// const cors = require('./config/cors');
const cors = require('cors')
const { setupSwagger } = require('./config/documentation');
const routes = require('./config/routes');
const path = require('path');
const { runMigrations } = require('./config/database');


dotenv.config()
const app = express();
app.use(express.json({limit: "10mb"}));

// CORS Configuration
app.use(cors());

// Swagger Documentation Setup
setupSwagger(app);

// Serve static files from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3015;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  runMigrations()
});
