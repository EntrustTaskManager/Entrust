const express = require("express");
const router = express.Router();
const studentController = require("./studentController");

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:uuid", studentController.getStudentById);
router.put("/:uuid", studentController.updateStudent);
router.delete("/:uuid", studentController.deleteStudent);

module.exports = router;
