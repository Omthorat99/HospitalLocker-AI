import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function PHCDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar />

      <main
        style={{
          padding: "35px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <p
          style={{
            color: "#64748b",
            marginBottom: "5px",
          }}
        >
          Provider Portal / PHC
        </p>

        <h1
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          PHC Dashboard
        </h1>

        <p style={{ color: "#64748b" }}>
          Manage patients and create digital referrals.
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
          <div className="phc-card">
            <span>Today's Patients</span>
            <strong>24</strong>
          </div>

          <div className="phc-card">
            <span>Referrals Created</span>
            <strong>8</strong>
          </div>

          <div className="phc-card">
            <span>Active Referrals</span>
            <strong>5</strong>
          </div>

          <div className="phc-card">
            <span>Completed Referrals</span>
            <strong>12</strong>
          </div>
        </div>

        {/* Quick Actions */}
        <section style={{ marginTop: "35px" }}>
          <h2>Quick Actions</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Link
              to="/phc/patients"
              style={{ textDecoration: "none" }}
            >
              <div className="action-card">
                <div className="action-icon">👤</div>
                <h3>Search Patient</h3>
                <p>
                  Find an existing patient and view their basic
                  information.
                </p>
              </div>
            </Link>

            <Link
              to="/phc/create-referral"
              style={{ textDecoration: "none" }}
            >
              <div className="action-card">
                <div className="action-icon">↗</div>
                <h3>Create Referral</h3>
                <p>
                  Create a digital referral for hospital
                  consultation.
                </p>
              </div>
            </Link>

            <Link
              to="/phc/qr-referral"
              style={{ textDecoration: "none" }}
            >
              <div className="action-card">
                <div className="action-icon">▦</div>
                <h3>Referral QR</h3>
                <p>
                  Generate and display the referral QR code.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Recent Referrals */}
        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>Recent Referrals</h2>

            <Link
              to="/phc/create-referral"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              + New Referral
            </Link>
          </div>

          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th className="table-cell">Referral ID</th>
                  <th className="table-cell">Patient</th>
                  <th className="table-cell">Department</th>
                  <th className="table-cell">Date</th>
                  <th className="table-cell">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="table-cell">HL-REF-00124</td>
                  <td className="table-cell">Ramesh</td>
                  <td className="table-cell">General Medicine</td>
                  <td className="table-cell">28 Aug 2026</td>
                  <td className="table-cell">
                    <span className="status active">
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="table-cell">HL-REF-00123</td>
                  <td className="table-cell">Patient 002</td>
                  <td className="table-cell">Cardiology</td>
                  <td className="table-cell">27 Aug 2026</td>
                  <td className="table-cell">
                    <span className="status completed">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="table-cell">HL-REF-00122</td>
                  <td className="table-cell">Patient 003</td>
                  <td className="table-cell">Orthopedics</td>
                  <td className="table-cell">26 Aug 2026</td>
                  <td className="table-cell">
                    <span className="status active">
                      Active
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Workflow */}
        <section
          style={{
            marginTop: "30px",
            padding: "22px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            Digital Referral Workflow
          </h3>

          <p
            style={{
              color: "#475569",
              fontSize: "14px",
            }}
          >
            Search patient → Create referral → Generate referral
            ID/QR → Hospital receives referral → Doctor continues
            care.
          </p>
        </section>
      </main>

      <style>
        {`
          .phc-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
          }

          .phc-card span {
            display: block;
            color: #64748b;
            font-size: 13px;
            margin-bottom: 10px;
          }

          .phc-card strong {
            font-size: 26px;
            color: #2563eb;
          }

          .action-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 22px;
            min-height: 150px;
            transition: 0.2s;
          }

          .action-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          }

          .action-icon {
            font-size: 25px;
            color: #2563eb;
          }

          .action-card h3 {
            color: #0f172a;
            margin-bottom: 8px;
          }

          .action-card p {
            color: #64748b;
            font-size: 13px;
            line-height: 1.5;
          }

          .table-cell {
            text-align: left;
            padding: 13px 10px;
            border-bottom: 1px solid #e5e7eb;
          }

          .status {
            padding: 5px 9px;
            border-radius: 15px;
            font-size: 11px;
          }

          .status.active {
            background: #dbeafe;
            color: #1d4ed8;
          }

          .status.completed {
            background: #dcfce7;
            color: #166534;
          }
        `}
      </style>
    </div>
  );
}

export default PHCDashboard;