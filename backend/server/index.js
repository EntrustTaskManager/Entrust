const http = require("http");
const { Server } = require("socket.io");
const socketIo = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
// const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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

app.use(express.json());
app.use(bodyParser.json());

// const path = require("path");
// app.use(
//   "/static",
//   express.static(path.join(__dirname, "backend/server/index.html"))
// );

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/server/index.html");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use(cors({
//     origin: '*'
// }));

// Use route files
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/tasks", taskRoutes);
app.use("/login", loginRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
