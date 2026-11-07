import React from "react";
import { Link } from "react-router-dom";

function DoctorDashboard() {
  const referrals = [
    {
      id: "HL-REF-00124",
      patient: "Ramesh",
      patientId: "HL-PAT-001",
      age: 42,
      department: "General Medicine",
      reason: "Persistent fever and weakness",
      priority: "Normal",
      status: "Waiting",
    },
    {
      id: "HL-REF-00123",
      patient: "Patient 002",
      patientId: "HL-PAT-002",
      age: 56,
      department: "Cardiology",
      reason: "Chest discomfort",
      priority: "High",
      status: "In Consultation",
    },
    {
      id: "HL-REF-00122",
      patient: "Patient 003",
      patientId: "HL-PAT-003",
      age: 35,
      department: "Orthopedics",
      reason: "Knee pain",
      priority: "Normal",
      status: "Completed",
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
            marginTop: 0,
            marginBottom: "8px",
            color: "#0f172a",
          }}
        >
          Good morning, Doctor
        </h1>

        <p style={{ color: "#64748b" }}>
          Review referred patients and continue their healthcare journey.
        </p>

        {/* ================= STATS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <Stat
            title="Today's Patients"
            value="18"
          />

          <Stat
            title="Pending Referrals"
            value="6"
          />

          <Stat
            title="In Consultation"
            value="2"
          />

          <Stat
            title="Completed Today"
            value="10"
          />
        </div>

        {/* ================= QUICK ACTION ================= */}

        <div
          style={{
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "22px",
            marginTop: "30px",
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
              <h2
                style={{
                  marginTop: 0,
                  color: "#1e3a8a",
                }}
              >
                Next Patient
              </h2>

              <p
                style={{
                  marginBottom: 0,
                  color: "#475569",
                }}
              >
                Ramesh · HL-PAT-001 · 42 years
              </p>
            </div>

            <Link
              to="/doctor/patient/HL-PAT-001"
              style={{
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Open Patient
              </button>
            </Link>
          </div>
        </div>

        {/* ================= REFERRALS ================= */}

        <section
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "30px",
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
              <h2
                style={{
                  margin: 0,
                  color: "#0f172a",
                }}
              >
                Referred Patients
              </h2>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                }}
              >
                Patients referred from PHCs and awaiting hospital care.
              </p>
            </div>
          </div>

          {/* Table */}

          <div
            style={{
              overflowX: "auto",
              marginTop: "20px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th className="cell">Patient</th>
                  <th className="cell">Referral ID</th>
                  <th className="cell">Department</th>
                  <th className="cell">Reason</th>
                  <th className="cell">Priority</th>
                  <th className="cell">Status</th>
                  <th className="cell">Action</th>
                </tr>
              </thead>

              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="cell">
                      <strong>{referral.patient}</strong>

                      <div
                        style={{
                          color: "#64748b",
                          fontSize: "11px",
                          marginTop: "3px",
                        }}
                      >
                        {referral.patientId} · {referral.age} years
                      </div>
                    </td>

                    <td className="cell">
                      {referral.id}
                    </td>

                    <td className="cell">
                      {referral.department}
                    </td>

                    <td className="cell">
                      {referral.reason}
                    </td>

                    <td className="cell">
                      <Priority priority={referral.priority} />
                    </td>

                    <td className="cell">
                      <Status status={referral.status} />
                    </td>

                    <td className="cell">
                      {referral.patientId === "HL-PAT-001" ? (
                        <Link
                          to="/doctor/patient/HL-PAT-001"
                          style={{
                            textDecoration: "none",
                            color: "#2563eb",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          View →
                        </Link>
                      ) : (
                        <button
                          onClick={() =>
                            alert(
                              "This patient is available in the demo queue."
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            color: "#2563eb",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          View →
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= CLINICAL WORKFLOW ================= */}

        <section
          style={{
            marginTop: "30px",
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#0f172a",
            }}
          >
            Clinical Workflow
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "25px",
              textAlign: "center",
            }}
          >
            <WorkflowStep
              number="1"
              title="Referral"
              text="PHC referral received"
            />

            <Arrow />

            <WorkflowStep
              number="2"
              title="Verify"
              text="Patient authorization"
            />

            <Arrow />

            <WorkflowStep
              number="3"
              title="Consult"
              text="Doctor consultation"
            />

            <Arrow />

            <WorkflowStep
              number="4"
              title="Prescription"
              text="Treatment recorded"
            />

            <Arrow />

            <WorkflowStep
              number="5"
              title="Health Locker"
              text="Patient receives record"
            />
          </div>
        </section>

        {/* ================= SECURITY ================= */}

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
            Privacy-first clinical access
          </strong>

          <p
            style={{
              color: "#475569",
              fontSize: "13px",
              lineHeight: "1.5",
              marginBottom: 0,
            }}
          >
            Doctors should access only the patient information required
            for care, subject to authorization and applicable healthcare
            data-protection requirements.
          </p>
        </div>
      </main>

      <style>
        {`
          .cell {
            text-align: left;
            padding: 14px 10px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 12px;
            color: #334155;
            vertical-align: middle;
          }
        `}
      </style>
    </div>
  );
}


/* ================= STAT COMPONENT ================= */

function Stat({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <p
        style={{
          color: "#64748b",
          fontSize: "13px",
          marginTop: 0,
        }}
      >
        {title}
      </p>

      <strong
        style={{
          fontSize: "28px",
          color: "#2563eb",
        }}
      >
        {value}
      </strong>
    </div>
  );
}


/* ================= PRIORITY COMPONENT ================= */

function Priority({ priority }) {
  const isHigh = priority === "High";

  return (
    <span
      style={{
        backgroundColor: isHigh ? "#fee2e2" : "#f1f5f9",
        color: isHigh ? "#b91c1c" : "#475569",
        padding: "5px 9px",
        borderRadius: "15px",
        fontSize: "11px",
      }}
    >
      {priority}
    </span>
  );
}


/* ================= STATUS COMPONENT ================= */

function Status({ status }) {
  let background = "#fef3c7";
  let color = "#92400e";

  if (status === "In Consultation") {
    background = "#dbeafe";
    color = "#1d4ed8";
  }

  if (status === "Completed") {
    background = "#dcfce7";
    color = "#166534";
  }

  return (
    <span
      style={{
        backgroundColor: background,
        color: color,
        padding: "5px 9px",
        borderRadius: "15px",
        fontSize: "11px",
      }}
    >
      {status}
    </span>
  );
}


/* ================= WORKFLOW COMPONENT ================= */

function WorkflowStep({ number, title, text }) {
  return (
    <div style={{ width: "150px" }}>
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          backgroundColor: "#dbeafe",
          color: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 10px",
          fontWeight: "700",
        }}
      >
        {number}
      </div>

      <strong
        style={{
          display: "block",
          color: "#0f172a",
          fontSize: "13px",
        }}
      >
        {title}
      </strong>

      <span
        style={{
          display: "block",
          color: "#64748b",
          fontSize: "11px",
          marginTop: "5px",
        }}
      >
        {text}
      </span>
    </div>
  );
}


/* ================= ARROW ================= */

function Arrow() {
  return (
    <span
      style={{
        color: "#94a3b8",
        fontSize: "20px",
      }}
    >
      →
    </span>
  );
}


export default DoctorDashboard;