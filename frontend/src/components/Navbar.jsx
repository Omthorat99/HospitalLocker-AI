import React from "react";

function Navbar() {
  return (
    <nav
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "21px",
            color: "#2563eb",
          }}
        >
          HospitalLocker AI
        </h2>

        <span
          style={{
            fontSize: "11px",
            color: "#6b7280",
          }}
        >
          Healthcare Continuity Platform
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <button
          style={{
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          🔔
        </button>

        <div>
          <strong>Ramesh</strong>
          <div
            style={{
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Patient
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;