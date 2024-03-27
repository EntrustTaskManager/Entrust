const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function createStudent(req, res) {
  try {
    // Extract username and password from body
    const { firstName, lastName, username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await prisma.student.create({
      data: {
        username,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
    res.json(newStudent);
  } catch (error) {
    // Handle the error
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Failed to create student" });
  }
}

async function getAllStudents(req, res) {
  try {
    const allStudents = await prisma.student.findMany();
    res.json(allStudents);
  } catch (error) {
    // Handle the error
    console.error("Error retrieving students:", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
}

async function getStudentById(req, res) {
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
}

async function updateStudent(req, res) {
  const { uuid } = req.params;
  const { firstName, lastName, username, password, gpa, email } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: uuid },
      data: { firstName, lastName, username, password, gpa, email },
    });
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update student" });
  }
}

async function deleteStudent(req, res) {
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
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
