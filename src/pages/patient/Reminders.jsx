import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Reminders() {
  const [completed, setCompleted] = useState([]);

  const reminders = [
    {
      id: 1,
      type: "Medicine",
      title: "Take Paracetamol",
      description: "Take 1 tablet after food.",
      time: "1:00 PM",
      date: "Today",
      priority: "Normal",
    },
    {
      id: 2,
      type: "Medicine",
      title: "Take Vitamin D",
      description: "Take 1 tablet after breakfast.",
      time: "9:00 AM",
      date: "Today",
      priority: "Normal",
    },
    {
      id: 3,
      type: "Appointment",
      title: "Doctor Follow-up",
      description: "Follow-up consultation at General Medicine.",
      time: "10:30 AM",
      date: "05 Sep 2026",
      priority: "Important",
    },
    {
      id: 4,
      type: "Test",
      title: "Blood Test",
      description: "Complete the recommended blood test.",
      time: "8:00 AM",
      date: "07 Sep 2026",
      priority: "Important",
    },
  ];

  const toggleCompleted = (id) => {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

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
            maxWidth: "1100px",
          }}
        >
          <p
            style={{
              color: "#64748b",
              marginBottom: "5px",
            }}
          >
            Patient Portal / Reminders
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Reminders
          </h1>

          <p style={{ color: "#64748b" }}>
            Keep track of medicines, appointments and recommended tests.
          </p>

          {/* Summary */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div className="reminder-stat">
              <span>Today's Reminders</span>
              <strong>2</strong>
            </div>

            <div className="reminder-stat">
              <span>Upcoming</span>
              <strong>2</strong>
            </div>

            <div className="reminder-stat">
              <span>Completed</span>
              <strong>{completed.length}</strong>
            </div>
          </div>

          {/* Reminder list */}

          <div
            style={{
              marginTop: "30px",
            }}
          >
            <h2>My Reminders</h2>

            <div
              style={{
                display: "grid",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              {reminders.map((reminder) => {
                const isCompleted = completed.includes(reminder.id);

                return (
                  <div
                    key={reminder.id}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      opacity: isCompleted ? 0.6 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      {/* Icon */}

                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "10px",
                          backgroundColor:
                            reminder.type === "Medicine"
                              ? "#dbeafe"
                              : reminder.type === "Appointment"
                              ? "#fef3c7"
                              : "#dcfce7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                        }}
                      >
                        {reminder.type === "Medicine"
                          ? "💊"
                          : reminder.type === "Appointment"
                          ? "📅"
                          : "🧪"}
                      </div>

                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <h3
                            style={{
                              margin: 0,
                              color: "#0f172a",
                              textDecoration: isCompleted
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {reminder.title}
                          </h3>

                          <span
                            style={{
                              fontSize: "11px",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              backgroundColor:
                                reminder.priority === "Important"
                                  ? "#fee2e2"
                                  : "#f1f5f9",
                              color:
                                reminder.priority === "Important"
                                  ? "#b91c1c"
                                  : "#64748b",
                            }}
                          >
                            {reminder.priority}
                          </span>
                        </div>

                        <p
                          style={{
                            margin: "6px 0",
                            color: "#64748b",
                            fontSize: "13px",
                          }}
                        >
                          {reminder.description}
                        </p>

                        <span
                          style={{
                            color: "#2563eb",
                            fontSize: "12px",
                          }}
                        >
                          {reminder.date} • {reminder.time}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCompleted(reminder.id)}
                      style={{
                        border: "1px solid #2563eb",
                        backgroundColor: isCompleted
                          ? "#2563eb"
                          : "white",
                        color: isCompleted
                          ? "white"
                          : "#2563eb",
                        padding: "9px 14px",
                        borderRadius: "7px",
                        cursor: "pointer",
                      }}
                    >
                      {isCompleted ? "Completed" : "Mark Done"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Information */}

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
            }}
          >
            <strong>Follow-up matters</strong>

            <p
              style={{
                color: "#475569",
                fontSize: "13px",
                lineHeight: "1.5",
                marginBottom: 0,
              }}
            >
              HospitalLocker AI keeps follow-up information connected
              with the patient's healthcare journey so important
              appointments, medicines and tests are easier to track.
            </p>
          </div>
        </main>
      </div>

      <style>
        {`
          .reminder-stat {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
          }

          .reminder-stat span {
            display: block;
            color: #64748b;
            font-size: 13px;
            margin-bottom: 10px;
          }

          .reminder-stat strong {
            font-size: 25px;
            color: #2563eb;
          }
        `}
      </style>
    </div>
  );
}

export default Reminders;