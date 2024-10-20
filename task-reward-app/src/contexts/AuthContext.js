import React, { createContext, useState, useContext, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner"; // Ensure you have this component
import axiosInstance from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("token/", {
        username,
        password,
      });
      const { access } = response.data;

      const userInfoResponse = await axiosInstance.get("profile/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userData = userInfoResponse.data;

      localStorage.setItem("token", access);
      localStorage.setItem("user", JSON.stringify(userData));

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access}`;

      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axiosInstance.defaults.headers.common["Authorization"] = "";
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loading, setLoading, updateUser }}
    >
      {loading ? <LoadingSpinner /> : children}{" "}
      {/* Show spinner while loading */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
