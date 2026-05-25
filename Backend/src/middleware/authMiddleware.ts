import Student from "../models/Student";
import type {
  Request,
  Response,
  NextFunction,
} from "express";


import jwt, {
  type JwtPayload,
} from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });

      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const student =
      await Student.findById(
        (decoded as JwtPayload).id
      );

    if (!student) {
      res.status(401).json({
        success: false,
        message:
          "User no longer exists",
      });

      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};