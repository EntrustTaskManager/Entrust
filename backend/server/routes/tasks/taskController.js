const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createTask(req, res) {
  try {
    const { text } = req.body;
    const newTask = await prisma.task.create({ data: { text } });
    res.json(newTask);
  } catch (error) {
    // Handle the error
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

async function getAllTasks(req, res) {
  try {
    const allTasks = await prisma.task.findMany();
    res.json(allTasks);
  } catch (error) {
    // Handle the error
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
}

async function getTaskById(req, res) {
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
}

async function updateTask(req, res) {
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
}

async function deleteTask(req, res) {
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
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
