import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  HeartPulse,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
} from "lucide-react";

export default function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const storedReferral = localStorage.getItem(
    "hospitalLockerReferral"
  );

  let referral = location.state?.referral;

  if (!referral && storedReferral) {
    try {
      referral = JSON.parse(storedReferral);
    } catch {
      referral = null;
    }
  }

  const patientFromState = location.state?.patient;

  const patient = {
    patientId: patientFromState?.patientId || referral?.patientId || id,
    name: patientFromState?.name || referral?.patientName || "Ramesh",
    age: patientFromState?.age || referral?.age || 42,
    gender: patientFromState?.gender || referral?.gender || "Male",
    phone: patientFromState?.phone || referral?.phone || "Not available",
  };

  const currentReferral = referral || {
    referralId: "HL-REF-2026-00124",
    source: "Primary Health Centre",
    hospital: "Sassoon General Hospital",
    department: "General Medicine",
    reason: "Further evaluation and specialist consultation",
    priority: "Normal",
    status: "Verified",
  };

  const handleStartConsultation = () => {
    navigate("/doctor/consultation", {
      state: {
        patient,
        referral: currentReferral,
      },
    });
  };

  return (
    <div className="doctor-patient-page">

      {/* ================= TOP BAR ================= */}

      <header className="doctor-patient-topbar">

        <div className="doctor-patient-brand">

          <div className="doctor-patient-brand-icon">
            <ShieldCheck size={22} />
          </div>

          <div>
            <strong>
              HospitalLocker <span>AI</span>
            </strong>

            <small>
              Digital Healthcare Continuity
            </small>
          </div>

        </div>


        <div className="doctor-profile">

          <div className="doctor-profile-icon">
            <Stethoscope size={17} />
          </div>

          <div>
            <strong>
              Dr. Medical Officer
            </strong>

            <span>
              General Medicine
            </span>
          </div>

        </div>

      </header>


      <div className="doctor-patient-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="doctor-patient-sidebar">

          <div className="doctor-sidebar-title">
            DOCTOR PORTAL
          </div>


          <button
            className="doctor-sidebar-nav"
            onClick={() => navigate("/doctor")}
          >
            <Activity size={18} />
            Dashboard
          </button>


          <button className="doctor-sidebar-nav active">
            <UserRound size={18} />
            Patient Details
          </button>


          <button
            className="doctor-sidebar-nav"
            onClick={() =>
              navigate("/doctor/consultation", {
                state: {
                  patient,
                  referral: currentReferral,
                },
              })
            }
          >
            <MessageSquareText size={18} />
            Consultation
          </button>


          <button
            className="doctor-sidebar-nav"
            onClick={() =>
              navigate("/doctor/prescription", {
                state: {
                  patient,
                  referral: currentReferral,
                },
              })
            }
          >
            <ClipboardList size={18} />
            Prescription
          </button>


          <div className="doctor-sidebar-security">

            <LockKeyhole size={18} />

            <strong>
              Clinical access
            </strong>

            <p>
              Patient information is displayed only
              within the authorized referral workflow.
            </p>

          </div>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="doctor-patient-main">

          <button
            className="doctor-back-button"
            onClick={() => navigate("/doctor")}
          >
            <ArrowLeft size={16} />
            Back to Doctor Dashboard
          </button>


          {/* ================= HEADER ================= */}

          <div className="doctor-patient-header">

            <div>

              <div className="doctor-eyebrow">
                CLINICAL WORKSPACE
              </div>

              <h1>
                Patient Details
              </h1>

              <p>
                Review the authorized referral information
                before starting the consultation.
              </p>

            </div>


            <div className="doctor-secure-badge">
              <ShieldCheck size={15} />
              Authorized Patient
            </div>

          </div>


          {/* ================= PATIENT HERO ================= */}

          <section className="patient-hero-card">

            <div className="patient-hero-left">

              <div className="patient-large-avatar">
                <UserRound size={31} />
              </div>


              <div>

                <span className="patient-label">
                  PATIENT
                </span>

                <h2>
                  {patient.name}
                </h2>

                <p>
                  Patient ID: {patient.patientId}
                </p>

              </div>

            </div>


            <div className="patient-hero-status">

              <div className="verified-circle">
                <CheckCircle2 size={16} />
              </div>

              <div>

                <strong>
                  Referral Verified
                </strong>

                <span>
                  {currentReferral.referralId}
                </span>

              </div>

            </div>

          </section>


          {/* ================= BASIC INFO ================= */}

          <div className="doctor-info-grid">

            <InfoCard
              icon={<CalendarDays size={19} />}
              label="Age"
              value={`${patient.age} years`}
            />

            <InfoCard
              icon={<UserRound size={19} />}
              label="Gender"
              value={patient.gender}
            />

            <InfoCard
              icon={<Activity size={19} />}
              label="Department"
              value={currentReferral.department}
            />

            <InfoCard
              icon={<Clock3 size={19} />}
              label="Priority"
              value={currentReferral.priority}
            />

          </div>


          {/* ================= TWO COLUMNS ================= */}

          <div className="doctor-content-grid">


            {/* ================= LEFT ================= */}

            <section className="doctor-content-card">

              <div className="doctor-card-header">

                <div>

                  <span className="doctor-card-label">
                    REFERRAL
                  </span>

                  <h2>
                    Referral Information
                  </h2>

                </div>

                <FileText size={20} />

              </div>


              <div className="referral-detail-list">

                <div className="referral-detail-row">

                  <span>
                    Referral ID
                  </span>

                  <strong>
                    {currentReferral.referralId}
                  </strong>

                </div>


                <div className="referral-detail-row">

                  <span>
                    Referred From
                  </span>

                  <strong>
                    {currentReferral.source}
                  </strong>

                </div>


                <div className="referral-detail-row">

                  <span>
                    Receiving Facility
                  </span>

                  <strong>
                    {currentReferral.hospital}
                  </strong>

                </div>


                <div className="referral-detail-row">

                  <span>
                    Department
                  </span>

                  <strong>
                    {currentReferral.department}
                  </strong>

                </div>


                <div className="referral-detail-row">

                  <span>
                    Priority
                  </span>

                  <strong className={
                    currentReferral.priority?.toLowerCase()
                  }>
                    {currentReferral.priority}
                  </strong>

                </div>


                <div className="referral-detail-row">

                  <span>
                    Status
                  </span>

                  <strong className="verified-text">
                    <CheckCircle2 size={13} />
                    {currentReferral.status}
                  </strong>

                </div>

              </div>


              <div className="reason-box">

                <span>
                  REASON FOR REFERRAL
                </span>

                <p>
                  {currentReferral.reason}
                </p>

              </div>

            </section>


            {/* ================= RIGHT ================= */}

            <section className="doctor-content-card">

              <div className="doctor-card-header">

                <div>

                  <span className="doctor-card-label">
                    HEALTH RECORDS
                  </span>

                  <h2>
                    Available Information
                  </h2>

                </div>

                <FileText size={20} />

              </div>


              <div className="record-list">

                <RecordItem
                  icon={<Activity size={18} />}
                  title="Laboratory Reports"
                  description="Previous diagnostic results"
                />

                <RecordItem
                  icon={<HeartPulse size={18} />}
                  title="Medical History"
                  description="Relevant previous healthcare history"
                />

                <RecordItem
                  icon={<ClipboardList size={18} />}
                  title="Previous Prescriptions"
                  description="Medication and treatment records"
                />

                <RecordItem
                  icon={<FileText size={18} />}
                  title="Referral History"
                  description="Previous referral information"
                />

              </div>


              <div className="record-security">

                <LockKeyhole size={15} />

                <span>
                  Only authorized records are available
                  for this consultation.
                </span>

              </div>

            </section>

          </div>


          {/* ================= AI SUMMARY ================= */}

          <section className="ai-summary-card">

            <div className="ai-summary-header">

              <div className="ai-summary-title">

                <div className="ai-icon">
                  <Sparkles size={20} />
                </div>

                <div>

                  <span>
                    AI-ASSISTED
                  </span>

                  <h2>
                    Patient Summary
                  </h2>

                </div>

              </div>


              <div className="ai-assisted-badge">
                Assistance Only
              </div>

            </div>


            <div className="ai-summary-body">

              <div className="ai-summary-main">

                <p>
                  This section provides a concise summary
                  of available patient and referral information
                  to help the doctor review the case faster.
                </p>


                <div className="ai-summary-points">

                  <div>
                    <CheckCircle2 size={14} />
                    <span>
                      Patient referred from a Primary Health Centre.
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={14} />
                    <span>
                      Current referral is for{" "}
                      {currentReferral.department}.
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={14} />
                    <span>
                      Referral priority:{" "}
                      {currentReferral.priority}.
                    </span>
                  </div>

                </div>

              </div>


              <div className="ai-warning">

                <AlertCircle size={17} />

                <div>

                  <strong>
                    Doctor remains in control
                  </strong>

                  <span>
                    AI assistance does not diagnose,
                    prescribe, or make clinical decisions.
                  </span>

                </div>

              </div>

            </div>

          </section>


          {/* ================= ACTION ================= */}

          <section className="start-consultation-card">

            <div className="start-consultation-icon">
              <Stethoscope size={23} />
            </div>


            <div>

              <span>
                NEXT CLINICAL STEP
              </span>

              <h2>
                Ready to start consultation?
              </h2>

              <p>
                Review the referral information and
                continue to record the patient's consultation.
              </p>

            </div>


            <button
              onClick={handleStartConsultation}
            >
              Start Consultation
              <ArrowRight size={18} />
            </button>

          </section>


          {/* ================= PRIVACY ================= */}

          <div className="doctor-privacy">

            <ShieldCheck size={18} />

            <div>

              <strong>
                Secure clinical workspace
              </strong>

              <p>
                Patient information is displayed within the
                authorized referral context. Every clinical
                action should be performed by authorized
                healthcare personnel.
              </p>

            </div>

          </div>

        </main>

      </div>


      <DoctorPatientStyles />

    </div>
  );
}


