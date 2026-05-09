import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../services/api";

import { encryptData } from "../utils/crypto";

const StudentForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      courseEnrolled: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      formData.phoneNumber.length !== 10
    ) {
      toast.error(
        "Phone number must be 10 digits"
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(formData.email)
    ) {
      toast.error("Invalid email");

      return;
    }

    if (formData.password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    try {
      setLoading(true);

      // Frontend encryption
      const encryptedData = {
        fullName: encryptData(
          formData.fullName
        ),

        email: formData.email,

        phoneNumber: encryptData(
          formData.phoneNumber
        ),

        dateOfBirth: encryptData(
          formData.dateOfBirth
        ),

        gender: encryptData(
          formData.gender
        ),

        address: encryptData(
          formData.address
        ),

        courseEnrolled: encryptData(
          formData.courseEnrolled
        ),

        password: encryptData(
          formData.password
        ),
      };

      const response = await api.post(
        "/register",
        encryptedData
      );

      console.log(response.data);

      toast.success(
        "Student Registered"
      );

      navigate("/students");

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        courseEnrolled: "",
        password: "",
      });
    } catch (error: any) {
      console.log(
        error.response?.data
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-10">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-700 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white">
            Student Registration
          </h2>

          <p className="mt-2 text-gray-300">
            Create your student account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dateOfBirth"
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option
              value=""
              className="text-black"
            >
              Select Gender
            </option>

            <option
              value="Male"
              className="text-black"
            >
              Male
            </option>

            <option
              value="Female"
              className="text-black"
            >
              Female
            </option>
          </select>

          <input
            type="text"
            name="courseEnrolled"
            placeholder="Course Enrolled"
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
            value={formData.courseEnrolled}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 p-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Loading..."
                : "Register Student"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentForm;