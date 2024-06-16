const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
  });

  socket.on('offer', (data) => {
    socket.to('interview').emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.to('interview').emit('answer', data);
  });

  socket.on('iceCandidate', (data) => {
    socket.to('interview').emit('iceCandidate', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
