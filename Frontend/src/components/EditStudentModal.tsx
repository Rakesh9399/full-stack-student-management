import { X } from "lucide-react";

import type { Student } from "../types/student";

interface Props {
  editingStudent: Student;

  setEditingStudent: React.Dispatch<
    React.SetStateAction<Student | null>
  >;

  updateStudent: () => void;
}

const EditStudentModal = ({
  editingStudent,
  setEditingStudent,
  updateStudent,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            Edit Student
          </h2>

          <button
            onClick={() =>
              setEditingStudent(null)
            }
            className="text-gray-300 transition hover:text-red-500"
          >
            <X size={28} />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name"
            value={editingStudent.fullName}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                fullName:
                  e.target.value,
              })
            }
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={
              editingStudent.phoneNumber
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                phoneNumber:
                  e.target.value,
              })
            }
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="date"
            value={
              editingStudent.dateOfBirth
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                dateOfBirth:
                  e.target.value,
              })
            }
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Gender"
            value={editingStudent.gender}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                gender:
                  e.target.value,
              })
            }
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Course"
            value={
              editingStudent.courseEnrolled
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                courseEnrolled:
                  e.target.value,
              })
            }
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Address"
            value={
              editingStudent.address
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                address:
                  e.target.value,
              })
            }
            className="rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() =>
              setEditingStudent(null)
            }
            className="rounded-xl bg-gray-700 px-5 py-3 text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={updateStudent}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            Update Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;