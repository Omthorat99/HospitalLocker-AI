import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function HealthLocker() {
  const [activeTab, setActiveTab] = useState("All");
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const savedPrescription = localStorage.getItem(
      "hospitalLockerPrescription"
    );

    if (savedPrescription) {
      setPrescription(JSON.parse(savedPrescription));
    }
  }, []);

  const documents = [
    {
      id: 1,
      title: "Blood Test Report",
      type: "Lab Report",
      date: "28 August 2026",
      hospital: "Sassoon General Hospital",
      icon: "🧪",
    },
    {
      id: 2,
      title: "CBC Report",
      type: "Lab Report",
      date: "28 August 2026",
      hospital: "Sassoon General Hospital",
      icon: "🧬",
    },
    {
      id: 3,
      title: "Chest X-Ray",
      type: "Imaging",
      date: "29 August 2026",
      hospital: "Sassoon General Hospital",
      icon: "🩻",
    },
    {
      id: 4,
      title: "PHC Referral",
      type: "Referral",
      date: "03 September 2026",
      hospital: "Primary Health Centre",
      icon: "📄",
    },
  ];

  const tabs = [
    "All",
    "Lab Report",
    "Prescription",
    "Imaging",
    "Referral",
  ];

  const filteredDocuments = documents.filter(
    (document) =>
      activeTab === "All" || document.type === activeTab
  );

  const viewDocument = (title) => {
    alert(
      `${title}\n\nDemo document viewer.\nActual document access will be connected to the backend.`
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
            maxWidth: "1200px",
          }}
        >
          {/* Header */}

          <div>
            <p
              style={{
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              Patient Portal
            </p>

            <h1
              style={{
                marginTop: 0,
                marginBottom: "8px",
                color: "#0f172a",
              }}
            >
              Health Locker
            </h1>

            <p style={{ color: "#64748b" }}>
              Your medical records, prescriptions and referrals
              in one place.
            </p>
          </div>

          {/* Security Banner */}

          <div
            style={{
              marginTop: "25px",
              padding: "18px 20px",
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                fontSize: "25px",
              }}
            >
              🔒
            </div>

            <div>
              <strong style={{ color: "#1e40af" }}>
                Your health records are protected
              </strong>

              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "13px",
                  color: "#475569",
                }}
              >
                Records are intended to be accessible only to
                authorized healthcare providers and you.
              </p>
            </div>
          </div>

          {/* Tabs */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "30px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === tab
                      ? "#2563eb"
                      : "#f1f5f9",
                  color:
                    activeTab === tab
                      ? "white"
                      : "#475569",
                  fontWeight:
                    activeTab === tab
                      ? "600"
                      : "400",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Prescription */}

          {(activeTab === "All" ||
            activeTab === "Prescription") &&
            prescription && (
              <div
                style={{
                  marginTop: "25px",
                  backgroundColor: "white",
                  border: "2px solid #bfdbfe",
                  borderRadius: "14px",
                  padding: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontSize: "25px" }}>
                        💊
                      </span>

                      <h2
                        style={{
                          margin: 0,
                          color: "#0f172a",
                        }}
                      >
                        Prescription
                      </h2>
                    </div>

                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        marginBottom: 0,
                      }}
                    >
                      {prescription.doctor} •{" "}
                      {prescription.department}
                    </p>
                  </div>

                  <span
                    style={{
                      backgroundColor: "#dcfce7",
                      color: "#15803d",
                      padding: "6px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    New
                  </span>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "10px",
                      fontSize: "13px",
                    }}
                  >
                    <span>
                      <strong>Prescription ID:</strong>{" "}
                      {prescription.id}
                    </span>

                    <span>
                      <strong>Date:</strong>{" "}
                      {prescription.date}
                    </span>

                    <span>
                      <strong>Referral:</strong>{" "}
                      {prescription.referralId}
                    </span>
                  </div>
                </div>

                {/* Medicines */}

                <h3
                  style={{
                    marginTop: "25px",
                    color: "#0f172a",
                  }}
                >
                  Medicines
                </h3>

                {prescription.medicines.map(
                  (medicine, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "15px",
                        marginTop: "10px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <strong
                          style={{
                            color: "#2563eb",
                            fontSize: "16px",
                          }}
                        >
                          {medicine.name}
                        </strong>

                        <span
                          style={{
                            backgroundColor: "#eff6ff",
                            color: "#1d4ed8",
                            padding: "5px 9px",
                            borderRadius: "6px",
                            fontSize: "12px",
                          }}
                        >
                          {medicine.dosage}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(3, 1fr)",
                          gap: "10px",
                          marginTop: "12px",
                          fontSize: "13px",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              color: "#64748b",
                            }}
                          >
                            Frequency
                          </span>

                          <div>
                            <strong>
                              {medicine.frequency}
                            </strong>
                          </div>
                        </div>

                        <div>
                          <span
                            style={{
                              color: "#64748b",
                            }}
                          >
                            Duration
                          </span>

                          <div>
                            <strong>
                              {medicine.duration}
                            </strong>
                          </div>
                        </div>

                        <div>
                          <span
                            style={{
                              color: "#64748b",
                            }}
                          >
                            Instructions
                          </span>

                          <div>
                            <strong>
                              {medicine.instructions ||
                                "As directed"}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* Advice */}

                {prescription.advice && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "15px",
                      backgroundColor: "#f8fafc",
                      borderRadius: "10px",
                    }}
                  >
                    <strong>Doctor's Advice</strong>

                    <p
                      style={{
                        marginBottom: 0,
                        color: "#475569",
                        fontSize: "13px",
                      }}
                    >
                      {prescription.advice}
                    </p>
                  </div>
                )}

                {/* Follow Up */}

                {prescription.followUp && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "15px",
                      backgroundColor: "#fefce8",
                      border: "1px solid #fde68a",
                      borderRadius: "10px",
                    }}
                  >
                    <strong>
                      Follow-up Date
                    </strong>

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "#854d0e",
                        fontSize: "13px",
                      }}
                    >
                      {prescription.followUp}
                    </p>
                  </div>
                )}
              </div>
            )}

          {/* No Prescription */}

          {activeTab === "Prescription" &&
            !prescription && (
              <div
                style={{
                  marginTop: "25px",
                  padding: "40px",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                <div style={{ fontSize: "40px" }}>
                  💊
                </div>

                <h3 style={{ color: "#334155" }}>
                  No prescriptions found
                </h3>

                <p>
                  Prescriptions created by authorized doctors
                  will appear here.
                </p>
              </div>
            )}

          {/* Documents */}

          {activeTab !== "Prescription" && (
            <div style={{ marginTop: "30px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>Medical Documents</h2>

                <span
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  {filteredDocuments.length} documents
                </span>
              </div>

              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "18px",
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        backgroundColor: "#eff6ff",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "21px",
                      }}
                    >
                      {document.icon}
                    </div>

                    <div>
                      <strong>
                        {document.title}
                      </strong>

                      <p
                        style={{
                          margin: "5px 0",
                          color: "#64748b",
                          fontSize: "12px",
                        }}
                      >
                        {document.hospital}
                      </p>

                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: "11px",
                        }}
                      >
                        {document.type} •{" "}
                        {document.date}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      viewDocument(document.title)
                    }
                    style={{
                      padding: "9px 15px",
                      border: "1px solid #bfdbfe",
                      borderRadius: "7px",
                      backgroundColor: "#eff6ff",
                      color: "#2563eb",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Empty All State */}

          {activeTab === "All" &&
            filteredDocuments.length === 0 &&
            !prescription && (
              <p
                style={{
                  color: "#64748b",
                  marginTop: "25px",
                }}
              >
                No records available.
              </p>
            )}

          {/* Demo Notice */}

          <div
            style={{
              marginTop: "30px",
              padding: "15px",
              backgroundColor: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: "10px",
              fontSize: "12px",
              color: "#9a3412",
            }}
          >
            <strong>Prototype Notice:</strong>{" "}
            This demonstration currently uses browser
            storage for temporary data persistence. In the
            production system, records will be stored through
            the secure backend with authorization and audit
            controls.
          </div>
        </main>
      </div>

      <style>
        {`
          @media (max-width: 800px) {
            main {
              padding: 20px !important;
            }

            div[style*="grid-template-columns: repeat(3"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default HealthLocker;