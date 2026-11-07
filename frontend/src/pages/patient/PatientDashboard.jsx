import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function PatientDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "35px",
            maxWidth: "1200px",
          }}
        >
          <p
            style={{
              color: "#64748b",
              marginBottom: "5px",
            }}
          >
            Patient Dashboard
          </p>

          <h1
            style={{
              marginTop: 0,
              marginBottom: "8px",
              color: "#0f172a",
            }}
          >
            Good morning, Ramesh
          </h1>

          <p style={{ color: "#64748b" }}>
            Your healthcare journey, connected in one place.
          </p>

          {/* Statistics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div className="dashboard-card">
              <p>Medical Documents</p>
              <h2>12</h2>
              <span>Available in Health Locker</span>
            </div>

            <div className="dashboard-card">
              <p>Active Referral</p>
              <h2>1</h2>
              <span>Under hospital consultation</span>
            </div>

            <div className="dashboard-card">
              <p>Medicines</p>
              <h2>2</h2>
              <span>Active prescriptions</span>
            </div>
          </div>

          {/* Journey */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "25px",
              marginTop: "25px",
            }}
          >
            <h2>Current Healthcare Journey</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "25px",
              }}
            >
              <div>
                <strong>PHC</strong>
                <p>Referral Created</p>
              </div>

              <div>→</div>

              <div>
                <strong>Sassoon Hospital</strong>
                <p>Referral Received</p>
              </div>

              <div>→</div>

              <div>
                <strong>Doctor</strong>
                <p>Consultation Pending</p>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div style={{ marginTop: "25px" }}>
            <h2>Quick Access</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              <Link
                to="/patient/health-locker"
                style={{ textDecoration: "none" }}
              >
                <div className="dashboard-card">
                  <h3>Health Locker</h3>
                  <p>View reports, prescriptions and documents.</p>
                </div>
              </Link>

              <Link
                to="/patient/journey"
                style={{ textDecoration: "none" }}
              >
                <div className="dashboard-card">
                  <h3>My Journey</h3>
                  <p>Track your referral and treatment journey.</p>
                </div>
              </Link>

              <Link
                to="/patient/reminders"
                style={{ textDecoration: "none" }}
              >
                <div className="dashboard-card">
                  <h3>Reminders</h3>
                  <p>Check medicines and upcoming appointments.</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <style>
        {`
          .dashboard-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            box-sizing: border-box;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .dashboard-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          }

          .dashboard-card p {
            color: #64748b;
            font-size: 14px;
          }

          .dashboard-card h2 {
            color: #2563eb;
            margin: 8px 0;
          }

          .dashboard-card h3 {
            color: #0f172a;
          }

          .dashboard-card span {
            color: #64748b;
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
}

export default PatientDashboard;