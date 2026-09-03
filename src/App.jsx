import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= PATIENT PAGES =================

import PatientDashboard from "./pages/patient/PatientDashboard";
import HealthLocker from "./pages/patient/HealthLocker";
import MedicalHistory from "./pages/patient/MedicalHistory";
import PatientJourney from "./pages/patient/PatientJourney";
import Reminders from "./pages/patient/Reminders";

// ================= PHC PAGES =================

import PHCDashboard from "./pages/phc/PHCDashboard";
import PatientSearch from "./pages/phc/PatientSearch";
import CreateReferral from "./pages/phc/CreateReferral";
import QRReferral from "./pages/phc/QRReferral";

// ================= DOCTOR PAGES =================

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDetails from "./pages/doctor/PatientDetails";
import Consultation from "./pages/doctor/Consultation";
import Prescription from "./pages/doctor/Prescription";

// ================= HOSPITAL PAGES =================

import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import ReferralSearch from "./pages/hospital/ReferralSearch";
import PatientAccess from "./pages/hospital/PatientAccess";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PATIENT PORTAL
        ===================================================== */}

        <Route
          path="/patient"
          element={<PatientDashboard />}
        />

        <Route
          path="/patient/health-locker"
          element={<HealthLocker />}
        />

        <Route
          path="/patient/medical-history"
          element={<MedicalHistory />}
        />

        <Route
          path="/patient/journey"
          element={<PatientJourney />}
        />

        <Route
          path="/patient/reminders"
          element={<Reminders />}
        />


        {/* =====================================================
            PHC PORTAL
        ===================================================== */}

        <Route
          path="/phc"
          element={<PHCDashboard />}
        />

        <Route
          path="/phc/patients"
          element={<PatientSearch />}
        />

        <Route
          path="/phc/create-referral"
          element={<CreateReferral />}
        />

        <Route
          path="/phc/qr-referral"
          element={<QRReferral />}
        />


        {/* =====================================================
            DOCTOR PORTAL
        ===================================================== */}

        <Route
          path="/doctor"
          element={<DoctorDashboard />}
        />

        <Route
          path="/doctor/patient/:id"
          element={<PatientDetails />}
        />

        <Route
          path="/doctor/consultation"
          element={<Consultation />}
        />

        <Route
          path="/doctor/prescription"
          element={<Prescription />}
        />


        {/* =====================================================
            HOSPITAL PORTAL
        ===================================================== */}

        <Route
          path="/hospital"
          element={<HospitalDashboard />}
        />

        <Route
          path="/hospital/referrals"
          element={<ReferralSearch />}
        />

        <Route
          path="/hospital/patient-access"
          element={<PatientAccess />}
        />


        {/* =====================================================
            HOME PAGE
        ===================================================== */}

        <Route
          path="/"
          element={
            <div
              style={{
                minHeight: "100vh",
                padding: "40px",
                backgroundColor: "#f8fafc",
                fontFamily: "Arial, sans-serif",
                boxSizing: "border-box",
              }}
            >
              <h1
                style={{
                  color: "#2563eb",
                  marginBottom: "5px",
                }}
              >
                HospitalLocker AI
              </h1>

              <p
                style={{
                  color: "#64748b",
                  marginTop: 0,
                }}
              >
                Digital Healthcare Continuity Platform
              </p>

              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #e5e7eb",
                  margin: "25px 0",
                }}
              />

              <h2>Select Portal</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 250px)",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >

                {/* Patient Portal */}

                <a
                  href="/patient"
                  style={{
                    padding: "20px",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                  }}
                >
                  Patient Portal
                </a>


                {/* PHC Portal */}

                <a
                  href="/phc"
                  style={{
                    padding: "20px",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                  }}
                >
                  PHC Portal
                </a>


                {/* Doctor Portal */}

                <a
                  href="/doctor"
                  style={{
                    padding: "20px",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                  }}
                >
                  Doctor Portal
                </a>


                {/* Hospital Portal */}

                <a
                  href="/hospital"
                  style={{
                    padding: "20px",
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                  }}
                >
                  Hospital Portal
                </a>

              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;