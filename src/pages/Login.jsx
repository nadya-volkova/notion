import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/api";
import { saveUserToLocalStorage } from "../redux/actions/userActions";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const user = await loginUser(email, password);
      dispatch(saveUserToLocalStorage(user));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="container mx-auto p-4 flex flex-col items-center bg-gray-800 rounded-lg w-80 md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">Login</h1>
        <form onSubmit={handleLogin} className="w-full">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 rounded-md bg-gray-700 text-gray-100 border-none"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded-md bg-gray-700 text-gray-100 border-none"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-blue-600 text-gray-100 hover:bg-blue-500 transition-colors"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="mt-4 text-gray-100">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
