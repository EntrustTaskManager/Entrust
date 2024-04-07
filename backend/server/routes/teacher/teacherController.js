const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function createTeacher(req, res) {
  try {
    // Extract username and password from body
    const { firstName, lastName, username, password, email } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = await prisma.teacher.create({
      data: {
        firstName,
        lastName,
        username,
        password: hashedPassword,
        email,
      },
    });
    console.log(newTeacher);
    res.json(newTeacher);
  } catch (error) {
    // Handle the error
    console.error("Error creating teacher:", error);
    res.status(500).json({ error: "Failed to create teacher" });
  }
}

async function getAllTeachers(req, res) {
  try {
    const allTeachers = await prisma.teacher.findMany();
    res.json(allTeachers);
  } catch (error) {
    // Handle the error
    console.error("Error retrieving teachers:", error);
    res.status(500).json({ error: "Failed to retrieve teachers" });
  }
}

async function getTeacherById(req, res) {
  const { id } = req.params;

  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: +id,
      },
    });
    console.log(teacher);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve teacher" });
  }
}

async function updateTeacher(req, res) {
  const { id } = req.params;
  const { firstName, lastName, username, password, email } = req.body;

  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id: +id },
      data: { firstName, lastName, username, password, email },
    });
    res.json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update teacher" });
  }
}

async function deleteTeacher(req, res) {
  const { id } = req.params;

  try {
    const deletedTeacher = await prisma.teacher.delete({
      where: { id: +id },
    });

    res.json(deletedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
}

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
