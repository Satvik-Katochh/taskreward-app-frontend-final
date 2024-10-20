import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../api/axios";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newApp, setNewApp] = useState({
    name: "",
    package_name: "",
    category: "",
    sub_category: "",
    points: 0,
  });

  const columnDefs = [
    { headerName: "App Name", field: "name", filter: true },
    { headerName: "Category", field: "category", filter: true },
    { headerName: "Sub Category", field: "sub_category", filter: true },
    { headerName: "Points", field: "points", filter: true },
  ];

  const fetchApps = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get("apps/", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  // Single useEffect for initial data fetch
  useEffect(() => {
    fetchApps();
  }, []); // Empty dependency array means this only runs once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(newApp).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axiosInstance.post("apps/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("App added successfully");
      await fetchApps(); // Refresh the apps list
      setNewApp({
        name: "",
        package_name: "",
        category: "",
        sub_category: "",
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
                      <label htmlFor="packageName">Package Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="packageName"
                        name="package_name"
                        placeholder="Enter package name"
                        value={newApp.package_name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        placeholder="Enter category"
                        value={newApp.category}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Sub Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sub_category"
                        placeholder="Enter sub category"
                        value={newApp.sub_category}
                        onChange={handleInputChange}
                      />
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
                      columnMenu="legacy"
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
