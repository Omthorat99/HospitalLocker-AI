import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CreateReferral() {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state?.patient || {
    id: "HL-PAT-001",
    name: "Ramesh",
    age: 42,
    gender: "Male",
    phone: "******4521",
  };

  const [department, setDepartment] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [notes, setNotes] = useState("");
  const [createdReferral, setCreatedReferral] = useState(null);

  const createReferral = () => {
    if (!department || !reason) {
      alert("Please select department and enter referral reason.");
      return;
    }

    const referralId =
      "HL-REF-" +
      Math.floor(10000 + Math.random() * 90000);

    const referral = {
      referralId,
      patientId: patient.id,
      patientName: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,

      source: "Primary Health Centre",
      hospital: "Sassoon General Hospital",

      department,
      reason,
      priority,
      notes,

      status: "Pending",

      date: new Date().toLocaleDateString("en-IN"),

      createdAt: new Date().toISOString(),
    };

    // Save referral for prototype
    localStorage.setItem(
      "hospitalLockerReferral",
      JSON.stringify(referral)
    );

    setCreatedReferral(referral);
  };

  if (createdReferral) {
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
            width: "100%",
            maxWidth: "650px",
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "40px",
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
              fontSize: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            ✓
          </div>

          <h1 style={{ color: "#0f172a" }}>
            Referral Created Successfully
          </h1>

          <p style={{ color: "#64748b" }}>
            The digital referral has been created and is
            ready for the receiving hospital.
          </p>

          <div
            style={{
              marginTop: "25px",
              padding: "25px",
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Referral ID
            </p>

            <h2
              style={{
                margin: 0,
                color: "#2563eb",
                letterSpacing: "1px",
              }}
            >
              {createdReferral.referralId}
            </h2>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#f8fafc",
              borderRadius: "10px",
              textAlign: "left",
              lineHeight: "1.8",
              fontSize: "14px",
            }}
          >
            <strong>Patient:</strong> {createdReferral.patientName}
            <br />

            <strong>Patient ID:</strong>{" "}
            {createdReferral.patientId}
            <br />

            <strong>Department:</strong>{" "}
            {createdReferral.department}
            <br />

            <strong>Priority:</strong>{" "}
            {createdReferral.priority}
            <br />

            <strong>Status:</strong>{" "}
            {createdReferral.status}
          </div>

          <button
            onClick={() =>
              navigate("/phc/qr-referral", {
                state: {
                  patient,
                  referralId: createdReferral.referralId,
                  formData: {
                    department,
                    reason,
                    priority,
                    notes,
                  },
                },
              })
            }
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Generate Referral QR
          </button>

          <button
            onClick={() => navigate("/phc")}
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
            Back to PHC Dashboard
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
        <h2
          style={{
            margin: 0,
            color: "#2563eb",
          }}
        >
          HospitalLocker AI
        </h2>

        <p
          style={{
            margin: "4px 0 0",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          PHC Portal • Digital Referral
        </p>
      </div>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "35px 25px",
        }}
      >
        <p
          style={{
            color: "#64748b",
            marginBottom: "5px",
          }}
        >
          PHC Portal
        </p>

        <h1
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          Create Digital Referral
        </h1>

        <p style={{ color: "#64748b" }}>
          Send a structured referral to the receiving hospital.
        </p>

        {/* Patient Information */}

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "25px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Patient Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
            }}
          >
            <div>
              <small>Patient</small>
              <strong>{patient.name}</strong>
            </div>

            <div>
              <small>Patient ID</small>
              <strong>{patient.id}</strong>
            </div>

            <div>
              <small>Age</small>
              <strong>{patient.age} years</strong>
            </div>

            <div>
              <small>Gender</small>
              <strong>{patient.gender}</strong>
            </div>
          </div>
        </div>

        {/* Referral Form */}

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "20px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Referral Details
          </h2>

          <label>Receiving Department</label>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select department</option>
            <option value="General Medicine">
              General Medicine
            </option>
            <option value="Cardiology">
              Cardiology
            </option>
            <option value="Orthopedics">
              Orthopedics
            </option>
            <option value="Neurology">
              Neurology
            </option>
            <option value="Dermatology">
              Dermatology
            </option>
          </select>

          <label>Reason for Referral</label>

          <textarea
            rows="4"
            placeholder="Describe why the patient is being referred..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Emergency">Emergency</option>
          </select>

          <label>Additional Notes</label>

          <textarea
            rows="4"
            placeholder="Additional clinical information..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Security */}

        <div
          style={{
            marginTop: "20px",
            padding: "18px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "10px",
            fontSize: "13px",
            color: "#475569",
          }}
        >
          <strong style={{ color: "#1d4ed8" }}>
            Privacy & Security
          </strong>

          <p style={{ marginBottom: 0 }}>
            The referral identifier can be used to locate
            the referral. Sensitive medical information should
            not be embedded directly inside the QR code.
          </p>
        </div>

        <button
          onClick={createReferral}
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
          Create Digital Referral
        </button>
      </main>

      <style>
        {`
          label {
            display: block;
            margin-top: 20px;
            margin-bottom: 7px;
            font-weight: 600;
            color: #334155;
            font-size: 14px;
          }

          input,
          select,
          textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            font-size: 14px;
          }

          textarea {
            resize: vertical;
          }

          small {
            display: block;
            color: #64748b;
            margin-bottom: 5px;
          }

          strong {
            display: block;
          }

          @media (max-width: 700px) {
            div[style*="grid-template-columns: repeat(4"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default CreateReferral;