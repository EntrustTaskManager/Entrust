// This is a temp file to reflecy the LiveChat is working; will and should be moved to the backend folder. 

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const socketIo = require('socket.io');
const cors = require('cors');



const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: '*'
}));


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});



const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
    console.log('New client connected');


    socket.on('message', (message) => {
        console.log('Message received: ', message);


        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


