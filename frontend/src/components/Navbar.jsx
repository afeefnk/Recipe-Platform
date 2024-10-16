import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Also clear token on logout
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Recipe Sharing
        </Link>
        <div className="flex items-center">
          {!user ? (
            <>
              <Link to="/login" className="mr-6 hover:text-gray-300 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-300">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/create" className="mr-6 hover:text-gray-300 transition duration-300">
                Create Recipe
              </Link>
              <button 
                onClick={logout} 
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
