import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Provider/AuthProvider";

const Root = () => {
  const { googleSignIn, logOut, user, setUser, loading } = useContext(AuthContext);

  function loginUser() {
    googleSignIn()
      .then((result) => {
        console.log(result);
        setUser(result);
        Swal.fire({
          title: "Sign In!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error.message);
        setUser(null);
        Swal.fire({
          title: "Sign In Error",
          icon: "error",
          draggable: true,
        });
      });
  }

  function logOutUser() {
    logOut()
      .then(() => {
        setUser(null);
        Swal.fire({
          title: "Signed Out!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          title: "Sign Out Error",
          icon: "error",
          draggable: true,
        });
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-500 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg rounded-b-lg px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        <div className="flex items-center gap-4">
          {user && (
            <img
              src={user?.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-300 shadow-md"
            />
          )}
          <p className="text-gray-700 font-medium">{user?.displayName}</p>
          {user ? (
            <button
              onClick={logOutUser}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={loginUser}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Log In
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-2xl text-center max-w-lg">
          <h1 className="text-5xl font-extrabold text-gray-900">Manage Your Tasks</h1>
          <p className="py-6 text-gray-600">
            Boost productivity with real-time task tracking, drag-and-drop management, and seamless collaboration.
          </p>
          <Link to="/dashboard">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Root;