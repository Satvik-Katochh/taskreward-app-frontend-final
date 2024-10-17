import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [30, 40, 20, 50, 60],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const barChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4 align-items-center ">
        <div className="col">
          <div className="d-flex align-items-center">
            <h2 className="mb-0 mr-3">Dashboard</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 bg-transparent p-0">
                <li className="breadcrumb-item">
                  <a href="/">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-4">
        <div className="col-lg-3 col-md-6">
          <div className="card card-primary mb-3">
            <div className="card-header text-center font-weight-bold">
              Total Work Orders
            </div>
            <div
              className="card-body d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <h5
                className="card-title font-weight-bold"
                style={{
                  fontSize: "2rem",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
                  textAlign: "center", // Center text horizontally
                  margin: "0", // Remove margin for perfect centering
                }}
              >
                150
              </h5>
              <p className="card-text">Total work orders for this month.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-success mb-3">
            <div className="card-header text-center font-weight-bold">
              Completed Work Orders
            </div>
            <div
              className="card-body d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <h5
                className="card-title font-weight-bold"
                style={{
                  fontSize: "2rem",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                120
              </h5>
              <p className="card-text">Successfully completed this month.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-warning mb-3">
            <div className="card-header text-center font-weight-bold">
              Pending Work Orders
            </div>
            <div
              className="card-body d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <h5
                className="card-title font-weight-bold"
                style={{
                  fontSize: "2rem",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                30
              </h5>
              <p className="card-text">Currently pending work orders.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-danger mb-3">
            <div className="card-header text-center font-weight-bold">
              Work Orders on Hold
            </div>
            <div
              className="card-body d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <h5
                className="card-title font-weight-bold"
                style={{
                  fontSize: "2rem",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                5
              </h5>
              <p className="card-text">Work orders currently on hold.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header text-center font-weight-bold">
              Sales Over Time
            </div>
            <div className="card-body">
              <Line data={lineChartData} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header text-center font-weight-bold">
              Work Order Status
            </div>
            <div className="card-body">
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header text-center font-weight-bold">
              Recent Work Orders
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Work Order No.</th>
                    <th scope="col">Requester</th>
                    <th scope="col">Assigned To</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total Cost</th>
                    <th scope="col">Completion Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>WO-2024-001</td>
                    <td>John Doe</td>
                    <td>Jane Smith</td>
                    <td>Completed</td>
                    <td>$200</td>
                    <td>2024-10-01</td>
                  </tr>
                  <tr>
                    <td>WO-2024-002</td>
                    <td>Mary Johnson</td>
                    <td>Bob Brown</td>
                    <td>In Progress</td>
                    <td>$150</td>
                    <td>2024-10-15</td>
                  </tr>
                  <tr>
                    <td>WO-2024-003</td>
                    <td>Lisa White</td>
                    <td>Tom Clark</td>
                    <td>Pending</td>
                    <td>$100</td>
                    <td>2024-10-20</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
