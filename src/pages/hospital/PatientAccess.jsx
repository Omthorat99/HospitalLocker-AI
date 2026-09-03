import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PatientAccess() {
  const navigate = useNavigate();

  const patient = {
    name: "Ramesh",
    patientId: "HL-PAT-001",
    age: 42,
    gender: "Male",
    referralId: "HL-REF-00124",
    hospital: "Sassoon General Hospital",
    department: "General Medicine",
    reason: "Persistent fever and weakness",
    referralSource: "Primary Health Centre",
  };

  const handleContinue = () => {
    navigate("/doctor/patient/HL-PAT-001");
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
          <strong>Hospital Reception</strong>

          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Sassoon General Hospital
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "35px",
        }}
      >
        <Link
          to="/hospital/referrals"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Back to Referral Search
        </Link>

        <p
          style={{
            color: "#64748b",
            marginTop: "25px",
            marginBottom: "5px",
          }}
        >
          Authorized Patient Access
        </p>

        <h1
          style={{
            marginTop: 0,
            marginBottom: "8px",
            color: "#0f172a",
          }}
        >
          Patient Details
        </h1>

        <p style={{ color: "#64748b" }}>
          Verify the referral and authorize access to the
          patient's healthcare information.
        </p>

        {/* ================= VERIFIED ================= */}

        <div
          style={{
            marginTop: "25px",
            padding: "18px",
            backgroundColor: "#ecfdf5",
            border: "1px solid #bbf7d0",
            borderRadius: "10px",
          }}
        >
          <strong style={{ color: "#166534" }}>
            ✓ Referral Verified
          </strong>

          <p
            style={{
              color: "#475569",
              fontSize: "13px",
              marginBottom: 0,
            }}
          >
            Referral {patient.referralId} has been successfully
            verified.
          </p>
        </div>

        {/* ================= PATIENT INFORMATION ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "25px",
          }}
        >
          <h2 style={{ color: "#0f172a" }}>
            Patient Information
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
              label="Patient Name"
              value={patient.name}
            />

            <Info
              label="Patient ID"
              value={patient.patientId}
            />

            <Info
              label="Age"
              value={`${patient.age} years`}
            />

            <Info
              label="Gender"
              value={patient.gender}
            />

            <Info
              label="Referral ID"
              value={patient.referralId}
            />

            <Info
              label="Referral Source"
              value={patient.referralSource}
            />
          </div>
        </section>

        {/* ================= REFERRAL INFORMATION ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <h2 style={{ color: "#0f172a" }}>
            Referral Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "25px",
              marginTop: "20px",
            }}
          >
            <Info
              label="Hospital"
              value={patient.hospital}
            />

            <Info
              label="Department"
              value={patient.department}
            />

            <Info
              label="Reason for Referral"
              value={patient.reason}
            />

            <Info
              label="Access Level"
              value="Authorized Clinical Access"
            />
          </div>
        </section>

        {/* ================= AVAILABLE RECORDS ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <h2 style={{ color: "#0f172a" }}>
            Available Records
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
              description="Previous consultations and medical records"
            />

            <Record
              title="Lab Reports"
              description="Available laboratory reports"
            />

            <Record
              title="Prescriptions"
              description="Previous prescriptions"
            />

            <Record
              title="Referrals"
              description="Previous healthcare referrals"
            />
          </div>
        </section>

        {/* ================= PRIVACY ================= */}

        <div
          style={{
            marginTop: "20px",
            padding: "18px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "10px",
          }}
        >
          <strong style={{ color: "#1e40af" }}>
            Privacy & Security
          </strong>

          <p
            style={{
              color: "#475569",
              fontSize: "13px",
              lineHeight: "1.5",
              marginBottom: 0,
            }}
          >
            Patient records should only be accessed by authorized
            healthcare staff and only for purposes related to
            patient care.
          </p>
        </div>

        {/* ================= CONTINUE ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "25px",
          }}
        >
          <button
            onClick={handleContinue}
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
            Continue to Doctor →
          </button>
        </div>
      </main>
    </div>
  );
}


/* ================= INFORMATION COMPONENT ================= */

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

function Record({ title, description }) {
  return (
    <div
      style={{
        padding: "18px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        backgroundColor: "#f8fafc",
      }}
    >
      <strong style={{ color: "#0f172a" }}>
        {title}
      </strong>

      <p
        style={{
          color: "#64748b",
          fontSize: "12px",
          marginBottom: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}


export default PatientAccess;