/* ================= INFO CARD ================= */

function InfoCard({ icon, label, value }) {
  return (
    <div className="doctor-info-card">

      <div className="doctor-info-icon">
        {icon}
      </div>

      <div>

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}


/* ================= RECORD ITEM ================= */

function RecordItem({
  icon,
  title,
  description,
}) {
  return (
    <div className="record-item">

      <div className="record-item-icon">
        {icon}
      </div>

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <CheckCircle2
        size={15}
        className="record-check"
      />

    </div>
  );
}


/* ================= STYLES ================= */

function DoctorPatientStyles() {
  return (
    <style>{`

      .doctor-patient-page {
        min-height: 100vh;
        background: #f5f9fc;
        color: #16324f;
        font-family: Inter, Arial, sans-serif;
      }

      .doctor-patient-topbar {
        height: 72px;
        background: white;
        border-bottom: 1px solid #e2e8f0;
        padding: 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 20;
      }

      .doctor-patient-brand {
        display: flex;
        align-items: center;
        gap: 11px;
      }

      .doctor-patient-brand-icon {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .doctor-patient-brand strong {
        display: block;
        font-size: 18px;
        font-weight: 800;
      }

      .doctor-patient-brand strong span {
        color: #0f766e;
      }

      .doctor-patient-brand small {
        display: block;
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .doctor-profile {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .doctor-profile-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #e8f7f5;
        color: #0f766e;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .doctor-profile strong,
      .doctor-profile span {
        display: block;
      }

      .doctor-profile strong {
        font-size: 12px;
      }

      .doctor-profile span {
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .doctor-patient-layout {
        display: flex;
        min-height: calc(100vh - 72px);
      }

      .doctor-patient-sidebar {
        width: 235px;
        background: white;
        border-right: 1px solid #e2e8f0;
        padding: 24px 15px;
        flex-shrink: 0;
      }

      .doctor-sidebar-title {
        color: #94a3b8;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
        margin-bottom: 12px;
      }

      .doctor-sidebar-nav {
        width: 100%;
        height: 43px;
        border: none;
        border-radius: 9px;
        background: transparent;
        color: #475569;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 0 12px;
        font-size: 12px;
        margin-bottom: 5px;
        text-align: left;
        transition: all .2s ease;
      }

      .doctor-sidebar-nav:hover {
        background: #f1f7fb;
        color: #0f4c81;
        transform: translateX(2px);
      }

      .doctor-sidebar-nav.active {
        background: #eaf4fb;
        color: #0f4c81;
        font-weight: 700;
      }

      .doctor-sidebar-security {
        margin-top: 30px;
        padding: 14px;
        border-radius: 11px;
        background: #f0f7fc;
        color: #0f766e;
      }

      .doctor-sidebar-security strong {
        display: block;
        color: #16324f;
        font-size: 11px;
        margin-top: 8px;
      }

      .doctor-sidebar-security p {
        color: #64748b;
        font-size: 10px;
        line-height: 1.5;
        margin: 5px 0 0;
      }

      .doctor-patient-main {
        flex: 1;
        max-width: 1200px;
        padding: 30px 36px 60px;
      }

      .doctor-back-button {
        border: none;
        background: transparent;
        color: #64748b;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        margin-bottom: 22px;
      }

      .doctor-back-button:hover {
        color: #0f4c81;
      }

      .doctor-patient-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 22px;
      }

      .doctor-eyebrow,
      .doctor-card-label {
        color: #0f766e;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .doctor-patient-header h1 {
        margin: 6px 0;
        font-size: 29px;
        letter-spacing: -.03em;
      }

      .doctor-patient-header p {
        margin: 0;
        color: #64748b;
        font-size: 13px;
      }

      .doctor-secure-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #15803d;
        background: #ecfdf3;
        border: 1px solid #d3f1dd;
        padding: 8px 11px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
      }

      .patient-hero-card {
        background: white;
        border: 1px solid #d9e6ed;
        border-radius: 15px;
        padding: 21px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 4px 15px rgba(15,76,129,.05);
      }

      .patient-hero-left {
        display: flex;
        align-items: center;
        gap: 13px;
      }

      .patient-large-avatar {
        width: 64px;
        height: 64px;
        border-radius: 15px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .patient-label {
        color: #94a3b8;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .patient-hero-left h2 {
        margin: 4px 0;
        font-size: 21px;
      }

      .patient-hero-left p {
        margin: 0;
        color: #64748b;
        font-size: 10px;
      }

      .patient-hero-status {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 10px 13px;
        background: #effaf7;
        border: 1px solid #d5eee8;
        border-radius: 10px;
      }

      .verified-circle {
        width: 31px;
        height: 31px;
        border-radius: 50%;
        background: #dcfce7;
        color: #15803d;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .patient-hero-status strong,
      .patient-hero-status span {
        display: block;
      }

      .patient-hero-status strong {
        font-size: 10px;
      }

      .patient-hero-status span {
        color: #64748b;
        font-size: 9px;
        margin-top: 3px;
      }

      .doctor-info-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 15px;
      }

      .doctor-info-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 11px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .doctor-info-icon {
        width: 36px;
        height: 36px;
        border-radius: 9px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .doctor-info-card span,
      .doctor-info-card strong {
        display: block;
      }

      .doctor-info-card span {
        color: #94a3b8;
        font-size: 9px;
        margin-bottom: 3px;
      }

      .doctor-info-card strong {
        font-size: 11px;
      }

      .doctor-content-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-top: 15px;
      }

      .doctor-content-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        padding: 19px;
        box-shadow: 0 3px 12px rgba(15,76,129,.04);
      }

      .doctor-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 13px;
        border-bottom: 1px solid #eef2f6;
        color: #0f4c81;
      }

      .doctor-card-header h2 {
        margin: 5px 0 0;
        color: #16324f;
        font-size: 16px;
      }

      .referral-detail-list {
        margin-top: 4px;
      }

      .referral-detail-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        padding: 10px 0;
        border-bottom: 1px solid #f0f3f6;
        font-size: 10px;
      }

      .referral-detail-row span {
        color: #64748b;
      }

      .referral-detail-row strong {
        text-align: right;
        font-size: 10px;
      }

      .referral-detail-row strong.normal {
        color: #2563eb;
      }

      .referral-detail-row strong.urgent {
        color: #c2410c;
      }

      .referral-detail-row strong.emergency {
        color: #dc2626;
      }

      .verified-text {
        color: #15803d;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .reason-box {
        margin-top: 13px;
        padding: 12px;
        border-radius: 9px;
        background: #f8fafc;
      }

      .reason-box span {
        color: #94a3b8;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .06em;
      }

      .reason-box p {
        color: #475569;
        font-size: 10px;
        line-height: 1.5;
        margin: 5px 0 0;
      }

      .record-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 14px;
      }

      .record-item {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 10px;
        border: 1px solid #edf2f6;
        border-radius: 9px;
        transition: all .2s ease;
      }

      .record-item:hover {
        border-color: #cbdfea;
        transform: translateX(2px);
      }

      .record-item-icon {
        width: 37px;
        height: 37px;
        border-radius: 9px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .record-item > div:nth-child(2) {
        flex: 1;
      }

      .record-item strong,
      .record-item span {
        display: block;
      }

      .record-item strong {
        font-size: 10px;
      }

      .record-item span {
        color: #64748b;
        font-size: 9px;
        margin-top: 3px;
      }

      .record-check {
        color: #15803d;
      }

      .record-security {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 12px;
        padding: 9px;
        background: #f0f7fc;
        border-radius: 8px;
        color: #64748b;
        font-size: 9px;
      }

      .record-security svg {
        color: #0f4c81;
        flex-shrink: 0;
      }

      .ai-summary-card {
        margin-top: 15px;
        background: linear-gradient(
          135deg,
          #f0f8fc,
          #f2fbf8
        );
        border: 1px solid #d7e9ec;
        border-radius: 14px;
        overflow: hidden;
      }

      .ai-summary-header {
        padding: 17px 19px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #dcecef;
      }

      .ai-summary-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .ai-icon {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: white;
        color: #0f766e;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(15,118,110,.08);
      }

      .ai-summary-title span {
        color: #0f766e;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .08em;
      }

      .ai-summary-title h2 {
        margin: 4px 0 0;
        font-size: 16px;
      }

      .ai-assisted-badge {
        background: white;
        border: 1px solid #d5e8e6;
        color: #0f766e;
        border-radius: 999px;
        padding: 7px 10px;
        font-size: 9px;
        font-weight: 700;
      }

      .ai-summary-body {
        padding: 16px 19px;
        display: flex;
        gap: 18px;
      }

      .ai-summary-main {
        flex: 1;
      }

      .ai-summary-main > p {
        color: #475569;
        font-size: 10px;
        line-height: 1.55;
        margin: 0;
      }

      .ai-summary-points {
        margin-top: 11px;
        display: flex;
        flex-direction: column;
        gap: 7px;
      }

      .ai-summary-points div {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #166534;
        font-size: 9px;
      }

      .ai-warning {
        width: 280px;
        flex-shrink: 0;
        padding: 12px;
        border-radius: 9px;
        background: white;
        border: 1px solid #dce8ec;
        display: flex;
        align-items: flex-start;
        gap: 8px;
      }

      .ai-warning svg {
        color: #d97706;
        flex-shrink: 0;
      }

      .ai-warning strong,
      .ai-warning span {
        display: block;
      }

      .ai-warning strong {
        font-size: 10px;
      }

      .ai-warning span {
        color: #64748b;
        font-size: 9px;
        line-height: 1.5;
        margin-top: 4px;
      }

      .start-consultation-card {
        margin-top: 15px;
        background: #0f4c81;
        color: white;
        border-radius: 14px;
        padding: 18px 20px;
        display: flex;
        align-items: center;
        gap: 13px;
        box-shadow: 0 8px 20px rgba(15,76,129,.16);
      }

      .start-consultation-icon {
        width: 47px;
        height: 47px;
        border-radius: 12px;
        background: rgba(255,255,255,.12);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .start-consultation-card > div:nth-child(2) {
        flex: 1;
      }

      .start-consultation-card > div:nth-child(2) > span {
        color: #b8d6e9;
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .start-consultation-card h2 {
        font-size: 15px;
        margin: 4px 0;
      }

      .start-consultation-card p {
        color: #d5e6f1;
        font-size: 9px;
        margin: 0;
      }

      .start-consultation-card button {
        border: none;
        border-radius: 9px;
        background: white;
        color: #0f4c81;
        padding: 11px 14px;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 10px;
        font-weight: 700;
        white-space: nowrap;
        transition: all .2s ease;
      }

      .start-consultation-card button:hover {
        transform: translateY(-1px);
      }

      .doctor-privacy {
        margin-top: 14px;
        padding: 13px;
        background: #effaf7;
        border: 1px solid #d5eee8;
        border-radius: 10px;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        color: #0f766e;
      }

      .doctor-privacy > div {
        flex: 1;
      }

      .doctor-privacy strong {
        display: block;
        color: #16324f;
        font-size: 10px;
      }

      .doctor-privacy p {
        color: #64748b;
        font-size: 9px;
        line-height: 1.5;
        margin: 4px 0 0;
      }

      @media (max-width: 950px) {

        .doctor-patient-sidebar {
          width: 70px;
        }

        .doctor-sidebar-title,
        .doctor-sidebar-security {
          display: none;
        }

        .doctor-sidebar-nav {
          justify-content: center;
          padding: 0;
          font-size: 0;
        }

        .doctor-content-grid {
          grid-template-columns: 1fr;
        }

        .doctor-info-grid {
          grid-template-columns: 1fr 1fr;
        }

      }

      @media (max-width: 650px) {

        .doctor-patient-topbar {
          padding: 0 15px;
        }

        .doctor-profile {
          display: none;
        }

        .doctor-patient-main {
          padding: 25px 15px 45px;
        }

        .doctor-patient-header {
          align-items: flex-start;
          gap: 12px;
        }

        .doctor-patient-header h1 {
          font-size: 25px;
        }

        .doctor-secure-badge {
          white-space: nowrap;
        }

        .patient-hero-card {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .patient-hero-status {
          width: 100%;
          box-sizing: border-box;
        }

        .doctor-info-grid {
          grid-template-columns: 1fr 1fr;
        }

        .ai-summary-body {
          flex-direction: column;
        }

        .ai-warning {
          width: auto;
        }

        .start-consultation-card {
          flex-direction: column;
          align-items: flex-start;
        }

        .start-consultation-card button {
          width: 100%;
          justify-content: center;
        }

      }

    `}</style>
  );
}