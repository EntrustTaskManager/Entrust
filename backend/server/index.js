const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;

// Import route files
const studentRoutes = require("./routes/student/studentRoutes");
const teacherRoutes = require("./routes/teacher/teacherRoutes");
const taskRoutes = require("./routes/tasks/taskRoutes");
const loginRoutes = require("./routes/login/loginRoutes");

app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Use route files
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/tasks", taskRoutes);
app.use("/login", loginRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
