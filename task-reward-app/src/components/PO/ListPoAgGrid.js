import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const ListPoAgGrid = () => {
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [selectedOtherDetails, setSelectedOtherDetails] = useState(null);
  const [selectedPOForDelete, setSelectedPOForDelete] = useState(null);

  const rowData = [
    {
      po_id: 1,
      poNumber: "PO-2024-001",
      projectName: "Infrastructure Expansion",
      customerName: "Acme Corporation",
      poDate: "2024-03-01T00:00:00Z",
      createdBy: "John Doe",
      created_at: "2024-11-14",
      projectDetails: "Details about Infrastructure Expansion project...",
      otherDetails: "Additional information about the project...",
      status: "Pending",
    },
    {
      po_id: 2,
      poNumber: "PO-2024-002",
      projectName: "Network Upgrade",
      customerName: "Beta Industries",
      poDate: "2024-03-02T00:00:00Z",
      createdBy: "Jane Smith",
      created_at: "2024-11-14",
      projectDetails: "Details about Network Upgrade project...",
      otherDetails: "Additional information about the project...",
      status: "Completed",
    },
    {
      po_id: 3,
      poNumber: "PO-2024-003",
      projectName: "Data Center Renovation",
      customerName: "Gamma Solutions",
      poDate: "2024-03-10T00:00:00Z",
      createdBy: "Samuel Taylor",
      created_at: "2024-11-14",
      projectDetails: "Details about Data Center Renovation project...",
      otherDetails: "Additional information about the project...",
      status: "Cancelled", // New row with status "Cancelled"
    },

    // Add more entries as needed
  ];
  const statusOptions = ["Pending", "Completed", "Cancelled"];

  const colDefs = [
    {
      field: "po_id",
      hide: true,
      headerName: "PO_ID",
      cellRenderer: (params) => (
        <span className="text-primary cursor-pointer">{params.value}</span>
      ),
    },
    {
      field: "poNumber",
      headerName: "PO Number",
      cellRenderer: (params) => (
        <span className="text-primary cursor-pointer">{params.value}</span>
      ),
    },
    {
      field: "projectName",
      headerName: "Project Name",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
    },
    {
      field: "poDate",
      headerName: "PO Date",
      cellRenderer: (params) =>
        new Date(params.value).toLocaleDateString("en-IN"),
    },
    {
      field: "createdBy",
      headerName: "Created By",
    },
    {
      field: "created_at",
      headerName: "Created At",
      cellRenderer: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "status",
      headerName: "Status",
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: statusOptions,
      },
      editable: true,
      cellRenderer: (params) => (
        <span className={`badge bg-${getBadgeClass(params.value)}`}>
          {params.value}
        </span>
      ),
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   cellRenderer: StatusCellRenderer,
    // },
    {
      field: "projectDetails",
      headerName: "Project Details",
      cellRenderer: ProjectDetailsCellRenderer,
    },
    {
      field: "otherDetails",
      headerName: "Other Details",
      cellRenderer: OtherDetailsCellRenderer,
    },
    // {
    //   headerName: "Edit PO",
    //   cellRenderer: EditPOModalCellRenderer,
    // },
    // {
    //   headerName: "Delete PO",
    //   cellRenderer: DeletePOModalRenderer,
    // },
  ];
  function getBadgeClass(status) {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  }

  function StatusCellRenderer(params) {
    const statusColors = {
      Completed: "badge bg-success",
      Pending: "badge bg-warning",
      Cancelled: "badge bg-danger",
    };
    return <span className={statusColors[params.value]}>{params.value}</span>;
  }

  function ProjectDetailsCellRenderer(params) {
    return (
      <button
        className="btn btn-info btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#ProjectDetailsModal"
        onClick={() => setSelectedProjectDetails(params.data)}
      >
        <i className="fas fa-eye"></i>
      </button>
    );
  }

  function OtherDetailsCellRenderer(params) {
    return (
      <button
        className="btn btn-warning btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#OtherDetailsModal"
        onClick={() => setSelectedOtherDetails(params.data)}
      >
        <i className="fas fa-eye"></i>
      </button>
    );
  }

  function EditPOModalCellRenderer(params) {
    return (
      <>
        <button
          className="btn btn-primary btn-sm mx-2"
          data-bs-toggle="modal"
          data-bs-target="#EditPOModal"
          onClick={() => console.log("Editing PO:", params.data)}
        >
          <i className="fas fa-pen"></i> Edit
        </button>
      </>
    );
  }

  function DeletePOModalRenderer(params) {
    return (
      <button
        className="btn btn-danger btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#DeletePOModal"
        onClick={() => setSelectedPOForDelete(params.data)}
      >
        <i className="fas fa-trash"></i> Delete PO
      </button>
    );
  }

  return (
    <div className="container">
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          columnMenu={"legacy"}
          defaultColDef={{
            width: 190,
            resizable: true,
            sortable: true,
            filter: true,
          }}
        />
      </div>

      {/* Edit PO Modal */}
      <div
        className="modal fade"
        id="EditPOModal"
        tabIndex="-1"
        aria-labelledby="EditPOModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditPOModalLabel">
                Edit Purchase Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Implement form for editing PO here */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => console.log("Saving changes")} // Placeholder for save logic
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show Project Details */}
      <div
        className="modal fade"
        id="ProjectDetailsModal"
        tabIndex="-1"
        aria-labelledby="ProjectDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ProjectDetailsModalLabel">
                {selectedProjectDetails?.projectName} - Project Details
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Project Details:</strong>{" "}
                {selectedProjectDetails?.projectDetails}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show Other Details */}
      <div
        className="modal fade"
        id="OtherDetailsModal"
        tabIndex="-1"
        aria-labelledby="OtherDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="OtherDetailsModalLabel">
                {selectedOtherDetails?.projectName} - Other Details
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Other Details:</strong>{" "}
                {selectedOtherDetails?.otherDetails}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to Confirm PO Deletion */}
      <div
        className="modal fade"
        id="DeletePOModal"
        tabIndex="-1"
        aria-labelledby="DeletePOModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="DeletePOModalLabel">
                Delete PO Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the purchase order{" "}
              {selectedPOForDelete?.poNumber}?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => console.log("Deleting PO:", selectedPOForDelete)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPoAgGrid;
