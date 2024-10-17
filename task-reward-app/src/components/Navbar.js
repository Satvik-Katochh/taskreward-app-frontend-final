import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useAuth(); // Get the logout function from context
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      navigate("/login"); // Redirect to the login page on successful logout
    } catch (error) {
      console.error("Logout failed", error); // Handle any errors if logout fails
    }
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="/"
            role="button"
            data-tooltip-id="tooltip"
            data-tooltip-content="ToggleMenu"
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link"
            data-tooltip-id="tooltip"
            data-tooltip-content="Home"
          >
            <i className="fas fa-home"></i>
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <span
            style={{ cursor: "pointer" }}
            className="nav-link"
            data-tooltip-id="tooltip"
            data-tooltip-content="Logout"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </span>
        </li>
      </ul>
      <Tooltip
        id="tooltip"
        delayShow={200}
        delayHide={200}
        offset={8}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          fontSize: "12px",
          padding: "5px 10px",
          borderRadius: "4px",
        }}
        classNameArrow="custom-arrow"
      />
    </nav>
  );
};

export default Navbar;
