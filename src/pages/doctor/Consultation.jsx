import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Consultation() {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSaveConsultation = () => {
    if (!symptoms.trim() || !diagnosis.trim()) {
      alert("Please enter symptoms and diagnosis.");
      return;
    }

    setSaved(true);
  };

  if (saved) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <header
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
            <h2
              style={{
                margin: 0,
                color: "#2563eb",
              }}
            >
              HospitalLocker AI
            </h2>

            <span
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              Healthcare Continuity Platform
            </span>
          </div>

          <div style={{ textAlign: "right" }}>
            <strong>Dr. Medical Officer</strong>

            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              General Medicine
            </div>
          </div>
        </header>

        <main
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "70px 35px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#dcfce7",
                color: "#166534",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "28px",
              }}
            >
              ✓
            </div>

            <h1 style={{ color: "#0f172a" }}>
              Consultation Saved
            </h1>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Ramesh's consultation has been recorded successfully.
            </p>

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              The next step is to create a prescription.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() =>
                  navigate("/doctor/prescription")
                }
                style={{
                  padding: "13px 22px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Create Prescription →
              </button>

              <Link
                to="/doctor"
                style={{
                  padding: "13px 22px",
                  backgroundColor: "white",
                  color: "#475569",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </main>
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
      {/* ================= HEADER ================= */}

      <header
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
          <h2
            style={{
              margin: 0,
              color: "#2563eb",
              fontSize: "21px",
            }}
          >
            HospitalLocker AI
          </h2>

          <span
            style={{
              fontSize: "11px",
              color: "#64748b",
            }}
          >
            Healthcare Continuity Platform
          </span>
        </div>

        <div style={{ textAlign: "right" }}>
          <strong>Dr. Medical Officer</strong>

          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            General Medicine
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "35px",
        }}
      >
        <Link
          to="/doctor/patient/HL-PAT-001"
          style={{
            textDecoration: "none",
            color: "#2563eb",
            fontSize: "14px",
          }}
        >
          ← Back to Patient
        </Link>

        <div style={{ marginTop: "25px" }}>
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
            Patient Consultation
          </h1>

          <p style={{ color: "#64748b" }}>
            Record the consultation for the referred patient.
          </p>
        </div>

        {/* ================= PATIENT BAR ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px 25px",
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#64748b",
                fontSize: "12px",
                margin: 0,
              }}
            >
              PATIENT
            </p>

            <h2
              style={{
                color: "#0f172a",
                margin: "5px 0",
              }}
            >
              Ramesh
            </h2>

            <span
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              HL-PAT-001 · 42 years · Male
            </span>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
                padding: "7px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              HL-REF-00124
            </span>

            <p
              style={{
                color: "#64748b",
                fontSize: "12px",
                marginBottom: 0,
              }}
            >
              General Medicine
            </p>
          </div>
        </section>

        {/* ================= REFERRAL SUMMARY ================= */}

        <section
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "22px",
            marginTop: "20px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#1e3a8a",
            }}
          >
            Referral Summary
          </h3>

          <p
            style={{
              color: "#334155",
              marginBottom: 0,
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            Referred from Primary Health Centre for persistent
            fever and weakness. Referral has been verified and
            patient access is authorized.
          </p>
        </section>

        {/* ================= CONSULTATION FORM ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              color: "#0f172a",
              marginTop: 0,
            }}
          >
            Clinical Consultation
          </h2>

          {/* Symptoms */}

          <div style={{ marginTop: "25px" }}>
            <label className="form-label">
              Presenting Symptoms *
            </label>

            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter patient's current symptoms..."
              className="form-input"
              rows="4"
            />
          </div>

          {/* Diagnosis */}

          <div style={{ marginTop: "20px" }}>
            <label className="form-label">
              Clinical Assessment / Diagnosis *
            </label>

            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter clinical assessment or diagnosis..."
              className="form-input"
              rows="4"
            />
          </div>

          {/* Notes */}

          <div style={{ marginTop: "20px" }}>
            <label className="form-label">
              Doctor's Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add additional clinical notes..."
              className="form-input"
              rows="4"
            />
          </div>

          {/* Follow Up */}

          <div style={{ marginTop: "20px" }}>
            <label className="form-label">
              Follow-up Date
            </label>

            <input
              type="date"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="form-input"
            />
          </div>

          {/* AI Assistance */}

          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ color: "#0f172a" }}>
                AI Clinical Assistance
              </strong>

              <span
                style={{
                  backgroundColor: "#dbeafe",
                  color: "#1d4ed8",
                  padding: "5px 9px",
                  borderRadius: "15px",
                  fontSize: "10px",
                }}
              >
                ASSISTIVE
              </span>
            </div>

            <p
              style={{
                color: "#64748b",
                fontSize: "12px",
                lineHeight: "1.5",
                marginBottom: 0,
              }}
            >
              AI can help summarize available records and
              organize clinical information. It does not
              independently diagnose or prescribe treatment.
            </p>
          </div>
        </section>

        {/* ================= SAVE ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <Link
            to="/doctor/patient/HL-PAT-001"
            style={{
              padding: "13px 22px",
              backgroundColor: "white",
              color: "#475569",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Cancel
          </Link>

          <button
            onClick={handleSaveConsultation}
            style={{
              padding: "13px 24px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Save Consultation →
          </button>
        </div>

        {/* ================= PRIVACY ================= */}

        <div
          style={{
            marginTop: "25px",
            padding: "18px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "10px",
          }}
        >
          <strong style={{ color: "#166534" }}>
            Clinical Data Protection
          </strong>

          <p
            style={{
              color: "#475569",
              fontSize: "12px",
              lineHeight: "1.5",
              marginBottom: 0,
            }}
          >
            Consultation information is intended for authorized
            clinical use and should be handled according to
            applicable healthcare privacy and security
            requirements.
          </p>
        </div>
      </main>

      <style>
        {`
          .form-label {
            display: block;
            color: #334155;
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 8px;
          }

          .form-input {
            width: 100%;
            box-sizing: border-box;
            padding: 13px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            outline: none;
            resize: vertical;
          }

          .form-input:focus {
            border-color: #2563eb;
          }
        `}
      </style>
    </div>
  );
}

export default Consultation;