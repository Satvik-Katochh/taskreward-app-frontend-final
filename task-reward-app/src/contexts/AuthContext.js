import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosInstance from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async (token) => {
    try {
      const response = await axiosInstance.get("profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // If profile fetch fails, clear everything to force re-login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  // Initial auth state check
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        // Optionally refresh user data in background
        await fetchUserProfile(token);
      }
      setLoading(false);
    };

    initializeAuth();
  }, [fetchUserProfile]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("token/", {
        username,
        password,
      });
      const { access } = response.data;
      localStorage.setItem("token", access);

      await fetchUserProfile(access);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access}`;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axiosInstance.defaults.headers.common["Authorization"] = "";
    setUser(null);
  }, []);

  const updateUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetchUserProfile(token);
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    loading,
    setLoading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
