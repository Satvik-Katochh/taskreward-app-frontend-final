import React from "react";

const AddPO = () => {
  return (
    <div className="container mt-4">
      <div className="row mb-4 align-items-center mx-2">
        <div className="col">
          <div className="d-flex align-items-center">
            <h2 className="mb-0 mr-3">Add PO</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 bg-transparent p-0">
                <li className="breadcrumb-item">
                  <a href="/">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item active">Add PO</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> Add PO
          </button>
        </div>
      </div>

      <div className="card mx-2">
        <div className="card-body p-4">
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="po_number">PO Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="po_number"
                  placeholder="Enter PO Number"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="project_name">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="project_name"
                  placeholder="Enter Project Name"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="po_date">PO Date</label>
                <input type="date" className="form-control" id="po_date" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="po_status">PO Status</label>
                <select id="po_status" className="form-control">
                  <option value="">Choose Status...</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="customer_name">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer_name"
                  placeholder="Enter Customer Name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="project_details">Project Details</label>
                <textarea
                  className="form-control"
                  id="project_details"
                  rows="3"
                  placeholder="Enter Project Details"
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="other_details">Other Details</label>
                <textarea
                  className="form-control"
                  id="other_details"
                  rows="3"
                  placeholder="Enter Other Details"
                ></textarea>
              </div>
              {/* <div className="col-md-6 mb-3">
                <label htmlFor="project_name">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="project_name"
                  placeholder="Enter Project Name"
                />
              </div> */}
            </div>

            <div className="text-right mt-4">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-check"></i> Submit PO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPO;
