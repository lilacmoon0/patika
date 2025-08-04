const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store active users and single global room
const users = new Map();
const GLOBAL_ROOM = 'Global Chat';
const globalRoom = {
  name: GLOBAL_ROOM,
  users: new Set(),
  messages: []
};

// Generate random anonymous names
const adjectives = ['Happy', 'Clever', 'Brave', 'Swift', 'Kind', 'Wise', 'Cool', 'Bold', 'Calm', 'Nice'];
const animals = ['Cat', 'Dog', 'Fox', 'Bear', 'Lion', 'Wolf', 'Eagle', 'Tiger', 'Panda', 'Rabbit'];

function generateAnonymousName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${animal}${number}`;
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Generate anonymous name for user
  const anonymousName = generateAnonymousName();
  users.set(socket.id, {
    id: socket.id,
    name: anonymousName
  });

  // Automatically join the global room
  socket.join(GLOBAL_ROOM);
  globalRoom.users.add(socket.id);

  // Send welcome message with anonymous name and room info
  socket.emit('anonymous-name', anonymousName);
  socket.emit('room-joined', {
    roomName: GLOBAL_ROOM,
    userCount: globalRoom.users.size,
    messages: globalRoom.messages.slice(-50) // Send last 50 messages
  });

  // Notify others in the room
  socket.to(GLOBAL_ROOM).emit('user-joined', {
    name: anonymousName,
    message: `${anonymousName} joined the chat`
  });

  // Update user count for all users
  io.to(GLOBAL_ROOM).emit('user-count', globalRoom.users.size);

  console.log(`${anonymousName} joined the global chat`);

  // Handle sending messages
  socket.on('send-message', (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: Date.now(),
      name: user.name,
      text: data.message,
      timestamp: new Date().toISOString(),
      type: 'message'
    };

    // Store message in global room
    globalRoom.messages.push(message);
    // Keep only last 100 messages to prevent memory issues
    if (globalRoom.messages.length > 100) {
      globalRoom.messages = globalRoom.messages.slice(-100);
    }

    // Broadcast message to all users
    io.to(GLOBAL_ROOM).emit('receive-message', message);

    console.log(`Message from ${user.name}: ${data.message}`);
  });

  // Handle typing indicators
  socket.on('typing', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(GLOBAL_ROOM).emit('user-typing', user.name);
    }
  });

  socket.on('stop-typing', () => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(GLOBAL_ROOM).emit('user-stop-typing', user.name);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      console.log(`${user.name} disconnected`);

      // Remove from global room
      globalRoom.users.delete(socket.id);

      // Notify others in the chat
      socket.to(GLOBAL_ROOM).emit('user-left', {
        name: user.name,
        message: `${user.name} left the chat`
      });

      // Update user count
      io.to(GLOBAL_ROOM).emit('user-count', globalRoom.users.size);

      // Remove user
      users.delete(socket.id);
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Anonymous Chat Server is running!' });
});

// Get server stats
app.get('/stats', (req, res) => {
  res.json({
    connectedUsers: users.size,
    globalRoom: {
      name: globalRoom.name,
      userCount: globalRoom.users.size
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Anonymous Chat Server running on port ${PORT}`);
});
