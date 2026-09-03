import React from "react";
import { Link } from "react-router-dom";

function HospitalDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: "64px",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#2563eb" }}>
            HospitalLocker AI
          </h2>

          <span style={{ fontSize: "11px", color: "#64748b" }}>
            Healthcare Continuity Platform
          </span>
        </div>

        <div>
          <strong>Hospital Reception</strong>
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Sassoon General Hospital
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "35px",
        }}
      >
        <p style={{ color: "#64748b", marginBottom: "5px" }}>
          Hospital Portal
        </p>

        <h1 style={{ marginTop: 0, color: "#0f172a" }}>
          Hospital Dashboard
        </h1>

        <p style={{ color: "#64748b" }}>
          Manage incoming digital referrals from PHCs.
        </p>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div className="stat-card">
            <p>Today's Referrals</p>
            <h2>18</h2>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2>6</h2>
          </div>

          <div className="stat-card">
            <p>In Consultation</p>
            <h2>7</h2>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>5</h2>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 style={{ marginTop: "35px" }}>Quick Actions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          <Link
            to="/hospital/referrals"
            style={{ textDecoration: "none" }}
          >
            <div className="action-card">
              <h2>Search Referral</h2>

              <p>
                Find a patient referral using the Referral ID.
              </p>

              <button className="action-button">
                Search Referral
              </button>
            </div>
          </Link>

          <div className="action-card">
            <h2>Scan QR</h2>

            <p>
              Scan the QR code provided by the patient.
            </p>

            <button
              className="action-button"
              onClick={() => alert("QR Scanner will be added later.")}
            >
              Scan QR
            </button>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="recent-card">
          <h2>Recent Referrals</h2>

          <table>
            <thead>
              <tr>
                <th>Referral ID</th>
                <th>Patient</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>HL-REF-00124</td>
                <td>Ramesh</td>
                <td>General Medicine</td>
                <td>
                  <span className="pending">Pending</span>
                </td>
              </tr>

              <tr>
                <td>HL-REF-00123</td>
                <td>Patient 002</td>
                <td>Cardiology</td>
                <td>
                  <span className="active">In Consultation</span>
                </td>
              </tr>

              <tr>
                <td>HL-REF-00122</td>
                <td>Patient 003</td>
                <td>Orthopedics</td>
                <td>
                  <span className="completed">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <style>
        {`
          .stat-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
          }

          .stat-card p {
            color: #64748b;
            font-size: 13px;
          }

          .stat-card h2 {
            color: #2563eb;
            margin-bottom: 0;
          }

          .action-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
          }

          .action-card:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          }

          .action-card h2 {
            color: #0f172a;
          }

          .action-card p {
            color: #64748b;
          }

          .action-button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 7px;
            cursor: pointer;
            margin-top: 10px;
          }

          .recent-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
            margin-top: 30px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            text-align: left;
            padding: 13px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13px;
          }

          th {
            color: #64748b;
          }

          .pending {
            background: #fef3c7;
            color: #92400e;
            padding: 5px 9px;
            border-radius: 15px;
          }

          .active {
            background: #dbeafe;
            color: #1d4ed8;
            padding: 5px 9px;
            border-radius: 15px;
          }

          .completed {
            background: #dcfce7;
            color: #166534;
            padding: 5px 9px;
            border-radius: 15px;
          }
        `}
      </style>
    </div>
  );
}

export default HospitalDashboard;