import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { CheckCircle, XCircle, Upload, Loader2 } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const fileInputRef = useRef(null);

  const columnDefs = [
    {
      headerName: "App Name",
      field: "app.name",
      sortable: true,
      filter: true,
      enableRowGroup: true,
      menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
      width: 200,
      cellStyle: (params) =>
        params.data.completed ? { textDecoration: "line-through" } : null,
    },
    {
      headerName: "Points",
      field: "app.points",
      sortable: true,
      filter: true,
      menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
      width: 120,
      cellRenderer: (params) => (
        <span className="badge bg-primary">{params.value} pts</span>
      ),
    },
    {
      headerName: "Status",
      field: "completed",
      sortable: true,
      filter: true,
      menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
      width: 140,
      cellRenderer: (params) => (
        <div className="d-flex align-items-center gap-2">
          {params.value ? (
            <>
              <CheckCircle className="text-success" size={20} />
              <span className="text-success">Completed</span>
            </>
          ) : (
            <>
              <XCircle className="text-danger" size={20} />
              <span className="text-danger">Pending</span>
            </>
          )}
        </div>
      ),
    },
    {
      headerName: "View SS",
      width: 130,
      cellRenderer: (params) =>
        params.data.screenshot_url ? (
          <button
            className="btn btn-info btn-sm d-flex align-items-center gap-2"
            onClick={() => window.open(params.data.screenshot_url, "_blank")}
          >
            <span>View SS</span>
          </button>
        ) : (
          <span>No Screenshot Available</span>
        ),
    },
    {
      headerName: "Actions",
      width: 130,
      cellRenderer: (params) => (
        <button
          className={`btn ${
            params.data.completed ? "btn-secondary" : "btn-primary"
          } btn-sm d-flex align-items-center gap-2`}
          onClick={() => handleUpload(params.data)}
          disabled={params.data.completed}
        >
          <Upload size={16} />
          Upload
        </button>
      ),
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
  };

  const fetchTasks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get("tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleUpload = (task) => {
    setSelectedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = async (e, taskId) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) {
      await uploadFile(file, taskId);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadFile(file, selectedTask.id);
    }
  };

  const uploadFile = async (file, taskId) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("screenshot", file);

    setUploadProgress(true);
    const uploadToast = toast.loading("Uploading screenshot...");

    try {
      await axiosInstance.patch(`tasks/${taskId}/complete/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.dismiss(uploadToast);
      toast.success(
        <div>
          <p className="mb-1">✅ Screenshot uploaded successfully!</p>
          <p className="mb-1">🎯 Task marked as completed</p>
          <p className="mb-0">⭐ Points credited to your account</p>
        </div>,
        { duration: 4000 }
      );

      await fetchTasks();
      setSelectedTask(null);
    } catch (error) {
      toast.dismiss(uploadToast);
      toast.error(
        error.response?.data?.message || "Failed to upload screenshot"
      );
    } finally {
      setUploadProgress(false);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="content-wrapper p-4">
      <section className="content-header mb-4">
        <div className="container-fluid px-0">
          <h1 className="text-dark mb-4">User Dashboard</h1>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card bg-info text-white h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-subtitle mb-2">Welcome</h6>
                      <h2 className="card-title mb-0">
                        {user ? user.username : "Loading..."}
                      </h2>
                    </div>
                    <i className="fas fa-user fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card bg-success text-white h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-subtitle mb-2">Total Points</h6>
                      <h2 className="card-title mb-0">{user?.points_earned}</h2>
                    </div>
                    <i className="fas fa-star fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card bg-warning text-white h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-subtitle mb-2">Completed Tasks</h6>
                      <h2 className="card-title mb-0">
                        {tasks.filter((t) => t.completed).length}
                      </h2>
                    </div>
                    <i className="fas fa-check-square fa-2x opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3
              className="card-title"
              style={{ fontWeight: "bold", fontSize: "15px" }}
            >
              Tasks List
            </h3>
          </div>
          <div className="card-body">
            <div
              className="ag-theme-quartz"
              style={{ height: 300, width: "100%" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={tasks}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                rowSelection="single"
                animateRows={true}
                enableCellTextSelection={true}
                columnMenu="legacy"
                onGridReady={(params) => params.api.sizeColumnsToFit()}
              />
            </div>
          </div>
        </div>

        {selectedTask && (
          <div className="card mt-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title mb-0">
                Upload Screenshot: {selectedTask.app.name}
              </h3>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSelectedTask(null)}
              >
                Close
              </button>
            </div>
            <div className="card-body">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, selectedTask.id)}
                onClick={handleClickUpload}
                className="border-2 border-dashed rounded-3 p-5 text-center upload-zone"
                style={{
                  minHeight: "200px",
                  backgroundColor: "#f8f9fa",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {uploadProgress ? (
                  <div className="d-flex flex-column align-items-center">
                    <Loader2 className="animate-spin h-8 w-8 mb-3" />
                    <p className="mb-0">Uploading screenshot...</p>
                  </div>
                ) : (
                  <>
                    <Upload size={48} className="mb-3 text-primary" />
                    <h5>Drag and drop screenshot here</h5>
                    <p className="text-muted mb-0">or click to select file</p>
                    <small className="d-block mt-2 text-muted">
                      Supported formats: PNG, JPG, JPEG (Max size: 5MB)
                    </small>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
