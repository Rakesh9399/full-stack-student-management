import express from "express";

import {
    loginStudent,
    registerStudent,
    getStudents,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


// Create student
router.post("/register", registerStudent);

// Login student
router.post("/login", loginStudent);

// Get all students
router.get("/students", verifyToken, getStudents);

// Update student
router.put("/student/:id", verifyToken, updateStudent);

// Delete student
router.delete("/student/:id", verifyToken, deleteStudent);

export default router;