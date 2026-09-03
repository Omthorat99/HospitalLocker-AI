import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/patient",
      icon: "⌂",
    },
    {
      name: "Health Locker",
      path: "/patient/health-locker",
      icon: "▣",
    },
    {
      name: "Medical History",
      path: "/patient/medical-history",
      icon: "▤",
    },
    {
      name: "My Journey",
      path: "/patient/journey",
      icon: "→",
    },
    {
      name: "Reminders",
      path: "/patient/reminders",
      icon: "◷",
    },
  ];

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#f8fafc",
        borderRight: "1px solid #e5e7eb",
        padding: "24px 15px",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: "bold",
          color: "#94a3b8",
          margin: "0 12px 12px",
          textTransform: "uppercase",
        }}
      >
        Patient Portal
      </p>

      <div>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              marginBottom: "5px",
              borderRadius: "8px",
              textDecoration: "none",
              color: isActive ? "#2563eb" : "#475569",
              backgroundColor: isActive ? "#dbeafe" : "transparent",
              fontWeight: isActive ? "600" : "400",
            })}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "15px",
          backgroundColor: "#eff6ff",
          borderRadius: "10px",
        }}
      >
        <strong style={{ fontSize: "13px" }}>
          Your records are protected
        </strong>

        <p
          style={{
            fontSize: "11px",
            color: "#64748b",
            lineHeight: "1.5",
            marginBottom: 0,
          }}
        >
          Access to your health records is controlled by authorization.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;