import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../services/api";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success(
        "Login Successful"
      );

      navigate("/students");
    } catch (error: any) {
      console.log(
        error.response?.data
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mt-2 text-gray-300">
            Login to continue
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-600 bg-white/10 p-4 text-white outline-none transition focus:border-blue-500"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 p-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;