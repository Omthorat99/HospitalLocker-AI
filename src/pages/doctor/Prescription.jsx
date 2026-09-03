import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Prescription() {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ]);

  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saved, setSaved] = useState(false);

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) return;

    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const updateMedicine = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const savePrescription = () => {
    const valid = medicines.every(
      (medicine) =>
        medicine.name.trim() &&
        medicine.dosage.trim() &&
        medicine.frequency.trim() &&
        medicine.duration.trim()
    );

    if (!valid) {
      alert("Please fill Medicine Name, Dosage, Frequency and Duration.");
      return;
    }

    const prescription = {
      id: "HL-RX-" + Date.now(),
      patientId: "HL-PAT-001",
      patientName: "Ramesh",
      referralId: "HL-REF-00124",
      doctor: "Dr. Medical Officer",
      department: "General Medicine",
      date: new Date().toLocaleDateString("en-IN"),
      medicines,
      advice,
      followUp,
    };

    // Demo persistence
    localStorage.setItem(
      "hospitalLockerPrescription",
      JSON.stringify(prescription)
    );

    setSaved(true);
  };

  if (saved) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            maxWidth: "600px",
            padding: "40px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              margin: "0 auto 20px",
            }}
          >
            ✓
          </div>

          <h1 style={{ color: "#0f172a" }}>
            Prescription Saved
          </h1>

          <p style={{ color: "#64748b" }}>
            Prescription has been securely added to the patient's
            Health Locker.
          </p>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <strong>Patient:</strong> Ramesh
            <br />
            <strong>Patient ID:</strong> HL-PAT-001
            <br />
            <strong>Referral:</strong> HL-REF-00124
          </div>

          <button
            onClick={() => navigate("/patient/health-locker")}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            View Patient Health Locker
          </button>

          <button
            onClick={() => navigate("/doctor")}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              backgroundColor: "white",
              color: "#334155",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Back to Doctor Dashboard
          </button>
        </div>
      </div>
    );
  }

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
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "18px 35px",
        }}
      >
        <h2 style={{ margin: 0, color: "#2563eb" }}>
          HospitalLocker AI
        </h2>

        <p
          style={{
            margin: "4px 0 0",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Doctor Portal • Prescription
        </p>
      </div>

      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "35px 25px",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <p
            style={{
              color: "#64748b",
              marginBottom: "5px",
            }}
          >
            Doctor Portal
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Create Prescription
          </h1>

          <p style={{ color: "#64748b" }}>
            Create and save the patient's prescription.
          </p>
        </div>

        {/* Patient */}

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            Patient Information
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
            }}
          >
            <div>
              <small style={{ color: "#64748b" }}>
                Patient
              </small>
              <div>
                <strong>Ramesh</strong>
              </div>
            </div>

            <div>
              <small style={{ color: "#64748b" }}>
                Patient ID
              </small>
              <div>
                <strong>HL-PAT-001</strong>
              </div>
            </div>

            <div>
              <small style={{ color: "#64748b" }}>
                Referral
              </small>
              <div>
                <strong>HL-REF-00124</strong>
              </div>
            </div>

            <div>
              <small style={{ color: "#64748b" }}>
                Department
              </small>
              <div>
                <strong>General Medicine</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Medicines */}

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>
                Medicines
              </h2>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                Add medicines prescribed during consultation.
              </p>
            </div>

            <button
              onClick={addMedicine}
              style={{
                padding: "10px 15px",
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              + Add Medicine
            </button>
          </div>

          {medicines.map((medicine, index) => (
            <div
              key={index}
              style={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <strong>
                  Medicine {index + 1}
                </strong>

                {medicines.length > 1 && (
                  <button
                    onClick={() => removeMedicine(index)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#dc2626",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "15px",
                }}
              >
                <input
                  placeholder="Medicine Name"
                  value={medicine.name}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Dosage e.g. 500 mg"
                  value={medicine.dosage}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "dosage",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Frequency e.g. Twice daily"
                  value={medicine.frequency}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "frequency",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Duration e.g. 5 days"
                  value={medicine.duration}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "duration",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Instructions e.g. Take after food"
                  value={medicine.instructions}
                  onChange={(e) =>
                    updateMedicine(
                      index,
                      "instructions",
                      e.target.value
                    )
                  }
                  style={{
                    gridColumn: "1 / -1",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Advice */}

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <h2>Doctor's Advice</h2>

          <textarea
            placeholder="Enter advice for the patient..."
            value={advice}
            onChange={(e) =>
              setAdvice(e.target.value)
            }
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />

          <h3 style={{ marginTop: "20px" }}>
            Follow-up Date
          </h3>

          <input
            type="date"
            value={followUp}
            onChange={(e) =>
              setFollowUp(e.target.value)
            }
            style={{
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* AI Assistance */}

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <strong style={{ color: "#1d4ed8" }}>
            AI-Assisted Prescription Check
          </strong>

          <p
            style={{
              color: "#475569",
              fontSize: "13px",
              lineHeight: "1.6",
              marginBottom: 0,
            }}
          >
            HospitalLocker AI can assist clinicians by
            checking prescription completeness and
            highlighting potential medication conflicts.
            Final prescribing decisions remain with the
            qualified doctor.
          </p>
        </div>

        {/* Save */}

        <button
          onClick={savePrescription}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "15px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Save Prescription
        </button>

        {/* Privacy */}

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f1f5f9",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <strong>Privacy & Security:</strong>{" "}
          Patient health information is intended to be
          accessed only by authorized healthcare personnel
          and the patient.
        </div>
      </main>

      <style>
        {`
          input {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 14px;
            outline: none;
          }

          input:focus,
          textarea:focus {
            border-color: #2563eb;
          }

          @media (max-width: 700px) {
            main {
              padding: 20px !important;
            }

            div[style*="grid-template-columns: repeat(4"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Prescription;