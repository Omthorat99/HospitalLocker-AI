import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function MedicalHistory() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const records = [
    {
      id: 1,
      date: "28 Aug 2026",
      facility: "Sassoon General Hospital",
      doctor: "General Medicine",
      type: "Consultation",
      diagnosis: "Fever and weakness",
      treatment: "Medication prescribed and follow-up advised.",
    },
    {
      id: 2,
      date: "28 Aug 2026",
      facility: "Sassoon General Hospital",
      doctor: "Pathology Department",
      type: "Lab Report",
      diagnosis: "Blood investigation completed",
      treatment: "Report added to Health Locker.",
    },
    {
      id: 3,
      date: "24 Aug 2026",
      facility: "Primary Health Centre",
      doctor: "PHC Medical Officer",
      type: "Referral",
      diagnosis: "Requires further hospital evaluation",
      treatment: "Digital referral created for General Medicine.",
    },
    {
      id: 4,
      date: "15 Aug 2026",
      facility: "Primary Health Centre",
      doctor: "PHC Medical Officer",
      type: "Consultation",
      diagnosis: "Initial health assessment",
      treatment: "Basic treatment provided.",
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
            Patient Portal / Medical History
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Medical History
          </h1>

          <p style={{ color: "#64748b" }}>
            View your previous consultations, reports and referrals.
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
            <div className="history-stat">
              <span>Total Records</span>
              <strong>{records.length}</strong>
            </div>

            <div className="history-stat">
              <span>Healthcare Facilities</span>
              <strong>2</strong>
            </div>

            <div className="history-stat">
              <span>Latest Visit</span>
              <strong style={{ fontSize: "16px" }}>
                28 Aug 2026
              </strong>
            </div>
          </div>

          {/* Timeline */}

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "25px",
              marginTop: "30px",
            }}
          >
            <h2>Medical Records</h2>

            <div style={{ marginTop: "25px" }}>
              {records.map((record, index) => (
                <div
                  key={record.id}
                  style={{
                    display: "flex",
                    position: "relative",
                    paddingBottom:
                      index === records.length - 1 ? "0" : "25px",
                  }}
                >
                  {/* Timeline */}

                  {index !== records.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "17px",
                        top: "36px",
                        height: "100%",
                        width: "2px",
                        backgroundColor: "#dbeafe",
                      }}
                    />
                  )}

                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "#2563eb",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      zIndex: 1,
                      flexShrink: 0,
                    }}
                  >
                    {record.type === "Consultation"
                      ? "C"
                      : record.type === "Lab Report"
                      ? "L"
                      : "R"}
                  </div>

                  {/* Record */}

                  <div
                    style={{
                      marginLeft: "20px",
                      flex: 1,
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px",
                      padding: "18px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "11px",
                            backgroundColor: "#dbeafe",
                            color: "#1d4ed8",
                            padding: "4px 8px",
                            borderRadius: "12px",
                          }}
                        >
                          {record.type}
                        </span>

                        <h3
                          style={{
                            margin: "10px 0 5px",
                            color: "#0f172a",
                          }}
                        >
                          {record.diagnosis}
                        </h3>

                        <p
                          style={{
                            margin: "0 0 5px",
                            color: "#2563eb",
                            fontSize: "13px",
                          }}
                        >
                          {record.facility}
                        </p>

                        <p
                          style={{
                            margin: 0,
                            color: "#64748b",
                            fontSize: "13px",
                          }}
                        >
                          {record.doctor}
                        </p>
                      </div>

                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {record.date}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "#475569",
                        fontSize: "13px",
                        margin: "15px 0",
                      }}
                    >
                      {record.treatment}
                    </p>

                    <button
                      onClick={() => setSelectedRecord(record)}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #2563eb",
                        color: "#2563eb",
                        padding: "8px 14px",
                        borderRadius: "7px",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}

          {selectedRecord && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 200,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "14px",
                  padding: "30px",
                  width: "90%",
                  maxWidth: "550px",
                  boxSizing: "border-box",
                }}
              >
                <h2 style={{ marginTop: 0 }}>
                  Medical Record Details
                </h2>

                <p>
                  <strong>Type:</strong> {selectedRecord.type}
                </p>

                <p>
                  <strong>Date:</strong> {selectedRecord.date}
                </p>

                <p>
                  <strong>Facility:</strong>{" "}
                  {selectedRecord.facility}
                </p>

                <p>
                  <strong>Doctor/Department:</strong>{" "}
                  {selectedRecord.doctor}
                </p>

                <p>
                  <strong>Diagnosis:</strong>{" "}
                  {selectedRecord.diagnosis}
                </p>

                <p>
                  <strong>Treatment:</strong>{" "}
                  {selectedRecord.treatment}
                </p>

                <button
                  onClick={() => setSelectedRecord(null)}
                  style={{
                    marginTop: "15px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "7px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>
        {`
          .history-stat {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
          }

          .history-stat span {
            display: block;
            color: #64748b;
            font-size: 13px;
            margin-bottom: 10px;
          }

          .history-stat strong {
            font-size: 25px;
            color: #2563eb;
          }
        `}
      </style>
    </div>
  );
}

export default MedicalHistory;