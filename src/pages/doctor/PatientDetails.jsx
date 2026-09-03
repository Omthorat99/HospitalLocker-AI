import React from "react";
import { Link, useParams } from "react-router-dom";

function PatientDetails() {
  const { id } = useParams();

  const patient = {
    name: "Ramesh",
    patientId: id || "HL-PAT-001",
    age: 42,
    gender: "Male",
    phone: "+91 XXXXX XXXXX",

    referralId: "HL-REF-00124",
    referredFrom: "Primary Health Centre",
    department: "General Medicine",
    reason: "Persistent fever and weakness",
    priority: "Normal",
    referralStatus: "Verified",

    bloodGroup: "B+",
    allergies: "No known allergies",
  };

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
          boxSizing: "border-box",
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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "35px",
        }}
      >
        {/* Back */}

        <Link
          to="/doctor"
          style={{
            textDecoration: "none",
            color: "#2563eb",
            fontSize: "14px",
          }}
        >
          ← Back to Doctor Dashboard
        </Link>

        {/* Title */}

        <div style={{ marginTop: "25px" }}>
          <p
            style={{
              color: "#64748b",
              marginBottom: "5px",
            }}
          >
            Authorized Clinical Access
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            {patient.name}
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            Patient ID: {patient.patientId}
          </p>
        </div>

        {/* ================= PATIENT OVERVIEW ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#0f172a",
              }}
            >
              Patient Overview
            </h2>

            <span
              style={{
                backgroundColor: "#dcfce7",
                color: "#166534",
                padding: "7px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              ✓ Referral Verified
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "25px",
              marginTop: "25px",
            }}
          >
            <Info
              label="Age"
              value={`${patient.age} years`}
            />

            <Info
              label="Gender"
              value={patient.gender}
            />

            <Info
              label="Blood Group"
              value={patient.bloodGroup}
            />

            <Info
              label="Allergies"
              value={patient.allergies}
            />
          </div>
        </section>

        {/* ================= REFERRAL ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <h2 style={{ color: "#0f172a", marginTop: 0 }}>
            Current Referral
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "25px",
              marginTop: "20px",
            }}
          >
            <Info
              label="Referral ID"
              value={patient.referralId}
            />

            <Info
              label="Referred From"
              value={patient.referredFrom}
            />

            <Info
              label="Department"
              value={patient.department}
            />

            <Info
              label="Priority"
              value={patient.priority}
            />

            <Info
              label="Status"
              value={patient.referralStatus}
            />

            <Info
              label="Reason"
              value={patient.reason}
            />
          </div>
        </section>

        {/* ================= AI SUMMARY ================= */}

        <section
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#1e3a8a",
              }}
            >
              AI-Assisted Patient Summary
            </h2>

            <span
              style={{
                fontSize: "11px",
                backgroundColor: "white",
                padding: "6px 10px",
                borderRadius: "15px",
                color: "#2563eb",
              }}
            >
              Decision Support
            </span>
          </div>

          <p
            style={{
              color: "#334155",
              lineHeight: "1.6",
              fontSize: "14px",
              marginBottom: 0,
            }}
          >
            Patient Ramesh, age 42, has been referred from a
            Primary Health Centre to General Medicine for
            persistent fever and weakness. The referral is
            currently verified and ready for clinical
            consultation.
          </p>

          <p
            style={{
              color: "#64748b",
              fontSize: "12px",
              marginBottom: 0,
              marginTop: "15px",
            }}
          >
            AI-generated summaries are intended to assist
            healthcare professionals and should not replace
            clinical judgment.
          </p>
        </section>

        {/* ================= MEDICAL RECORDS ================= */}

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
              marginTop: 0,
              color: "#0f172a",
            }}
          >
            Available Medical Records
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <Record
              title="Medical History"
              text="Previous consultations and diagnoses"
            />

            <Record
              title="Laboratory Reports"
              text="Blood test and diagnostic reports"
            />

            <Record
              title="Previous Prescriptions"
              text="Earlier medicines and treatment records"
            />

            <Record
              title="Referral History"
              text="Previous referrals between healthcare facilities"
            />
          </div>
        </section>

        {/* ================= ACTIONS ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <Link
            to="/doctor/consultation"
            style={{
              textDecoration: "none",
            }}
          >
            <button
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
              Start Consultation →
            </button>
          </Link>
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
            Privacy & Access Control
          </strong>

          <p
            style={{
              color: "#475569",
              fontSize: "13px",
              lineHeight: "1.5",
              marginBottom: 0,
            }}
          >
            This patient information is displayed for
            authorized clinical use. Access should be limited
            to information required for patient care.
          </p>
        </div>
      </main>
    </div>
  );
}


/* ================= INFO COMPONENT ================= */

function Info({ label, value }) {
  return (
    <div>
      <p
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "12px",
          marginBottom: "6px",
        }}
      >
        {label}
      </p>

      <strong
        style={{
          color: "#0f172a",
          fontSize: "14px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}


/* ================= RECORD COMPONENT ================= */

function Record({ title, text }) {
  return (
    <div
      style={{
        padding: "18px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        backgroundColor: "#f8fafc",
      }}
    >
      <strong
        style={{
          color: "#0f172a",
        }}
      >
        {title}
      </strong>

      <p
        style={{
          color: "#64748b",
          fontSize: "12px",
          marginBottom: 0,
          marginTop: "7px",
        }}
      >
        {text}
      </p>
    </div>
  );
}


export default PatientDetails;