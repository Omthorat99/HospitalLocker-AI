import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function QRReferral() {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state?.patient || {
    id: "HL-PAT-001",
    name: "Ramesh",
    age: 42,
    gender: "Male",
  };

  const referralId =
    location.state?.referralId || "HL-REF-00124";

  const formData = location.state?.formData || {
    department: "General Medicine",
    reason: "Requires further hospital evaluation",
    priority: "Important",
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

      <main
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          padding: "35px",
        }}
      >
        <p style={{ color: "#64748b", marginBottom: "5px" }}>
          Provider Portal / Referral QR
        </p>

        <h1 style={{ margin: 0, color: "#0f172a" }}>
          Digital Referral
        </h1>

        <p style={{ color: "#64748b" }}>
          Referral created successfully. The patient can present this
          referral at the receiving hospital.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          {/* QR Section */}

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <h2>Referral QR</h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Scan this QR at the receiving hospital.
            </p>

            {/* Demo QR */}

            <div
              style={{
                width: "220px",
                height: "220px",
                margin: "30px auto",
                border: "8px solid #0f172a",
                display: "grid",
                gridTemplateColumns: "repeat(11, 1fr)",
                gridTemplateRows: "repeat(11, 1fr)",
                gap: "3px",
                padding: "10px",
                boxSizing: "border-box",
                backgroundColor: "white",
              }}
            >
              {Array.from({ length: 121 }).map((_, index) => {
                const filled =
                  (index * 17 +
                    index * index * 3 +
                    7) %
                    5 <
                  2;

                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: filled
                        ? "#0f172a"
                        : "white",
                    }}
                  />
                );
              })}
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Demo QR representation
            </p>

            <div
              style={{
                backgroundColor: "#eff6ff",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                REFERRAL ID
              </span>

              <strong
                style={{
                  color: "#2563eb",
                  fontSize: "18px",
                  letterSpacing: "1px",
                }}
              >
                {referralId}
              </strong>
            </div>
          </div>

          {/* Referral Details */}

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "15px",
              padding: "30px",
            }}
          >
            <h2>Referral Details</h2>

            <div style={{ marginTop: "25px" }}>
              <div className="detail">
                <span>Patient</span>
                <strong>{patient.name}</strong>
              </div>

              <div className="detail">
                <span>Patient ID</span>
                <strong>{patient.id}</strong>
              </div>

              <div className="detail">
                <span>Age / Gender</span>
                <strong>
                  {patient.age} / {patient.gender}
                </strong>
              </div>

              <div className="detail">
                <span>Receiving Facility</span>
                <strong>Sassoon General Hospital</strong>
              </div>

              <div className="detail">
                <span>Department</span>
                <strong>{formData.department}</strong>
              </div>

              <div className="detail">
                <span>Priority</span>

                <span
                  style={{
                    display: "inline-block",
                    width: "fit-content",
                    backgroundColor:
                      formData.priority === "Urgent"
                        ? "#fee2e2"
                        : "#fef3c7",
                    color:
                      formData.priority === "Urgent"
                        ? "#b91c1c"
                        : "#92400e",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "12px",
                  }}
                >
                  {formData.priority}
                </span>
              </div>

              <div className="detail">
                <span>Reason for Referral</span>
                <strong>{formData.reason}</strong>
              </div>
            </div>

            <div
              style={{
                marginTop: "25px",
                padding: "15px",
                backgroundColor: "#f8fafc",
                borderRadius: "10px",
              }}
            >
              <strong style={{ fontSize: "13px" }}>
                How it works
              </strong>

              <ol
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                  lineHeight: "1.7",
                  paddingLeft: "20px",
                }}
              >
                <li>Patient presents the referral QR.</li>
                <li>Hospital scans the referral.</li>
                <li>Authorized staff retrieve the referral.</li>
                <li>Doctor continues the patient's care.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Security notice */}

        <div
          style={{
            marginTop: "25px",
            padding: "18px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "10px",
          }}
        >
          <strong>Privacy & Security</strong>

          <p
            style={{
              marginBottom: 0,
              color: "#475569",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            The QR is designed to represent a referral identifier,
            not to expose the patient's complete medical history.
            Actual records should be retrieved only through
            authorized access.
          </p>
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <button
            onClick={() => navigate("/phc")}
            style={{
              padding: "11px 18px",
              border: "1px solid #cbd5e1",
              backgroundColor: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => window.print()}
            style={{
              padding: "11px 18px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Print Referral
          </button>
        </div>
      </main>

      <style>
        {`
          .detail {
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
          }

          .detail span:first-child {
            display: block;
            color: #64748b;
            font-size: 12px;
            margin-bottom: 5px;
          }

          .detail strong {
            display: block;
            color: #0f172a;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
}

export default QRReferral;