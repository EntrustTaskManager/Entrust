// This is a temp file to reflec the LiveChat is working; will and should be moved to the backend folder. 



const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // please change to reflect your localhost:xxxx
        methods: ["GET", "POST"]
    }
});



const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle "message" event
    socket.on('message', (message) => {
        console.log('Message received: ', message);

        // Broadcast the message to all clients
        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
