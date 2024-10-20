import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import { Eye, EyeOff, User } from "lucide-react";
import toast from "react-hot-toast";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const styles = {
    gradientBackground: {
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    loginBox: {
      width: "400px",
      backgroundColor: "#ffffff",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    },
    logoContainer: {
      textAlign: "center",
      padding: "30px 0 20px",
    },
    logo: {
      height: "48px",
      width: "auto",
    },
    loginHeader: {
      textAlign: "center",
      marginBottom: "30px",
      padding: "0 20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#666",
      lineHeight: "1.6",
    },
    formContainer: {
      padding: "0 40px 40px",
    },
    inputGroup: {
      position: "relative",
      marginBottom: "20px",
    },
    inputContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      height: "45px",
      fontSize: "14px",
      padding: "10px 40px 10px 12px",
      borderRadius: "4px",
      border: "1px solid #ced4da",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      outline: "none",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
    icon: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      right: "12px",
      color: "#6c757d",
      cursor: "pointer",
      zIndex: 2,
      backgroundColor: "transparent",
      padding: "4px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#495057",
    },
    button: {
      width: "100%",
      height: "45px",
      fontSize: "16px",
      fontWeight: "500",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "4px",
      color: "#ffffff",
      cursor: "pointer",
      transition: "background-color 0.15s ease-in-out",
      "&:hover": {
        backgroundColor: "#0056b3",
      },
    },
    footer: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      textAlign: "center",
      borderTop: "1px solid #dee2e6",
    },
    footerLink: {
      color: "#007bff",
      textDecoration: "none",
      fontSize: "14px",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    copyright: {
      fontSize: "12px",
      color: "#666",
      textAlign: "center",
      borderTop: "1px solid #dee2e6",
      padding: "15px",
      backgroundColor: "#f8f9fa",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast.success("Logged In successfully");
      navigate("/user-dashboard");
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <AnimatePresence>
      <div style={styles.gradientBackground}>
        <motion.div
          style={styles.loginBox}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div style={styles.logoContainer} variants={logoVariants}>
            <img src="/benefit.png" alt="Benefit Logo" style={styles.logo} />
          </motion.div>

          <motion.div style={styles.loginHeader} variants={formVariants}>
            <h3 style={styles.title}>Task Reward App</h3>
            <p style={styles.subtitle}>
              Complete your task and win exciting prizes!
            </p>
          </motion.div>

          <motion.div style={styles.formContainer} variants={formVariants}>
            <form onSubmit={handleSubmit}>
              <motion.div
                style={styles.inputGroup}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="username" style={styles.label}>
                  Username
                </label>
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter your username"
                    style={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <User style={styles.icon} size={18} className="text-muted" />
                </div>
              </motion.div>

              <motion.div
                style={styles.inputGroup}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <div style={styles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {showPassword ? (
                    <EyeOff
                      style={styles.icon}
                      size={18}
                      className="text-muted"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <Eye
                      style={styles.icon}
                      size={18}
                      className="text-muted"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="btn btn-primary btn-block"
                style={styles.button}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                Sign In
              </motion.button>
            </form>
          </motion.div>

          {/* <motion.div
            style={styles.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="#" style={styles.footerLink}>
              Forgot your password?
            </a>
          </motion.div> */}

          <motion.div
            style={styles.copyright}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            © 2024 Velankani Group. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Login;
