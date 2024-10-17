import React, { useState, useEffect, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const { user, setLoading } = useAuth();

  const [apps, setApps] = useState([]);
  const [newApp, setNewApp] = useState({
    name: "",
    icon: null,
    category: "",
    subCategory: "",
    points: 0,
  });

  const columnDefs = [
    { headerName: "App Name", field: "name" },
    { headerName: "Category", field: "category" },
    { headerName: "Sub Category", field: "subCategory" },
    { headerName: "Points", field: "points" },
  ];

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/apps/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the token from localStorage
        },
      });
      setApps(response.data);
      toast.success("Apps loaded successfully");
    } catch (error) {
      console.error("Error fetching apps:", error);
      toast.error("Failed to load apps");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApp((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setNewApp((prev) => ({ ...prev, icon: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in newApp) {
      formData.append(key, newApp[key]);
    }

    try {
      await axios.post("/api/apps/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token from localStorage
        },
      });
      toast.success("App added successfully");
      fetchApps();
      setNewApp({
        name: "",
        icon: null,
        category: "",
        subCategory: "",
        points: 0,
      });
    } catch (error) {
      console.error("Error adding app:", error);
      toast.error("Failed to add app");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add New App</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="appName">App Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="appName"
                        name="name"
                        placeholder="Enter app name"
                        value={newApp.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="appIcon">App Icon</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="appIcon"
                            onChange={handleImageUpload}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="appIcon"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        className="form-control"
                        name="category"
                        value={newApp.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Social Media">Social Media</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sub Category</label>
                      <select
                        className="form-control"
                        name="subCategory"
                        value={newApp.subCategory}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Sub Category</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="appPoints">Points</label>
                      <input
                        type="number"
                        className="form-control"
                        id="appPoints"
                        name="points"
                        placeholder="Enter points"
                        value={newApp.points}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">App List</h3>
                </div>
                <div className="card-body">
                  <div
                    className="ag-theme-alpine"
                    style={{ height: 400, width: "100%" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={apps}
                      onGridReady={(params) => params.api.sizeColumnsToFit()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
