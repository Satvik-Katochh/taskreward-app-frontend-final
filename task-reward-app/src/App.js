import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import your AuthContext
import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard page
import UserDashboard from "./pages/UserDashboard"; // User Dashboard page
import Login from "./pages/Login"; // Login page
import Layout from "./components/Layout"; // Layout component

const App = () => {
  const user = {
    is_staff: "true", // Sample value for testing, can be replaced with real logic
  };

  return (
    <AuthProvider>
      <Router>
        <Toaster position="bottom-right" />
        <Routes>
          {/* Login Route (No Layout for login) */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes Based on Authentication */}
          {user ? (
            <>
              {/* Admin Dashboard Route */}
              <Route
                path="/admin-dashboard"
                element={
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                }
              />

              {/* User Dashboard Route */}
              <Route
                path="/user-dashboard"
                element={
                  <Layout>
                    <UserDashboard />
                  </Layout>
                }
              />
            </>
          ) : (
            // Redirect to Login if not authenticated
            <Route path="/" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
