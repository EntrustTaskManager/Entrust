const express = require("express");
const router = express.Router();
const taskController = require("./taskController");

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;


// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const router = express.Router() 



// router.post('/tasks', async (req, res) => {
//     try {
//         res.send("hello!")
//     } catch (error) {
//         console.error('Failed to add new task:', error);
//         res.status(500).send('Server error');
//     }
// });
