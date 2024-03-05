const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const PORT = process.env.PORT;
app.use(express.json());

// Students
app.post("/students", async (req, res) => {
  const newStudent = await prisma.student.create({ data: req.body });
  res.json(newStudent);
});

app.get("/students", async (req, res) => {
  const allStudents = await prisma.student.findMany();
  res.json(allStudents);
});

// Teachers
app.post("/teachers", async (req, res) => {
  const newTeacher = await prisma.teacher.create({ data: req.body });
  res.json(newTeacher);
});

app.get("/teachers", async (req, res) => {
  const allTeachers = await prisma.teacher.findMany();
  res.json(allTeachers);
});

// Tasks
app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const newTask = await prisma.task.create({ data: { text } });
  res.json(newTask);
});

app.get("/tasks", async (req, res) => {
  const allTasks = await prisma.task.findMany();
  res.json(allTasks);
});

app.listen(`${PORT}`, () => console.log(`Server running on port ${PORT}`));
