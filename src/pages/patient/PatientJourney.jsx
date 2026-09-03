import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function PatientJourney() {
  const journey = [
    {
      step: "1",
      title: "PHC Visit",
      facility: "Primary Health Centre",
      date: "24 Aug 2026",
      status: "Completed",
      description: "Initial consultation completed at PHC.",
    },
    {
      step: "2",
      title: "Digital Referral Created",
      facility: "Primary Health Centre",
      date: "24 Aug 2026",
      status: "Completed",
      description: "Referral created for further hospital consultation.",
    },
    {
      step: "3",
      title: "Hospital Referral Received",
      facility: "Sassoon General Hospital",
      date: "25 Aug 2026",
      status: "Completed",
      description: "Hospital received the digital referral.",
    },
    {
      step: "4",
      title: "Doctor Consultation",
      facility: "Sassoon General Hospital",
      date: "28 Aug 2026",
      status: "Current",
      description: "Doctor consultation and medical review.",
    },
    {
      step: "5",
      title: "Prescription & Follow-up",
      facility: "Sassoon General Hospital",
      date: "Pending",
      status: "Upcoming",
      description: "Prescription and follow-up plan will be added here.",
    },
  ];

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
          {/* Header */}

          <p
            style={{
              color: "#64748b",
              marginBottom: "5px",
            }}
          >
            Patient Portal / My Journey
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            My Healthcare Journey
          </h1>

          <p style={{ color: "#64748b" }}>
            Track your healthcare journey from PHC to hospital care.
          </p>

          {/* Current status */}

          <div
            style={{
              marginTop: "30px",
              padding: "22px",
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              CURRENT STATUS
            </p>

            <h2
              style={{
                margin: "8px 0",
                color: "#1d4ed8",
              }}
            >
              Doctor Consultation
            </h2>

            <p
              style={{
                margin: 0,
                color: "#475569",
              }}
            >
              Your referral has reached Sassoon General Hospital.
            </p>
          </div>

          {/* Journey timeline */}

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "30px",
              marginTop: "25px",
            }}
          >
            <h2>Journey Timeline</h2>

            <div style={{ marginTop: "30px" }}>
              {journey.map((item, index) => (
                <div
                  key={item.step}
                  style={{
                    display: "flex",
                    position: "relative",
                    minHeight: "110px",
                  }}
                >
                  {/* Timeline line */}

                  {index !== journey.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "17px",
                        top: "35px",
                        width: "2px",
                        height: "90px",
                        backgroundColor:
                          item.status === "Completed"
                            ? "#2563eb"
                            : "#cbd5e1",
                      }}
                    />
                  )}

                  {/* Circle */}

                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor:
                        item.status === "Completed"
                          ? "#2563eb"
                          : item.status === "Current"
                          ? "#f59e0b"
                          : "#e2e8f0",
                      color:
                        item.status === "Upcoming"
                          ? "#64748b"
                          : "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      zIndex: 1,
                      flexShrink: 0,
                    }}
                  >
                    {item.status === "Completed"
                      ? "✓"
                      : item.step}
                  </div>

                  {/* Content */}

                  <div
                    style={{
                      marginLeft: "20px",
                      paddingBottom: "25px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          color: "#0f172a",
                        }}
                      >
                        {item.title}
                      </h3>

                      <span
                        style={{
                          padding: "4px 9px",
                          borderRadius: "15px",
                          fontSize: "11px",
                          backgroundColor:
                            item.status === "Completed"
                              ? "#dcfce7"
                              : item.status === "Current"
                              ? "#fef3c7"
                              : "#f1f5f9",
                          color:
                            item.status === "Completed"
                              ? "#166534"
                              : item.status === "Current"
                              ? "#92400e"
                              : "#64748b",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: "5px 0",
                        color: "#2563eb",
                        fontSize: "13px",
                      }}
                    >
                      {item.facility}
                    </p>

                    <p
                      style={{
                        margin: "5px 0",
                        color: "#64748b",
                        fontSize: "13px",
                      }}
                    >
                      {item.description}
                    </p>

                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "12px",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral information */}

          <div
            style={{
              marginTop: "25px",
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "25px",
            }}
          >
            <h2>Referral Information</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div>
                <p style={{ color: "#64748b", marginBottom: "5px" }}>
                  Referral ID
                </p>

                <strong>HL-REF-2026-00124</strong>
              </div>

              <div>
                <p style={{ color: "#64748b", marginBottom: "5px" }}>
                  Referred From
                </p>

                <strong>Primary Health Centre</strong>
              </div>

              <div>
                <p style={{ color: "#64748b", marginBottom: "5px" }}>
                  Referred To
                </p>

                <strong>Sassoon General Hospital</strong>
              </div>

              <div>
                <p style={{ color: "#64748b", marginBottom: "5px" }}>
                  Department
                </p>

                <strong>General Medicine</strong>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientJourney;