const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const PORT = process.env.PORT;
app.use(express.json());

// STUDENTS
// Create Student
app.post("/students", async (req, res) => {
  const newStudent = await prisma.student.create({ data: req.body });
  res.json(newStudent);
});

// Get All Students
app.get("/students", async (req, res) => {
  const allStudents = await prisma.student.findMany();
  res.json(allStudents);
});

// Get Student By ID
app.get("/student/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const student = await prisma.student.findUnique({
      where: {
        id: uuid,
      },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve student" });
  }
});

// Update Student
app.put("/student/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { firstName, lastName, password, gpa, email } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: uuid },
      data: { firstName, lastName, password, gpa, email },
    });
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update student" });
  }
});

// Delete Student
app.delete("/student/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const deletedStudent = await prisma.student.delete({
      where: { id: uuid },
    });

    res.json(deletedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

// TEACHERS
// Create Teacher
app.post("/teachers", async (req, res) => {
  const newTeacher = await prisma.teacher.create({ data: req.body });
  res.json(newTeacher);
});

// Get All Teachers
app.get("/teachers", async (req, res) => {
  const allTeachers = await prisma.teacher.findMany();
  res.json(allTeachers);
});

// Get Teacher By Id
app.get("/teacher/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: uuid,
      },
    });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve teacher" });
  }
});

// Update Teacher
app.put("/teacher/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { firstName, lastName, password, email } = req.body;

  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id: uuid },
      data: { firstName, lastName, password, email },
    });
    res.json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update teacher" });
  }
});

// Delete Teacher
app.delete("/teacher/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const deletedTeacher = await prisma.teacher.delete({
      where: { id: uuid },
    });

    res.json(deletedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
});

// TASKS
// Create Task
app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const newTask = await prisma.task.create({ data: { text } });
  res.json(newTask);
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  const allTasks = await prisma.task.findMany();
  res.json(allTasks);
});

// Get Task By Id
app.get("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Convert id to integer
    const taskId = parseInt(id);

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve task" });
  }
});

// Update Task
app.put("/task/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    // Convert ID to Integer
    const taskId = parseInt(id);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { text },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete Task
app.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Convert ID to Integer
    const taskId = parseInt(id);
    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    });

    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(`${PORT}`, () => console.log(`Server running on port ${PORT}`));
