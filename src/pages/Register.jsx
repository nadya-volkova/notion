import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions";
import { checkEmailExists, registerUser } from "../services/api";
import { User } from "../util/validation";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = User.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setError("User with this email already exists");
      return;
    }

    const createdAt = Date.now();

    try {
      const user = await registerUser(email, password, createdAt);
      user.createdAt = createdAt;
      dispatch(setUser(user));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="container mx-auto p-4 flex flex-col items-center bg-gray-800 rounded-lg w-80 md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">Sign up</h1>
        <form onSubmit={handleRegister} className="w-full">
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
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded-md bg-gray-700 text-gray-100 border-none"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-blue-600 text-gray-100 hover:bg-blue-500 transition-colors"
          >
            Sign up
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <p className="mt-4 text-gray-100">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
