const express = require("express");
const router = express.Router();
const teacherController = require("./teacherController");

router.post("/", teacherController.createTeacher);
router.get("/", teacherController.getAllTeachers);
router.get("/:uuid", teacherController.getTeacherById);
router.put("/:uuid", teacherController.updateTeacher);
router.delete("/:uuid", teacherController.deleteTeacher);

module.exports = router;
