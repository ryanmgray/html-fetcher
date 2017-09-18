const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
const connectionString = 'mongodb://localhost/db';
mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/job', jobRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
