import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  Hospital,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
  UserRound,
  FileCheck2,
  Activity,
  Clock3,
  Eye,
  AlertCircle,
} from "lucide-react";

export default function PatientAccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const [authorized, setAuthorized] = useState(false);

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

  if (!referral) {
    return (
      <div className="access-error-page">
        <div className="access-error-card">

          <div className="access-error-icon">
            <FileText size={30} />
          </div>

          <h1>Referral Not Found</h1>

          <p>
            No verified referral is currently available.
            Search for a referral before accessing patient
            information.
          </p>

          <button
            onClick={() => navigate("/hospital/referrals")}
            className="access-primary-button"
          >
            <ArrowLeft size={17} />
            Go to Referral Search
          </button>

        </div>

        <AccessStyles />
      </div>
    );
  }

  const patient = {
    patientId: referral.patientId,
    name: referral.patientName,
    age: referral.age,
    gender: referral.gender,
    phone: referral.phone,
  };

  const handleAuthorization = () => {
    setAuthorized(true);
  };

  const handleDoctorAccess = () => {
    navigate(`/doctor/patient/${patient.patientId}`, {
      state: {
        patient,
        referral,
      },
    });
  };

  return (
    <div className="access-page">

      {/* ================= TOPBAR ================= */}

      <header className="access-topbar">

        <div className="access-brand">

          <div className="access-brand-icon">
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


        <div className="access-role">

          <div className="access-role-icon">
            <Hospital size={17} />
          </div>

          <div>
            <strong>Hospital Staff</strong>
            <span>Patient Access Desk</span>
          </div>

        </div>

      </header>


      <div className="access-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="access-sidebar">

          <div className="access-sidebar-title">
            HOSPITAL PORTAL
          </div>


          <button
            className="access-nav"
            onClick={() => navigate("/hospital")}
          >
            <ClipboardList size={18} />
            Dashboard
          </button>


          <button
            className="access-nav"
            onClick={() =>
              navigate("/hospital/referrals")
            }
          >
            <FileText size={18} />
            Referral Search
          </button>


          <button className="access-nav active">
            <UserRound size={18} />
            Patient Access
          </button>


          <div className="access-sidebar-security">

            <LockKeyhole size={18} />

            <strong>
              Protected records
            </strong>

            <p>
              Patient information is available only
              after authorized verification.
            </p>

          </div>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="access-main">

          <button
            className="access-back"
            onClick={() =>
              navigate("/hospital/referrals")
            }
          >
            <ArrowLeft size={16} />
            Back to Referral Search
          </button>


          {/* HEADER */}

          <div className="access-header">

            <div>

              <div className="access-eyebrow">
                HOSPITAL WORKFLOW
              </div>

              <h1>
                Patient Access
              </h1>

              <p>
                Review the verified referral and authorize
                access to the patient's available records.
              </p>

            </div>


            <div className="access-secure-badge">
              <ShieldCheck size={15} />
              Secure Session
            </div>

          </div>


          {/* WORKFLOW */}

          <div className="access-flow">

            <div className="access-flow-item completed">

              <div>
                <CheckCircle2 size={15} />
              </div>

              <span>
                Referral Created
              </span>

            </div>


            <div className="access-flow-line active" />


            <div className="access-flow-item completed">

              <div>
                <CheckCircle2 size={15} />
              </div>

              <span>
                Referral Verified
              </span>

            </div>


            <div className="access-flow-line active" />


            <div className="access-flow-item current">

              <div>
                3
              </div>

              <span>
                Patient Access
              </span>

            </div>


            <div className="access-flow-line" />


            <div className="access-flow-item">

              <div>
                4
              </div>

              <span>
                Doctor
              </span>

            </div>

          </div>


          {/* ================= PATIENT CARD ================= */}

          <section className="access-card">

            <div className="access-card-header">

              <div>

                <span className="access-label">
                  VERIFIED PATIENT
                </span>

                <h2>
                  Patient Information
                </h2>

              </div>

              <div className="access-verified">
                <CheckCircle2 size={14} />
                Referral Verified
              </div>

            </div>


            <div className="access-patient">

              <div className="access-patient-avatar">
                <UserRound size={27} />
              </div>

              <div className="access-patient-name">

                <h3>
                  {patient.name}
                </h3>

                <span>
                  Patient ID: {patient.patientId}
                </span>

              </div>

            </div>


            <div className="access-patient-details">

              <div>
                <span>Age</span>
                <strong>
                  {patient.age} years
                </strong>
              </div>

              <div>
                <span>Gender</span>
                <strong>
                  {patient.gender}
                </strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>
                  {patient.phone || "Not available"}
                </strong>
              </div>

              <div>
                <span>Referral ID</span>
                <strong>
                  {referral.referralId}
                </strong>
              </div>

            </div>

          </section>


          <div className="access-columns">

            {/* ================= RECORDS ================= */}

            <section className="access-card">

              <div className="access-card-header">

                <div>

                  <span className="access-label">
                    AVAILABLE RECORDS
                  </span>

                  <h2>
                    Authorized Health Information
                  </h2>

                </div>

                <FileCheck2
                  size={20}
                  className="access-header-icon"
                />

              </div>


              <p className="access-record-description">
                The following record categories are available
                through the patient's authorized healthcare
                continuity record.
              </p>


              <div className="access-record-list">

                <Record
                  icon={<Activity size={18} />}
                  title="Laboratory Reports"
                  description="Previous blood and diagnostic reports"
                  status="Available"
                />

                <Record
                  icon={<FileText size={18} />}
                  title="Medical History"
                  description="Relevant previous healthcare information"
                  status="Available"
                />

                <Record
                  icon={<ClipboardList size={18} />}
                  title="Previous Referrals"
                  description="Earlier referral and treatment information"
                  status="Available"
                />

                <Record
                  icon={<Clock3 size={18} />}
                  title="Previous Prescriptions"
                  description="Medication and treatment history"
                  status="Available"
                />

              </div>


              <div className="access-limited-note">

                <Eye size={16} />

                <span>
                  Access is limited to information relevant
                  to the current healthcare journey.
                </span>

              </div>

            </section>


            {/* ================= REFERRAL ================= */}

            <section className="access-card">

              <div className="access-card-header">

                <div>

                  <span className="access-label">
                    REFERRAL
                  </span>

                  <h2>
                    Referral Details
                  </h2>

                </div>

                <Stethoscope
                  size={20}
                  className="access-header-icon"
                />

              </div>


              <div className="access-referral-row">

                <span>
                  From
                </span>

                <strong>
                  {referral.source}
                </strong>

              </div>


              <div className="access-referral-row">

                <span>
                  Receiving Hospital
                </span>

                <strong>
                  {referral.hospital}
                </strong>

              </div>


              <div className="access-referral-row">

                <span>
                  Department
                </span>

                <strong>
                  {referral.department}
                </strong>

              </div>


              <div className="access-referral-row">

                <span>
                  Priority
                </span>

                <strong
                  className={
                    referral.priority?.toLowerCase()
                  }
                >
                  {referral.priority}
                </strong>

              </div>


              <div className="access-reason">

                <span>
                  Reason for Referral
                </span>

                <p>
                  {referral.reason}
                </p>

              </div>


              <div className="access-status">

                <span className="access-status-dot" />

                Referral status:{" "}
                <strong>
                  {referral.status}
                </strong>

              </div>

            </section>

          </div>


          {/* ================= AUTHORIZATION ================= */}

          {!authorized ? (

            <section className="authorization-card">

              <div className="authorization-icon">
                <LockKeyhole size={25} />
              </div>


              <div className="authorization-content">

                <span className="access-label">
                  AUTHORIZATION REQUIRED
                </span>

                <h2>
                  Authorize Patient Record Access
                </h2>

                <p>
                  Confirm that you are authorized to access
                  this patient's healthcare information for
                  the current referral.
                </p>


                <div className="authorization-checks">

                  <div>
                    <CheckCircle2 size={15} />
                    <span>
                      Referral has been verified
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={15} />
                    <span>
                      Access is related to the current treatment
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={15} />
                    <span>
                      Patient information remains protected
                    </span>
                  </div>

                </div>

              </div>


              <button
                className="authorize-button"
                onClick={handleAuthorization}
              >
                <ShieldCheck size={18} />
                Authorize Access
                <ArrowRight size={17} />
              </button>

            </section>

          ) : (

            <section className="authorization-success">

              <div className="authorization-success-icon">
                <CheckCircle2 size={25} />
              </div>

              <div>

                <span>
                  ACCESS AUTHORIZED
                </span>

                <h2>
                  Patient records are ready
                </h2>

                <p>
                  Authorized healthcare information can now
                  be reviewed by the treating doctor.
                </p>

              </div>


              <button
                className="doctor-access-button"
                onClick={handleDoctorAccess}
              >
                <Stethoscope size={18} />
                Continue to Doctor
                <ArrowRight size={17} />
              </button>

            </section>

          )}


          {/* ================= PRIVACY ================= */}

          <div className="access-privacy">

            <ShieldCheck size={19} />

            <div>

              <strong>
                Privacy & controlled access
              </strong>

              <p>
                HospitalLocker AI is designed so that
                healthcare records are not exposed merely
                by scanning a QR. The QR identifies the
                referral; authorized access is required
                before records can be viewed.
              </p>

            </div>

          </div>

        </main>

      </div>

      <AccessStyles />

    </div>
  );
}


