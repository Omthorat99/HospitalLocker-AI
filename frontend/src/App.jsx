import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  HeartPulse,
  UserRound,
  Building2,
  Stethoscope,
  Hospital,
  ShieldCheck,
  ArrowRight,
  QrCode,
  FileText,
  Activity,
  ChevronRight,
} from "lucide-react";

// Patient
import PatientDashboard from "./pages/patient/PatientDashboard";
import HealthLocker from "./pages/patient/HealthLocker";
import MedicalHistory from "./pages/patient/MedicalHistory";
import PatientJourney from "./pages/patient/PatientJourney";
import Reminders from "./pages/patient/Reminders";

// PHC
import PHCDashboard from "./pages/phc/PHCDashboard";
import PatientSearch from "./pages/phc/PatientSearch";
import CreateReferral from "./pages/phc/CreateReferral";
import QRReferral from "./pages/phc/QRReferral";

// Doctor
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDetails from "./pages/doctor/PatientDetails";
import Consultation from "./pages/doctor/Consultation";
import Prescription from "./pages/doctor/Prescription";

// Hospital
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import ReferralSearch from "./pages/hospital/ReferralSearch";
import PatientAccess from "./pages/hospital/PatientAccess";

//login
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function Home() {
  const portals = [
    {
      title: "Patient Portal",
      description:
        "Access your health records, prescriptions and healthcare journey.",
      icon: UserRound,
      path: "/patient",
      tag: "For Patients",
    },
    {
      title: "PHC Portal",
      description:
        "Create digital referrals and connect patients with hospitals.",
      icon: Building2,
      path: "/phc",
      tag: "Primary Care",
    },
    {
      title: "Doctor Portal",
      description:
        "Review authorized patient information and manage consultations.",
      icon: Stethoscope,
      path: "/doctor",
      tag: "For Doctors",
    },
    {
      title: "Hospital Portal",
      description:
        "Receive referrals, verify patients and coordinate hospital care.",
      icon: Hospital,
      path: "/hospital",
      tag: "Hospital Staff",
    },
  ];

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="logo-box">
            <HeartPulse size={25} />
          </div>

          <div>
            <div className="logo-title">HospitalLocker AI</div>
            <div className="logo-subtitle">
              Digital Healthcare Continuity Platform
            </div>
          </div>
        </div>

        <div className="nav-security">
          <ShieldCheck size={17} />
          <span>Privacy-first healthcare</span>
        </div>
      </nav>


      {/* HERO */}
      <section className="hero">

        <div className="hero-left">

          <div className="hero-badge">
            <Activity size={16} />
            <span>Connected Healthcare Journey</span>
          </div>

          <h1>
            Your healthcare journey,
            <span> connected.</span>
          </h1>

          <p className="hero-text">
            HospitalLocker AI connects PHCs, hospitals, doctors and patients
            through a simple digital healthcare continuity platform.
          </p>

          <div className="hero-buttons">
            <a href="#portals" className="primary-button">
              Get Started
              <ArrowRight size={18} />
            </a>

            <a href="#workflow" className="secondary-button">
              See How It Works
            </a>
          </div>

          <div className="hero-trust">
            <div>
              <ShieldCheck size={19} />
              <span>Secure access</span>
            </div>

            <div>
              <QrCode size={19} />
              <span>QR referrals</span>
            </div>

            <div>
              <FileText size={19} />
              <span>Digital records</span>
            </div>
          </div>

        </div>


        {/* HERO VISUAL */}
        <div className="hero-right">

          <div className="hero-circle circle-one"></div>
          <div className="hero-circle circle-two"></div>

          <div className="health-card">

            <div className="health-card-header">
              <div className="mini-logo">
                <HeartPulse size={20} />
              </div>

              <div>
                <strong>HospitalLocker AI</strong>
                <span>Healthcare Continuity</span>
              </div>
            </div>

            <div className="journey-title">
              Patient Journey
            </div>

            <div className="journey-item completed">
              <div className="journey-icon">
                <Building2 size={17} />
              </div>

              <div>
                <strong>PHC Visit</strong>
                <span>Primary Health Centre</span>
              </div>

              <div className="check">✓</div>
            </div>

            <div className="journey-line"></div>

            <div className="journey-item completed">
              <div className="journey-icon">
                <QrCode size={17} />
              </div>

              <div>
                <strong>Digital Referral</strong>
                <span>Referral securely created</span>
              </div>

              <div className="check">✓</div>
            </div>

            <div className="journey-line"></div>

            <div className="journey-item active">
              <div className="journey-icon">
                <Hospital size={17} />
              </div>

              <div>
                <strong>Hospital Care</strong>
                <span>Authorized patient access</span>
              </div>

              <ChevronRight size={18} />
            </div>

            <div className="health-status">
              <ShieldCheck size={18} />
              <span>Patient-controlled access</span>
            </div>

          </div>

        </div>

      </section>


      {/* PORTALS */}
      <section className="portal-section" id="portals">

        <div className="section-heading">
          <div>
            <span className="section-label">ACCESS PLATFORM</span>

            <h2>Select your portal</h2>

            <p>
              Choose the portal according to your role in the healthcare
              journey.
            </p>
          </div>
        </div>


        <div className="portal-grid">

          {portals.map((portal) => {
            const Icon = portal.icon;

            return (
              <Link
                to={`/login?role=${portal.path.replace("/", "")}`}
                className="portal-card"
                key={portal.title}
              >

                <div className="portal-card-top">
                  <div className="portal-icon">
                    <Icon size={25} />
                  </div>

                  <span className="portal-tag">
                    {portal.tag}
                  </span>
                </div>

                <h3>{portal.title}</h3>

                <p>{portal.description}</p>

                <div className="portal-link">
                  Open Portal
                  <ArrowRight size={17} />
                </div>

              </Link>
            );
          })}

        </div>

      </section>


      {/* WORKFLOW */}
      <section className="workflow-section" id="workflow">

        <div className="workflow-heading">
          <span className="section-label">HOW IT WORKS</span>

          <h2>One connected healthcare journey</h2>

          <p>
            From the first PHC visit to hospital treatment and follow-up,
            HospitalLocker AI keeps the journey connected.
          </p>
        </div>


        <div className="workflow">

          <div className="workflow-step">
            <div className="workflow-number">01</div>

            <Building2 size={24} />

            <h3>PHC</h3>

            <p>
              Patient is assessed and a digital referral is created.
            </p>
          </div>


          <div className="workflow-arrow">
            <ArrowRight />
          </div>


          <div className="workflow-step">
            <div className="workflow-number">02</div>

            <QrCode size={24} />

            <h3>Referral</h3>

            <p>
              A secure referral ID and QR code connect the patient to the
              hospital.
            </p>
          </div>


          <div className="workflow-arrow">
            <ArrowRight />
          </div>


          <div className="workflow-step">
            <div className="workflow-number">03</div>

            <Hospital size={24} />

            <h3>Hospital</h3>

            <p>
              Hospital staff verify the referral and request authorized
              access.
            </p>
          </div>


          <div className="workflow-arrow">
            <ArrowRight />
          </div>


          <div className="workflow-step">
            <div className="workflow-number">04</div>

            <Stethoscope size={24} />

            <h3>Doctor</h3>

            <p>
              Doctor reviews authorized information and records consultation.
            </p>
          </div>


          <div className="workflow-arrow">
            <ArrowRight />
          </div>


          <div className="workflow-step">
            <div className="workflow-number">05</div>

            <HeartPulse size={24} />

            <h3>Health Locker</h3>

            <p>
              Prescription and follow-up information becomes available to the
              patient.
            </p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-brand">
          <div className="footer-logo">
            <HeartPulse size={21} />
          </div>

          <div>
            <strong>HospitalLocker AI</strong>
            <span>Digital Healthcare Continuity Platform</span>
          </div>
        </div>

        <div className="footer-security">
          <ShieldCheck size={18} />
          <span>
            Built with privacy, authorization and healthcare continuity in mind.
          </span>
        </div>

      </footer>


      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          background: #f5f9fc;
          color: #16324f;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .home-page {
          min-height: 100vh;
          overflow-x: hidden;
        }


        /* NAVBAR */

        .navbar {
          height: 78px;
          padding: 0 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          background: rgba(255, 255, 255, 0.92);
          border-bottom: 1px solid #e3edf4;

          position: sticky;
          top: 0;
          z-index: 20;

          backdrop-filter: blur(12px);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-box {
          width: 43px;
          height: 43px;
          border-radius: 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #0f4c81;
          color: white;

          box-shadow: 0 7px 20px rgba(15, 76, 129, 0.22);
        }

        .logo-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f4c81;
        }

        .logo-subtitle {
          margin-top: 2px;
          font-size: 11px;
          color: #64748b;
        }

        .nav-security {
          display: flex;
          align-items: center;
          gap: 7px;

          font-size: 13px;
          color: #0f766e;
          font-weight: 600;
        }


        /* HERO */

        .hero {
          max-width: 1250px;
          margin: auto;
          min-height: 610px;

          padding: 85px 6% 75px;

          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 70px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          padding: 8px 13px;
          border-radius: 30px;

          background: #e8f7f5;
          color: #0f766e;

          font-size: 13px;
          font-weight: 700;

          animation: fadeUp 0.7s ease;
        }

        .hero h1 {
          margin: 22px 0 18px;

          max-width: 650px;

          font-size: clamp(42px, 5vw, 65px);
          line-height: 1.05;
          letter-spacing: -2px;

          color: #123b5d;

          animation: fadeUp 0.8s ease;
        }

        .hero h1 span {
          color: #0f766e;
        }

        .hero-text {
          max-width: 590px;

          font-size: 17px;
          line-height: 1.7;

          color: #64748b;

          animation: fadeUp 0.9s ease;
        }

        .hero-buttons {
          display: flex;
          gap: 13px;
          margin-top: 30px;

          animation: fadeUp 1s ease;
        }

        .primary-button,
        .secondary-button {
          min-height: 48px;
          padding: 0 20px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          border-radius: 10px;

          font-size: 14px;
          font-weight: 700;

          transition: 0.25s ease;
        }

        .primary-button {
          background: #0f4c81;
          color: white;
          box-shadow: 0 8px 20px rgba(15, 76, 129, 0.2);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          background: #0b3c67;
        }

        .secondary-button {
          background: white;
          border: 1px solid #d9e5ed;
          color: #0f4c81;
        }

        .secondary-button:hover {
          transform: translateY(-2px);
          border-color: #0f766e;
        }

        .hero-trust {
          display: flex;
          gap: 25px;
          margin-top: 28px;

          color: #64748b;
          font-size: 12px;
        }

        .hero-trust div {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .hero-trust svg {
          color: #0f766e;
        }


        /* HERO CARD */

        .hero-right {
          position: relative;
          min-height: 470px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .circle-one {
          width: 390px;
          height: 390px;
          background: #e8f7f5;
        }

        .circle-two {
          width: 270px;
          height: 270px;
          background: #eaf4fb;
        }

        .health-card {
          position: relative;
          z-index: 2;

          width: min(390px, 100%);

          padding: 25px;

          background: rgba(255,255,255,0.96);

          border: 1px solid #e1ebf2;
          border-radius: 20px;

          box-shadow:
            0 25px 60px rgba(25, 65, 90, 0.13);

          animation: floating 4s ease-in-out infinite;
        }

        .health-card-header {
          display: flex;
          align-items: center;
          gap: 11px;

          padding-bottom: 20px;
          border-bottom: 1px solid #edf2f6;
        }

        .mini-logo {
          width: 40px;
          height: 40px;

          border-radius: 11px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #eaf4fb;
          color: #0f4c81;
        }

        .health-card-header strong {
          display: block;
          font-size: 14px;
          color: #123b5d;
        }

        .health-card-header span {
          display: block;
          margin-top: 3px;
          font-size: 11px;
          color: #64748b;
        }

        .journey-title {
          margin: 22px 0 15px;

          font-size: 14px;
          font-weight: 800;
          color: #16324f;
        }

        .journey-item {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .journey-icon {
          min-width: 38px;
          height: 38px;

          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f0f7fb;
          color: #0f4c81;
        }

        .journey-item div:nth-child(2) {
          flex: 1;
        }

        .journey-item strong {
          display: block;
          font-size: 12px;
          color: #16324f;
        }

        .journey-item span {
          display: block;
          margin-top: 3px;
          font-size: 10px;
          color: #7b8b9a;
        }

        .check {
          width: 22px;
          height: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #e8f7ef;
          color: #15803d;

          font-size: 12px;
          font-weight: 800;
        }

        .journey-line {
          height: 22px;
          width: 1px;

          margin-left: 19px;

          border-left: 1px dashed #b9cbd8;
        }

        .health-status {
          display: flex;
          align-items: center;
          gap: 8px;

          margin-top: 23px;
          padding: 11px 12px;

          border-radius: 9px;

          background: #f0faf8;

          color: #0f766e;
          font-size: 11px;
          font-weight: 700;
        }


        /* PORTALS */

        .portal-section {
          background: white;
          padding: 80px 6%;
          border-top: 1px solid #e6eef3;
          border-bottom: 1px solid #e6eef3;
        }

        .portal-section,
        .workflow-section {
          scroll-margin-top: 80px;
        }

        .section-heading,
        .workflow-heading {
          max-width: 1200px;
          margin: auto;
        }

        .section-label {
          color: #0f766e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .section-heading h2,
        .workflow-heading h2 {
          margin: 8px 0 8px;

          color: #123b5d;
          font-size: 32px;
          letter-spacing: -0.8px;
        }

        .section-heading p,
        .workflow-heading p {
          margin: 0;
          color: #718096;
          font-size: 14px;
        }

        .portal-grid {
          max-width: 1200px;
          margin: 35px auto 0;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .portal-card {
          position: relative;

          min-height: 260px;
          padding: 23px;

          border: 1px solid #e0eaf0;
          border-radius: 16px;

          background: #ffffff;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;

          overflow: hidden;
        }

        .portal-card::after {
          content: "";
          position: absolute;

          width: 100px;
          height: 100px;

          right: -45px;
          bottom: -45px;

          border-radius: 50%;

          background: #eef8f7;

          transition: 0.3s ease;
        }

        .portal-card:hover {
          transform: translateY(-7px);
          border-color: #b9d8e8;

          box-shadow:
            0 18px 35px rgba(26, 67, 91, 0.11);
        }

        .portal-card:hover::after {
          transform: scale(1.7);
        }

        .portal-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .portal-icon {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          background: #eaf4fb;
          color: #0f4c81;
        }

        .portal-tag {
          padding: 5px 8px;

          border-radius: 20px;

          background: #f1f7fa;

          color: #718096;

          font-size: 9px;
          font-weight: 700;
        }

        .portal-card h3 {
          margin: 25px 0 9px;

          color: #123b5d;
          font-size: 18px;
        }

        .portal-card p {
          position: relative;
          z-index: 2;

          min-height: 62px;

          margin: 0;

          color: #718096;
          font-size: 12px;
          line-height: 1.6;
        }

        .portal-link {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: center;
          gap: 7px;

          margin-top: 20px;

          color: #0f4c81;
          font-size: 12px;
          font-weight: 800;
        }

        .portal-card:hover .portal-link svg {
          transform: translateX(4px);
        }

        .portal-link svg {
          transition: 0.2s ease;
        }


        /* WORKFLOW */

        .workflow-section {
          padding: 85px 6%;
          background: #f5f9fc;
        }

        .workflow-heading {
          text-align: center;
        }

        .workflow-heading p {
          max-width: 650px;
          margin: auto;
          line-height: 1.6;
        }

        .workflow {
          max-width: 1250px;
          margin: 50px auto 0;

          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 10px;
        }

        .workflow-step {
          flex: 1;

          min-width: 130px;

          padding: 20px 15px;

          text-align: center;

          background: white;

          border: 1px solid #e1ebf2;
          border-radius: 14px;

          transition: 0.25s ease;
        }

        .workflow-step:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(26, 67, 91, 0.08);
        }

        .workflow-step svg {
          color: #0f4c81;
        }

        .workflow-number {
          margin-bottom: 14px;

          color: #0f766e;

          font-size: 10px;
          font-weight: 900;
        }

        .workflow-step h3 {
          margin: 10px 0 7px;

          color: #16324f;
          font-size: 14px;
        }

        .workflow-step p {
          margin: 0;

          color: #7b8b9a;

          font-size: 10px;
          line-height: 1.5;
        }

        .workflow-arrow {
          display: flex;
          align-items: center;

          color: #a6bbc9;
        }


        /* FOOTER */

        .footer {
          min-height: 80px;

          padding: 20px 6%;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          background: #123b5d;
          color: white;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: rgba(255,255,255,0.12);
        }

        .footer-brand strong {
          display: block;
          font-size: 13px;
        }

        .footer-brand span {
          display: block;
          margin-top: 2px;

          color: #b7cad8;

          font-size: 10px;
        }

        .footer-security {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #c5d5df;

          font-size: 10px;
        }


        /* ANIMATIONS */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }


        /* RESPONSIVE */

        @media (max-width: 1050px) {

          .hero {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-left {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-right {
            min-height: 430px;
          }

          .portal-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .workflow {
            flex-wrap: wrap;
          }

          .workflow-step {
            flex-basis: 28%;
          }

          .workflow-arrow {
            display: none;
          }
        }


        @media (max-width: 650px) {

          .navbar {
            padding: 0 20px;
          }

          .nav-security {
            display: none;
          }

          .hero {
            padding: 60px 20px;
            gap: 35px;
          }

          .hero h1 {
            font-size: 42px;
          }

          .hero-buttons {
            width: 100%;
            flex-direction: column;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .hero-trust {
            flex-wrap: wrap;
            justify-content: center;
            gap: 14px;
          }

          .hero-right {
            min-height: 390px;
          }

          .health-card {
            width: 100%;
          }

          .portal-section,
          .workflow-section {
            padding: 60px 20px;
          }

          .portal-grid {
            grid-template-columns: 1fr;
          }

          .workflow-step {
            flex-basis: 100%;
          }

          .footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

      `}</style>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
     <Routes>

  {/* HOME */}
  <Route path="/" element={<Home />} />

  {/* AUTHENTICATION */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

        {/* PATIENT */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/health-locker" element={<HealthLocker />} />
        <Route path="/patient/medical-history" element={<MedicalHistory />} />
        <Route path="/patient/journey" element={<PatientJourney />} />
        <Route path="/patient/reminders" element={<Reminders />} />

        {/* PHC */}
        <Route path="/phc" element={<PHCDashboard />} />
        <Route path="/phc/patients" element={<PatientSearch />} />
        <Route path="/phc/create-referral" element={<CreateReferral />} />
        <Route path="/phc/qr-referral" element={<QRReferral />} />

        {/* DOCTOR */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/patient/:id" element={<PatientDetails />} />
        <Route path="/doctor/consultation" element={<Consultation />} />
        <Route path="/doctor/prescription" element={<Prescription />} />

        {/* HOSPITAL */}
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/hospital/referrals" element={<ReferralSearch />} />
        <Route path="/hospital/patient-access" element={<PatientAccess />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;