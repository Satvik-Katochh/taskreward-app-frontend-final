import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Ensure correct import paths
import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard page
import UserDashboard from "./pages/UserDashboard"; // User Dashboard page
import Login from "./pages/Login"; // Login page
import Layout from "./components/Layout"; // Layout component

const AppRoutes = () => {
  const { user } = useAuth(); // Access user state from AuthContext

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {/* Login Route (No Layout for login) */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes Based on Authentication */}
      {user ? (
        <>
          {/* Redirect to Admin or User Dashboard based on is_staff status */}
          <Route
            path="/"
            element={
              user.is_staff ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/user-dashboard" />
              )
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin-dashboard"
            element={
              user.is_staff ? (
                <Layout>
                  <AdminDashboard />
                </Layout>
              ) : (
                <Navigate to="/user-dashboard" />
              )
            }
          />

          {/* User Dashboard Route */}
          <Route
            path="/user-dashboard"
            element={
              !user.is_staff ? (
                <Layout>
                  <UserDashboard />
                </Layout>
              ) : (
                <Navigate to="/admin-dashboard" />
              )
            }
          />
        </>
      ) : (
        // Redirect to Login if not authenticated
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="bottom-right" />
        <AppRoutes /> {/* Use the AppRoutes component here */}
      </Router>
    </AuthProvider>
  );
};

export default App;
