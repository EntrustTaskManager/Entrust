const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

// Import route files
const studentRoutes = require("./routes/student/studentRoutes");
const teacherRoutes = require("./routes/teacher/teacherRoutes");
const taskRoutes = require("./routes/tasks/taskRoutes");

app.use(express.json());

// Use route files
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
