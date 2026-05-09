import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface IStudent {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    courseEnrolled: string;
    password: string;
}

const studentSchema = new Schema<IStudent>(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phoneNumber: {
            type: String,
            required: true,
        },

        dateOfBirth: {
            type: String,
            required: true,
        },

        gender: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        courseEnrolled: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Student = model<IStudent>("Student", studentSchema);

export default Student;