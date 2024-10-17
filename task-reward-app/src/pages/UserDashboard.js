import React, { useState, useEffect, useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";

const UserDashboard = () => {
  const { user, setLoading } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  //   const { authTokens } = useContext(AuthContext);

  const columnDefs = [
    { headerName: "App", field: "app.name" },
    { headerName: "Points", field: "app.points" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleViewDetails(params.data)}
        >
          View Details
        </button>
      ),
    },
  ];

  useEffect(() => {
    fetchUserData();
    fetchTasks();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/tasks/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, taskId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("screenshot", file);

    setLoading(true);
    try {
      await axios.post(
        `/api/user/tasks/${taskId}/upload-screenshot/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      toast.success("Screenshot uploaded successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error uploading screenshot:", error);
      toast.error("Failed to upload screenshot");
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
              <h1>User Dashboard</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{user.name}</h3>
                  <p>User Profile</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{user.points_earned}</h3>
                  <p>Points Earned</p>
                </div>
                <div className="icon">
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{tasks.filter((t) => t.completed).length}</h3>
                  <p>Tasks Completed</p>
                </div>
                <div className="icon">
                  <i className="fas fa-check-square"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Available Tasks</h3>
                </div>
                <div className="card-body">
                  <div
                    className="ag-theme-alpine"
                    style={{ height: 400, width: "100%" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={tasks}
                      onGridReady={(params) => params.api.sizeColumnsToFit()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedTask && (
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      Task Details: {selectedTask.app.name}
                    </h3>
                  </div>
                  <div className="card-body">
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, selectedTask.id)}
                      className="border border-dashed border-secondary rounded p-4 text-center"
                      style={{ minHeight: "150px" }}
                    >
                      <i className="fas fa-cloud-upload-alt fa-3x mb-3"></i>
                      <p>Drag and drop screenshot here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
