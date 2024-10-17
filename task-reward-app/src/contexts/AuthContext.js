import React, { createContext, useState, useContext, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info after login
  const [loading, setLoading] = useState(false);

  // Check for stored token and user info in localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user info from localStorage if available
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("token/", { username, password });
      const { access } = response.data;

      // Fetch user info from a separate API (or from the response)
      const userInfoResponse = await axios.get("profile/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userData = userInfoResponse.data;

      // Save token and user info to localStorage and state
      localStorage.setItem("token", access);
      localStorage.setItem("user", JSON.stringify(userData));

      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      setUser(userData); // Store user info in context
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = ""; // Clear auth header
    setUser(null); // Clear user info
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading && <LoadingSpinner />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
