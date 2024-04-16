const http = require("http");
const { Server } = require("socket.io");
const socketIo = require("socket.io");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
// const PORT = process.env.PORT || 4000;/api

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log("Message received: ", message);

    io.emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Import route files
const studentRoutes = require("./routes/student/studentRoutes");
const teacherRoutes = require("./routes/teacher/teacherRoutes");
const taskRoutes = require("./routes/tasks/taskRoutes");
const loginRoutes = require("./routes/login/loginRoutes");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use(cors({
//     origin: '*'
// }));

// Use route files
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/login", loginRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
