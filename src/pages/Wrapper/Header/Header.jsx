import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-white text-black rounded-md px-2"
      : "text-gray-100";
  };

  return (
    <header className="bg-gray-800 p-4 text-gray-100 flex justify-center mb-4">
      <nav className="flex gap-6">
        <Link to="/" className={`text-lg ${isActive("/")}`}>
          Home
        </Link>
        <Link to="/notes" className={`text-lg ${isActive("/notes")}`}>
          Notes
        </Link>
        <Link
          to="/notes/create"
          className={`text-lg ${isActive("/notes/create")}`}
        >
          Create Note
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className={`text-lg ${isActive("/login")}`}
          >
            Log out
          </button>
        ) : (
          <>
            <Link to="/login" className={`text-lg ${isActive("/login")}`}>
              Login
            </Link>
            <Link to="/register" className={`text-lg ${isActive("/register")}`}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
