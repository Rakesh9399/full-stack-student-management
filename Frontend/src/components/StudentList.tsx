import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../../services/api";

import {
  decryptData,
  encryptData,
} from "../utils/crypto";

import type { Student } from "../types/student";

import EditStudentModal from "./EditStudentModal";

const StudentList = () => {
  const [students, setStudents] =
    useState<Student[]>([]);

  const [search, setSearch] =
    useState("");

  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const decryptedStudents =
        response.data.data.map(
          (student: Student) => ({
            ...student,

            fullName: decryptData(
              student.fullName
            ),

            phoneNumber: decryptData(
              student.phoneNumber
            ),

            dateOfBirth: decryptData(
              student.dateOfBirth
            ),

            gender: decryptData(
              student.gender
            ),

            address: decryptData(
              student.address
            ),

            courseEnrolled: decryptData(
              student.courseEnrolled
            ),
          })
        );

      setStudents(decryptedStudents);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch students"
      );
    }
  };

  const deleteStudent = async (
    id: string
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.delete(
        `/student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Student Deleted"
      );

      fetchStudents();
    } catch (error) {
      console.log(error);

      toast.error(
        "Delete Failed"
      );
    }
  };

  const updateStudent = async () => {
    try {
      if (!editingStudent) return;

      const token =
        localStorage.getItem("token");

      const encryptedData = {
        fullName: encryptData(
          editingStudent.fullName
        ),

        email: editingStudent.email,

        phoneNumber: encryptData(
          editingStudent.phoneNumber
        ),

        dateOfBirth: encryptData(
          editingStudent.dateOfBirth
        ),

        gender: encryptData(
          editingStudent.gender
        ),

        address: encryptData(
          editingStudent.address
        ),

        courseEnrolled: encryptData(
          editingStudent.courseEnrolled
        ),
      };

      await api.put(
        `/student/${editingStudent._id}`,
        encryptedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Student Updated"
      );

      setEditingStudent(null);

      fetchStudents();
    } catch (error) {
      console.log(error);

      toast.error(
        "Update Failed"
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents =
    students.filter((student) =>
      student.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="text-4xl font-bold text-white">
            Student Dashboard
          </h1>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-600 bg-white/10 py-3 pl-12 pr-4 text-white outline-none backdrop-blur-lg focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-700 bg-white/10 shadow-2xl backdrop-blur-lg">
          <table className="w-full">
            <thead className="bg-white/10 text-white">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Gender
                </th>

                <th className="p-4 text-left">
                  Course
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-300"
                  >
                    No Students Found
                  </td>
                </tr>
              ) : (
                filteredStudents.map(
                  (student) => (
                    <tr
                      key={student._id}
                      className="border-t border-gray-700 text-gray-200 transition hover:bg-white/5"
                    >
                      <td className="p-4">
                        {
                          student.fullName
                        }
                      </td>

                      <td className="p-4">
                        {student.email}
                      </td>

                      <td className="p-4">
                        {
                          student.phoneNumber
                        }
                      </td>

                      <td className="p-4">
                        {student.gender}
                      </td>

                      <td className="p-4">
                        {
                          student.courseEnrolled
                        }
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() =>
                              setEditingStudent(
                                student
                              )
                            }
                            className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                          >
                            <Pencil
                              size={18}
                            />
                          </button>

                          <button
                            onClick={() =>
                              deleteStudent(
                                student._id
                              )
                            }
                            className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                          >
                            <Trash2
                              size={18}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {editingStudent && (
        <EditStudentModal
          editingStudent={
            editingStudent
          }
          setEditingStudent={
            setEditingStudent
          }
          updateStudent={
            updateStudent
          }
        />
      )}
    </div>
  );
};

export default StudentList;