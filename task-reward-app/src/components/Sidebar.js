import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        <img
          src="/gift-box.png"
          alt="Gitf Box Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 1.0 }}
        />
        <span className="brand-text font-weight-light">Task Reward App</span>
      </a>

      {/* Sidebar Content */}
      <div className="sidebar">
        {/* User Panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/man.png"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {user ? user.username : "Loading..."}
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            {/* Conditionally Render Admin Dashboard */}
            {user && user.is_staff ? (
              <li className="nav-item">
                <Link to="/admin-dashboard" className="nav-link">
                  <i className="nav-icon fa-solid fa-user-gear"></i>
                  <p>Admin Dashboard</p>
                </Link>
              </li>
            ) : (
              // Render User Dashboard if not admin
              <li className="nav-item">
                <Link to="/user-dashboard" className="nav-link">
                  <i className="nav-icon fa-solid fa-user"></i>
                  <p>User Dashboard</p>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
