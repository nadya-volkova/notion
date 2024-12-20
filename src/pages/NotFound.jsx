import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NotFound() {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div className="text-gray-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-gray-100">
      <h1 className="text-6xl font-bold mb-4">404 - Not Found</h1>
      <Link
        to={user ? "/" : "/login"}
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
