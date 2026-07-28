import express from "express";
import {
  addStudent,
  getAllStudents,
} from "../controllers/controller.students.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", getAllStudents);

export default router;