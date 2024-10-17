import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";

const Login = () => {
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
    input: {
      height: "45px",
      fontSize: "14px",
    },
    button: {
      height: "45px",
      fontSize: "16px",
      fontWeight: "500",
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
    },
    copyright: {
      fontSize: "12px",
      color: "#666",
      textAlign: "center",
      borderTop: "1px solid #dee2e6",
      padding: "15px",
      backgroundColor: "#f8f9fa",
    },
    eyeIcon: {
      cursor: "pointer",
      color: "#aaa", // Light gray color for the eye icon
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
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
            <img
              src="/manufacture.png"
              alt="Manufacturing Logo"
              style={styles.logo}
            />
          </motion.div>

          <motion.div style={styles.loginHeader} variants={formVariants}>
            <h3 style={styles.title}>Shop Floor Control System</h3>
            <p style={styles.subtitle}>
              Streamline your production management with real-time monitoring
            </p>
          </motion.div>

          <motion.div style={styles.formContainer} variants={formVariants}>
            <form>
              <motion.div
                className="form-group mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  style={styles.input}
                />
              </motion.div>

              <motion.div
                className="form-group mb-4 position-relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="password">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  style={styles.input}
                />
                <i
                  className={`fas ${
                    passwordVisible ? "fa-eye-slash" : "fa-eye"
                  }`}
                  style={{
                    ...styles.eyeIcon,
                    top: "70%", // Center vertically
                    transform: "translateY(-50%)", // Adjust vertical alignment
                  }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                ></i>
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
                Sign In <i className="fas fa-arrow-right ml-2"></i>
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            style={styles.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="#" style={styles.footerLink}>
              Forgot your password?
            </a>
          </motion.div>

          <motion.div
            style={styles.copyright}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            © 2024 Shop Floor Control System. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Login;
