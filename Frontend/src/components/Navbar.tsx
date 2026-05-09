import {
  Link,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check token
  const token =
    localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
      <h1 className="text-2xl font-bold">
        Student Management
      </h1>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="rounded bg-gray-800 px-4 py-2"
        >
          Register
        </Link>

        {/* If user NOT logged in */}
        {!token ? (
          <Link
            to="/"
            className="rounded bg-gray-800 px-4 py-2"
          >
            Login
          </Link>
        ) : (
          // If user logged in
          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;