const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const testRoutes = require('./routes/testRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const { mongoURI, port } = require('./config/config');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: "http://localhost:4200", // Replace with your frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/interviews', interviewRoutes);

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// WebSocket handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  socket.on('offer', (data) => {
    console.log('Offer received:', data);
    socket.to(data.room).emit('offer', data.offer);
  });

  socket.on('answer', (data) => {
    console.log('Answer received:', data);
    socket.to(data.room).emit('answer', data.answer);
  });

  socket.on('candidate', (data) => {
    console.log('Candidate received:', data);
    socket.to(data.room).emit('candidate', data.candidate);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
