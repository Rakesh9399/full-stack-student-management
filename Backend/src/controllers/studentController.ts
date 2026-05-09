import type { Request, Response } from "express";
import Student from "../models/Student.js";
import { encryptData, decryptData } from "../utils/crypto.js";
import jwt from "jsonwebtoken";

export const registerStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            dateOfBirth,
            gender,
            address,
            courseEnrolled,
            password,
        } = req.body;

        const existingStudent = await Student.findOne({
            email,
        });

        if (existingStudent) {
            res.status(400).json({
                success: false,
                message: "Student already exists",
            });

            return;
        }

        // Second level encryption
        const encryptedStudent = {
            fullName: encryptData(fullName),
            email,
            phoneNumber: encryptData(phoneNumber),
            dateOfBirth: encryptData(dateOfBirth),
            gender: encryptData(gender),
            address: encryptData(address),
            courseEnrolled: encryptData(courseEnrolled),
            password: encryptData(password),
        };

        const student = await Student.create(encryptedStudent);

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: student,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getStudents = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await Student.find();

        // Decrypt one level before sending
        const decryptedStudents = students.map((student) => ({
            _id: student._id,

            fullName: decryptData(student.fullName),
            email: student.email,
            phoneNumber: decryptData(student.phoneNumber),
            dateOfBirth: decryptData(student.dateOfBirth.toString()),
            gender: decryptData(student.gender),
            address: decryptData(student.address),
            courseEnrolled: decryptData(student.courseEnrolled),
            password: decryptData(student.password),
        }));

        res.status(200).json({
            success: true,
            data: decryptedStudents,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const updateStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        const updatedData = {
            fullName: encryptData(req.body.fullName),
            email: req.body.email,
            phoneNumber: encryptData(req.body.phoneNumber),
            dateOfBirth: encryptData(req.body.dateOfBirth),
            gender: encryptData(req.body.gender),
            address: encryptData(req.body.address),
            courseEnrolled: encryptData(req.body.courseEnrolled),
            password: encryptData(req.body.password),
        };

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const deleteStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;

        await Student.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const loginStudent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "All fields are required",
            });

            return;
        }

        // Find user by email
        const student = await Student.findOne({ email });

        if (!student) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });

            return;
        }

        const firstDecrypt = decryptData(
            student.password
        );

        const originalPassword =
            decryptData(firstDecrypt);

        // Compare password
        if (originalPassword  !== password) {
            res.status(401).json({
                success: false,
                message: "Invalid password",
            });

            return;
        }

        const token = jwt.sign(
            {
                id: student._id,
                email: student.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};