/* ================= RECORD COMPONENT ================= */

function Record({
  icon,
  title,
  description,
  status,
}) {
  return (
    <div className="access-record">

      <div className="access-record-icon">
        {icon}
      </div>

      <div className="access-record-content">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <div className="access-record-status">
        <CheckCircle2 size={13} />
        {status}
      </div>

    </div>
  );
}


/* ================= STYLES ================= */

function AccessStyles() {
  return (
    <style>{`

      .access-page {
        min-height: 100vh;
        background: #f5f9fc;
        color: #16324f;
        font-family: Inter, Arial, sans-serif;
      }

      .access-topbar {
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

      .access-brand {
        display: flex;
        align-items: center;
        gap: 11px;
      }

      .access-brand-icon {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .access-brand strong {
        display: block;
        font-size: 18px;
        font-weight: 800;
      }

      .access-brand strong span {
        color: #0f766e;
      }

      .access-brand small {
        display: block;
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .access-role {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .access-role-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #e8f7f5;
        color: #0f766e;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .access-role strong,
      .access-role span {
        display: block;
      }

      .access-role strong {
        font-size: 12px;
      }

      .access-role span {
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .access-layout {
        display: flex;
        min-height: calc(100vh - 72px);
      }

      .access-sidebar {
        width: 235px;
        background: white;
        border-right: 1px solid #e2e8f0;
        padding: 24px 15px;
        flex-shrink: 0;
      }

      .access-sidebar-title {
        color: #94a3b8;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
        margin-bottom: 12px;
      }

      .access-nav {
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

      .access-nav:hover {
        background: #f1f7fb;
        color: #0f4c81;
        transform: translateX(2px);
      }

      .access-nav.active {
        background: #eaf4fb;
        color: #0f4c81;
        font-weight: 700;
      }

      .access-sidebar-security {
        margin-top: 30px;
        padding: 14px;
        border-radius: 11px;
        background: #f0f7fc;
        color: #0f766e;
      }

      .access-sidebar-security strong {
        display: block;
        color: #16324f;
        font-size: 11px;
        margin-top: 8px;
      }

      .access-sidebar-security p {
        color: #64748b;
        font-size: 10px;
        line-height: 1.5;
        margin: 5px 0 0;
      }

      .access-main {
        flex: 1;
        max-width: 1200px;
        padding: 30px 36px 60px;
      }

      .access-back {
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

      .access-back:hover {
        color: #0f4c81;
      }

      .access-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 23px;
      }

      .access-eyebrow,
      .access-label {
        color: #0f766e;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .access-header h1 {
        margin: 6px 0;
        font-size: 29px;
        letter-spacing: -.03em;
      }

      .access-header p {
        margin: 0;
        color: #64748b;
        font-size: 13px;
      }

      .access-secure-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #0f766e;
        background: #e8f7f5;
        border: 1px solid #d4eee9;
        border-radius: 999px;
        padding: 8px 11px;
        font-size: 10px;
        font-weight: 700;
      }

      .access-flow {
        display: flex;
        align-items: center;
        margin-bottom: 22px;
        overflow-x: auto;
      }

      .access-flow-item {
        display: flex;
        align-items: center;
        gap: 7px;
        color: #94a3b8;
        font-size: 10px;
        white-space: nowrap;
      }

      .access-flow-item > div {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background: #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
      }

      .access-flow-item.completed {
        color: #15803d;
      }

      .access-flow-item.completed > div {
        background: #ecfdf3;
        color: #15803d;
      }

      .access-flow-item.current {
        color: #0f4c81;
        font-weight: 700;
      }

      .access-flow-item.current > div {
        background: #0f4c81;
        color: white;
        box-shadow: 0 0 0 4px #eaf4fb;
      }

      .access-flow-line {
        width: 48px;
        height: 1px;
        background: #dbe3ea;
        margin: 0 8px;
        flex-shrink: 0;
      }

      .access-flow-line.active {
        background: #9fc8df;
      }

      .access-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 3px 12px rgba(15,76,129,.045);
      }

      .access-card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-bottom: 15px;
        border-bottom: 1px solid #eef2f6;
      }

      .access-card-header h2 {
        margin: 5px 0 0;
        font-size: 17px;
      }

      .access-header-icon {
        color: #0f4c81;
      }

      .access-verified {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #15803d;
        background: #ecfdf3;
        padding: 7px 10px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
      }

      .access-patient {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 18px;
      }

      .access-patient-avatar {
        width: 54px;
        height: 54px;
        border-radius: 13px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .access-patient-name h3 {
        margin: 0 0 4px;
        font-size: 18px;
      }

      .access-patient-name span {
        color: #64748b;
        font-size: 10px;
      }

      .access-patient-details {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 9px;
        margin-top: 18px;
      }

      .access-patient-details > div {
        background: #f8fafc;
        border-radius: 9px;
        padding: 11px;
      }

      .access-patient-details span,
      .access-patient-details strong {
        display: block;
      }

      .access-patient-details span {
        color: #94a3b8;
        font-size: 9px;
        margin-bottom: 4px;
      }

      .access-patient-details strong {
        font-size: 11px;
        word-break: break-word;
      }

      .access-columns {
        display: grid;
        grid-template-columns: 1.25fr .9fr;
        gap: 17px;
        margin-top: 17px;
      }

      .access-record-description {
        color: #64748b;
        font-size: 10px;
        line-height: 1.5;
        margin: 14px 0;
      }

      .access-record-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .access-record {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 1px solid #edf2f6;
        border-radius: 9px;
        transition: all .2s ease;
      }

      .access-record:hover {
        border-color: #cbdfea;
        transform: translateX(2px);
      }

      .access-record-icon {
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

      .access-record-content {
        flex: 1;
      }

      .access-record-content strong,
      .access-record-content span {
        display: block;
      }

      .access-record-content strong {
        font-size: 11px;
      }

      .access-record-content span {
        color: #64748b;
        font-size: 9px;
        margin-top: 3px;
      }

      .access-record-status {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #15803d;
        font-size: 9px;
        font-weight: 700;
      }

      .access-limited-note {
        margin-top: 13px;
        padding: 10px;
        border-radius: 8px;
        background: #f0f7fc;
        color: #64748b;
        display: flex;
        gap: 7px;
        align-items: center;
        font-size: 9px;
      }

      .access-limited-note svg {
        color: #0f4c81;
        flex-shrink: 0;
      }

      .access-referral-row {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        padding: 11px 0;
        border-bottom: 1px solid #eef2f6;
        font-size: 10px;
      }

      .access-referral-row span {
        color: #64748b;
      }

      .access-referral-row strong {
        text-align: right;
      }

      .access-referral-row strong.normal {
        color: #2563eb;
      }

      .access-referral-row strong.urgent {
        color: #c2410c;
      }

      .access-referral-row strong.emergency {
        color: #dc2626;
      }

      .access-reason {
        margin-top: 13px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 9px;
      }

      .access-reason span {
        color: #94a3b8;
        font-size: 9px;
        font-weight: 700;
      }

      .access-reason p {
        color: #16324f;
        font-size: 10px;
        line-height: 1.5;
        margin: 5px 0 0;
      }

      .access-status {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 13px;
        padding-top: 12px;
        border-top: 1px solid #eef2f6;
        color: #64748b;
        font-size: 9px;
      }

      .access-status-dot {
        width: 7px;
        height: 7px;
        background: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 0 4px #dcfce7;
      }

      .authorization-card {
        margin-top: 17px;
        padding: 19px;
        background: white;
        border: 1px solid #d8e8ef;
        border-radius: 14px;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        box-shadow: 0 3px 12px rgba(15,76,129,.045);
      }

      .authorization-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .authorization-content {
        flex: 1;
      }

      .authorization-content h2 {
        font-size: 16px;
        margin: 5px 0;
      }

      .authorization-content > p {
        color: #64748b;
        font-size: 10px;
        line-height: 1.5;
        margin: 0;
      }

      .authorization-checks {
        margin-top: 11px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
      }

      .authorization-checks div {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #15803d;
        font-size: 9px;
      }

      .authorize-button,
      .doctor-access-button {
        border: none;
        border-radius: 9px;
        min-height: 43px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        font-size: 10px;
        font-weight: 700;
        transition: all .2s ease;
        flex-shrink: 0;
      }

      .authorize-button {
        background: #0f4c81;
        color: white;
      }

      .authorize-button:hover,
      .doctor-access-button:hover {
        background: #0b3b64;
        transform: translateY(-1px);
      }

      .authorization-success {
        margin-top: 17px;
        padding: 18px;
        background: #effaf7;
        border: 1px solid #cfe9df;
        border-radius: 14px;
        display: flex;
        align-items: center;
        gap: 13px;
        animation: accessSuccess .35s ease-out;
      }

      @keyframes accessSuccess {
        from {
          opacity: 0;
          transform: translateY(8px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .authorization-success-icon {
        width: 47px;
        height: 47px;
        border-radius: 50%;
        background: #dcfce7;
        color: #15803d;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .authorization-success > div:nth-child(2) {
        flex: 1;
      }

      .authorization-success > div:nth-child(2) > span {
        color: #15803d;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .08em;
      }

      .authorization-success h2 {
        font-size: 15px;
        margin: 4px 0;
      }

      .authorization-success p {
        color: #64748b;
        font-size: 9px;
        margin: 0;
      }

      .doctor-access-button {
        background: #0f4c81;
        color: white;
      }

      .access-privacy {
        margin-top: 15px;
        padding: 14px;
        background: #f0f7fc;
        border: 1px solid #dcecf5;
        border-radius: 11px;
        display: flex;
        align-items: flex-start;
        gap: 9px;
        color: #0f766e;
      }

      .access-privacy > div {
        flex: 1;
      }

      .access-privacy strong {
        display: block;
        color: #16324f;
        font-size: 10px;
      }

      .access-privacy p {
        color: #64748b;
        font-size: 9px;
        line-height: 1.5;
        margin: 4px 0 0;
      }

      .access-error-page {
        min-height: 100vh;
        background: #f5f9fc;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 25px;
        font-family: Inter, Arial, sans-serif;
      }

      .access-error-card {
        width: min(450px, 100%);
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 17px;
        padding: 35px;
        text-align: center;
        box-shadow: 0 15px 40px rgba(15,76,129,.09);
      }

      .access-error-icon {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
      }

      .access-error-card h1 {
        font-size: 23px;
        margin: 17px 0 7px;
      }

      .access-error-card p {
        color: #64748b;
        font-size: 12px;
        line-height: 1.5;
      }

      .access-primary-button {
        margin-top: 12px;
        border: none;
        background: #0f4c81;
        color: white;
        border-radius: 9px;
        padding: 11px 16px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-size: 11px;
        font-weight: 700;
      }

      @media (max-width: 900px) {

        .access-sidebar {
          width: 70px;
        }

        .access-sidebar-title,
        .access-sidebar-security {
          display: none;
        }

        .access-nav {
          justify-content: center;
          padding: 0;
          font-size: 0;
        }

        .access-columns {
          grid-template-columns: 1fr;
        }

        .access-patient-details {
          grid-template-columns: 1fr 1fr;
        }

      }

      @media (max-width: 600px) {

        .access-topbar {
          padding: 0 15px;
        }

        .access-role {
          display: none;
        }

        .access-main {
          padding: 25px 15px 45px;
        }

        .access-header {
          align-items: flex-start;
          gap: 12px;
        }

        .access-header h1 {
          font-size: 25px;
        }

        .access-secure-badge {
          white-space: nowrap;
        }

        .access-patient-details {
          grid-template-columns: 1fr;
        }

        .authorization-card,
        .authorization-success {
          flex-direction: column;
        }

        .authorize-button,
        .doctor-access-button {
          width: 100%;
        }

      }

    `}</style>
  );
}