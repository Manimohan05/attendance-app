const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import routes
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');

// Use routes
app.use(authRoutes);
app.use(attendanceRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
