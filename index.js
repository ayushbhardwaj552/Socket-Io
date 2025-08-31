const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // When a message is received from the client
  socket.on("user-message", (message) => {
    console.log("Received message:", message);

    // Broadcast it to all connected clients
    io.emit("message", message);  // ✅ frontend listens to "message"
  });
});

// Serve static files (e.g., index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html on root path
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server.listen(9000, () => {
  console.log("Server started at port 9000");
});
