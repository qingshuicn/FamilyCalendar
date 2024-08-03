require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const socketSetup = require('./socket');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketSetup.init(server);

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Routes
app.use('/api/events', eventRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, io }; // Export for testing