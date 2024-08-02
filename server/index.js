const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for events (replace with database in production)
let events = [];

// Socket.IO
io.on('connection', (socket) => {
  console.log('A client connected');

  // Send all events to the newly connected client
  socket.emit('initialEvents', events);

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

setInterval(() => {
  io.emit('testEvent', { message: '你给我回来' });
}, 10000);


// Routes
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const { title, date, time } = req.body;
  
  if (!title || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    date,
    time
  };

  events.push(newEvent);

  // Emit the new event to all connected clients
  io.emit('newEvent', newEvent);

  res.status(201).json(newEvent);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});