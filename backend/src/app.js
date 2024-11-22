const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes'); // Ticket routes
const rewardRoutes = require('./routes/rewardRoutes'); // Reward routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/tickets', ticketRoutes); // Ticket management routes
app.use('/api/rewards', rewardRoutes); // Reward management routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;