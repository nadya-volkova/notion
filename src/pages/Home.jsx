import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../redux/actions/userActions";
import { fetchUserById } from "../services/api";

function Home({ user, loading, dispatch }) {
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      fetchUserById(id)
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch((error) => console.error(error));
    }
  }, [dispatch]);

  if (loading) {
    return <div className="text-gray-100">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      {user && (
        <div className="mb-4">
          <p className="text-lg">Email: {user.email}</p>
          <p className="text-lg">
            Registered at: {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      )}
      <Link
        to="/notes"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Go to Notes
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
});

export default connect(mapStateToProps)(Home);
