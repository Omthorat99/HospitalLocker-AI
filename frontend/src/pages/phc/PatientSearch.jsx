import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function PatientSearch() {
  const [search, setSearch] = useState("");

  const patients = [
    {
      id: "HL-PAT-001",
      name: "Ramesh",
      age: 42,
      gender: "Male",
      phone: "98XXXXXX42",
      lastVisit: "24 Aug 2026",
      status: "Active",
    },
    {
      id: "HL-PAT-002",
      name: "Patient 002",
      age: 35,
      gender: "Female",
      phone: "97XXXXXX21",
      lastVisit: "22 Aug 2026",
      status: "Active",
    },
    {
      id: "HL-PAT-003",
      name: "Patient 003",
      age: 51,
      gender: "Male",
      phone: "96XXXXXX15",
      lastVisit: "20 Aug 2026",
      status: "Active",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const query = search.toLowerCase();

    return (
      patient.name.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query) ||
      patient.phone.toLowerCase().includes(query)
    );
  });

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
          padding: "35px",
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        <p style={{ color: "#64748b", marginBottom: "5px" }}>
          Provider Portal / Patient Search
        </p>

        <h1 style={{ margin: 0, color: "#0f172a" }}>
          Search Patient
        </h1>

        <p style={{ color: "#64748b" }}>
          Search for a registered patient using their name or Patient ID.
        </p>

        {/* Search box */}

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "25px",
            marginTop: "30px",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#334155",
            }}
          >
            Patient Name / Patient ID
          </label>

          <input
            type="text"
            placeholder="Search by name or Patient ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "13px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          <p
            style={{
              color: "#94a3b8",
              fontSize: "12px",
              marginBottom: 0,
            }}
          >
            Try searching for <strong>Ramesh</strong> or{" "}
            <strong>HL-PAT-001</strong>.
          </p>
        </div>

        {/* Results */}

        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Patient Records</h2>

            <span
              style={{
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              {filteredPatients.length} patient(s) found
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: "0 0 7px",
                        color: "#0f172a",
                      }}
                    >
                      {patient.name}
                    </h3>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#64748b",
                        fontSize: "13px",
                      }}
                    >
                      Patient ID: {patient.id}
                    </p>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#64748b",
                        fontSize: "13px",
                      }}
                    >
                      {patient.age} years • {patient.gender}
                    </p>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#64748b",
                        fontSize: "13px",
                      }}
                    >
                      Last Visit: {patient.lastVisit}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        fontSize: "11px",
                      }}
                    >
                      {patient.status}
                    </span>

                    <Link
                      to="/phc/create-referral"
                      state={{ patient }}
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "9px 14px",
                        borderRadius: "7px",
                        textDecoration: "none",
                        fontSize: "13px",
                      }}
                    >
                      Create Referral
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <h3>No patient found</h3>

                <p style={{ color: "#64748b" }}>
                  Try searching with another name or Patient ID.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Privacy notice */}

        <div
          style={{
            marginTop: "30px",
            padding: "18px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "10px",
          }}
        >
          <strong>Authorized access only</strong>

          <p
            style={{
              marginBottom: 0,
              color: "#475569",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            Patient information should only be accessed by authorized
            healthcare personnel for legitimate care purposes.
          </p>
        </div>
      </main>
    </div>
  );
}

export default PatientSearch;