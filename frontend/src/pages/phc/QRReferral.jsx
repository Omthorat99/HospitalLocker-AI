import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Download,
  Hospital,
  LockKeyhole,
  MapPin,
  Printer,
  QrCode,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

export default function QRReferral() {
  const navigate = useNavigate();
  const location = useLocation();

  const storedReferral = localStorage.getItem("hospitalLockerReferral");

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
      <div className="qr-error-page">
        <div className="qr-error-card">
          <div className="qr-error-icon">
            <QrCode size={32} />
          </div>

          <h1>No Referral Found</h1>

          <p>
            Create a digital referral first before generating
            the referral QR.
          </p>

          <button
            onClick={() => navigate("/phc/patients")}
            className="qr-primary-button"
          >
            Go to Patient Search
          </button>
        </div>

        <QRStyles />
      </div>
    );
  }

  const qrValue = referral.referralId;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const canvas = document.getElementById("hospital-locker-qr");

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = `${referral.referralId}-QR.png`;
    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  const copyReferralId = async () => {
    try {
      await navigator.clipboard.writeText(referral.referralId);
      alert("Referral ID copied.");
    } catch {
      alert("Unable to copy Referral ID.");
    }
  };

  return (
    <div className="qr-page page-enter">

      {/* TOPBAR */}

      <header className="qr-topbar">

        <div className="qr-brand">

          <div className="qr-brand-icon">
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

        <div className="qr-role">

          <div className="qr-role-icon">
            <Stethoscope size={17} />
          </div>

          <div>
            <strong>PHC Staff</strong>
            <span>Primary Health Centre</span>
          </div>

        </div>

      </header>


      <div className="qr-layout">

        {/* SIDEBAR */}

        <aside className="qr-sidebar">

          <div className="qr-sidebar-title">
            PHC PORTAL
          </div>

          <button
            className="qr-nav"
            onClick={() => navigate("/phc")}
          >
            <Clipboard size={18} />
            Dashboard
          </button>

          <button
            className="qr-nav"
            onClick={() => navigate("/phc/patients")}
          >
            <UserRound size={18} />
            Patient Search
          </button>

          <button
            className="qr-nav"
            onClick={() => navigate("/phc/create-referral")}
          >
            <Clipboard size={18} />
            Create Referral
          </button>

          <button className="qr-nav active">
            <QrCode size={18} />
            Referral QR
          </button>


          <div className="qr-sidebar-security">

            <LockKeyhole size={18} />

            <strong>
              Secure QR
            </strong>

            <p>
              The QR contains only the referral
              identifier, not medical records.
            </p>

          </div>

        </aside>


        {/* MAIN */}

        <main className="qr-main">

          <button
            className="qr-back"
            onClick={() => navigate("/phc/create-referral")}
          >
            <ArrowLeft size={16} />
            Back to Referral
          </button>


          {/* HEADER */}

          <div className="qr-header">

            <div>

              <div className="qr-eyebrow">
                DIGITAL REFERRAL
              </div>

              <h1>
                Referral QR
              </h1>

              <p>
                Securely hand off the patient's referral
                to the receiving hospital.
              </p>

            </div>

            <div className="qr-status">
              <CheckCircle2 size={15} />
              Referral Ready
            </div>

          </div>


          <div className="qr-grid">

            {/* QR CARD */}

            <section className="qr-card qr-code-card">

              <div className="qr-card-heading">

                <div>

                  <span className="qr-label">
                    SECURE REFERRAL QR
                  </span>

                  <h2>
                    Scan at Hospital
                  </h2>

                </div>

                <div className="qr-heading-icon">
                  <QrCode size={21} />
                </div>

              </div>


              {/* QR */}

              <div className="qr-display">

                <div className="qr-frame">

                  <QRCodeCanvas
                    id="hospital-locker-qr"
                    value={qrValue}
                    size={250}
                    bgColor="#ffffff"
                    fgColor="#16324f"
                    level="H"
                    includeMargin={true}
                  />

                </div>

              </div>


              <div className="qr-scan-instruction">

                <div className="qr-scan-icon">
                  <QrCode size={17} />
                </div>

                <div>
                  <strong>
                    Hospital staff can scan this QR
                  </strong>

                  <p>
                    The referral ID will be used to
                    securely retrieve the referral.
                  </p>
                </div>

              </div>


              {/* REFERRAL ID */}

              <div className="qr-id-section">

                <span>
                  REFERRAL ID
                </span>

                <div className="qr-id-row">

                  <strong>
                    {referral.referralId}
                  </strong>

                  <button
                    onClick={copyReferralId}
                    title="Copy Referral ID"
                  >
                    <Clipboard size={16} />
                  </button>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="qr-actions">

                <button
                  className="qr-action-primary"
                  onClick={handleDownload}
                >
                  <Download size={17} />
                  Download QR
                </button>

                <button
                  className="qr-action-secondary"
                  onClick={handlePrint}
                >
                  <Printer size={17} />
                  Print
                </button>

              </div>

            </section>


            {/* DETAILS */}

            <section className="qr-details-column">

              {/* PATIENT */}

              <div className="qr-card">

                <div className="qr-card-heading">

                  <div>

                    <span className="qr-label">
                      PATIENT
                    </span>

                    <h2>
                      Patient Details
                    </h2>

                  </div>

                  <UserRound
                    size={20}
                    className="qr-muted-icon"
                  />

                </div>


                <div className="qr-patient">

                  <div className="qr-patient-avatar">
                    <UserRound size={23} />
                  </div>

                  <div>
                    <strong>
                      {referral.patientName}
                    </strong>

                    <span>
                      Patient ID: {referral.patientId}
                    </span>
                  </div>

                </div>


                <div className="qr-detail-grid">

                  <div>
                    <span>Age</span>
                    <strong>
                      {referral.age} years
                    </strong>
                  </div>

                  <div>
                    <span>Gender</span>
                    <strong>
                      {referral.gender}
                    </strong>
                  </div>

                </div>

              </div>


              {/* DESTINATION */}

              <div className="qr-card">

                <span className="qr-label">
                  RECEIVING FACILITY
                </span>

                <div className="qr-hospital">

                  <div className="qr-hospital-icon">
                    <Hospital size={22} />
                  </div>

                  <div>
                    <strong>
                      {referral.hospital}
                    </strong>

                    <span>
                      {referral.department}
                    </span>
                  </div>

                </div>


                <div className="qr-location">
                  <MapPin size={14} />
                  Pune, Maharashtra
                </div>


                <div className="qr-priority">

                  <span>Priority</span>

                  <strong
                    className={
                      referral.priority?.toLowerCase()
                    }
                  >
                    {referral.priority}
                  </strong>

                </div>

              </div>


              {/* JOURNEY */}

              <div className="qr-card">

                <span className="qr-label">
                  REFERRAL JOURNEY
                </span>

                <div className="qr-journey">

                  <div className="qr-journey-item completed">

                    <div>
                      <CheckCircle2 size={14} />
                    </div>

                    <span>
                      PHC Referral Created
                    </span>

                  </div>


                  <div className="qr-journey-line" />


                  <div className="qr-journey-item current">

                    <div>
                      <QrCode size={14} />
                    </div>

                    <span>
                      QR Generated
                    </span>

                  </div>


                  <div className="qr-journey-line" />


                  <div className="qr-journey-item">

                    <div>
                      <Hospital size={14} />
                    </div>

                    <span>
                      Hospital Verification
                    </span>

                  </div>

                </div>

              </div>

            </section>

          </div>


          {/* PRIVACY */}

          <div className="qr-privacy">

            <div className="qr-privacy-icon">
              <ShieldCheck size={20} />
            </div>

            <div>

              <strong>
                Privacy-first referral exchange
              </strong>

              <p>
                This QR contains only the referral ID:
                <strong> {referral.referralId}</strong>.
                Patient medical records and sensitive information
                are not embedded in the QR.
              </p>

            </div>

            <div className="qr-secure-tag">
              <LockKeyhole size={14} />
              Protected
            </div>

          </div>


          {/* GO TO HOSPITAL */}

          <div className="qr-next-section">

            <div>

              <span>
                NEXT STEP
              </span>

              <strong>
                Hospital verification
              </strong>

              <p>
                Scan this QR from the Hospital Referral Search
                screen to retrieve the referral.
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/hospital/referrals")
              }
            >
              Open Hospital Search
              <ArrowRight size={17} />
            </button>

          </div>

        </main>

      </div>

      <QRStyles />

    </div>
  );
}


function QRStyles() {
  return (
    <style>{`

      .qr-page {
        min-height: 100vh;
        background: #f5f9fc;
        color: #16324f;
        font-family: Inter, Arial, sans-serif;
      }

      .qr-topbar {
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

      .qr-brand {
        display: flex;
        align-items: center;
        gap: 11px;
      }

      .qr-brand-icon {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-brand strong {
        display: block;
        font-size: 18px;
        font-weight: 800;
      }

      .qr-brand strong span {
        color: #0f766e;
      }

      .qr-brand small {
        display: block;
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .qr-role {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .qr-role-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #e8f7f5;
        color: #0f766e;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-role strong,
      .qr-role span {
        display: block;
      }

      .qr-role strong {
        font-size: 12px;
      }

      .qr-role span {
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .qr-layout {
        display: flex;
        min-height: calc(100vh - 72px);
      }

      .qr-sidebar {
        width: 235px;
        background: white;
        border-right: 1px solid #e2e8f0;
        padding: 24px 15px;
        flex-shrink: 0;
      }

      .qr-sidebar-title {
        color: #94a3b8;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
        margin-bottom: 12px;
      }

      .qr-nav {
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

      .qr-nav:hover {
        background: #f1f7fb;
        color: #0f4c81;
        transform: translateX(2px);
      }

      .qr-nav.active {
        background: #eaf4fb;
        color: #0f4c81;
        font-weight: 700;
      }

      .qr-sidebar-security {
        margin-top: 30px;
        padding: 14px;
        border-radius: 11px;
        background: #f0f7fc;
        color: #0f766e;
      }

      .qr-sidebar-security strong {
        display: block;
        color: #16324f;
        font-size: 11px;
        margin-top: 8px;
      }

      .qr-sidebar-security p {
        color: #64748b;
        font-size: 10px;
        line-height: 1.5;
        margin: 5px 0 0;
      }

      .qr-main {
        flex: 1;
        max-width: 1200px;
        padding: 30px 36px 60px;
      }

      .qr-back {
        border: none;
        background: transparent;
        color: #64748b;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        margin-bottom: 23px;
      }

      .qr-back:hover {
        color: #0f4c81;
      }

      .qr-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 25px;
      }

      .qr-eyebrow,
      .qr-label {
        color: #0f766e;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .qr-header h1 {
        margin: 6px 0;
        font-size: 29px;
        letter-spacing: -.03em;
      }

      .qr-header p {
        margin: 0;
        color: #64748b;
        font-size: 13px;
      }

      .qr-status {
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

      .qr-grid {
        display: grid;
        grid-template-columns: minmax(390px, .95fr) minmax(300px, 1fr);
        gap: 18px;
        align-items: start;
      }

      .qr-details-column {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .qr-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 3px 12px rgba(15,76,129,.045);
        transition: all .2s ease;
      }

      .qr-card:hover {
        box-shadow: 0 9px 25px rgba(15,76,129,.08);
      }

      .qr-code-card {
        text-align: center;
      }

      .qr-card-heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        text-align: left;
        padding-bottom: 15px;
        border-bottom: 1px solid #eef2f6;
      }

      .qr-card-heading h2 {
        margin: 5px 0 0;
        font-size: 17px;
      }

      .qr-heading-icon {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-muted-icon {
        color: #94a3b8;
      }

      .qr-display {
        padding: 28px 10px 20px;
        display: flex;
        justify-content: center;
      }

      .qr-frame {
        padding: 14px;
        background: white;
        border: 1px solid #dbe5ec;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(15,76,129,.08);
        animation: qrAppear .45s ease-out;
      }

      @keyframes qrAppear {
        from {
          opacity: 0;
          transform: scale(.94);
        }

        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .qr-scan-instruction {
        max-width: 390px;
        margin: 0 auto;
        display: flex;
        text-align: left;
        gap: 10px;
        padding: 13px;
        background: #f0f7fc;
        border: 1px solid #dcecf5;
        border-radius: 10px;
      }

      .qr-scan-icon {
        color: #0f4c81;
        flex-shrink: 0;
      }

      .qr-scan-instruction strong {
        display: block;
        font-size: 11px;
      }

      .qr-scan-instruction p {
        color: #64748b;
        font-size: 9px;
        line-height: 1.5;
        margin: 4px 0 0;
      }

      .qr-id-section {
        margin-top: 18px;
        padding-top: 17px;
        border-top: 1px solid #eef2f6;
        text-align: left;
      }

      .qr-id-section > span {
        color: #94a3b8;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .qr-id-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 6px;
        background: #f8fafc;
        border: 1px solid #edf2f6;
        border-radius: 9px;
        padding: 9px 10px;
      }

      .qr-id-row strong {
        color: #0f4c81;
        font-size: 15px;
        letter-spacing: .04em;
      }

      .qr-id-row button {
        width: 31px;
        height: 31px;
        border: none;
        border-radius: 7px;
        background: white;
        color: #64748b;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-id-row button:hover {
        color: #0f4c81;
        background: #eaf4fb;
      }

      .qr-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
        margin-top: 13px;
      }

      .qr-action-primary,
      .qr-action-secondary {
        border: none;
        border-radius: 9px;
        padding: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        font-size: 11px;
        font-weight: 700;
      }

      .qr-action-primary {
        background: #0f4c81;
        color: white;
      }

      .qr-action-primary:hover {
        background: #0b3b64;
      }

      .qr-action-secondary {
        background: #edf2f7;
        color: #475569;
      }

      .qr-action-secondary:hover {
        background: #e2e8f0;
      }

      .qr-patient {
        display: flex;
        align-items: center;
        gap: 11px;
        margin-top: 15px;
      }

      .qr-patient-avatar {
        width: 45px;
        height: 45px;
        border-radius: 11px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-patient strong,
      .qr-patient span {
        display: block;
      }

      .qr-patient strong {
        font-size: 14px;
      }

      .qr-patient span {
        color: #64748b;
        font-size: 10px;
        margin-top: 4px;
      }

      .qr-detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 9px;
        margin-top: 15px;
      }

      .qr-detail-grid > div {
        background: #f8fafc;
        border-radius: 8px;
        padding: 10px;
      }

      .qr-detail-grid span,
      .qr-detail-grid strong {
        display: block;
      }

      .qr-detail-grid span {
        color: #94a3b8;
        font-size: 9px;
        margin-bottom: 4px;
      }

      .qr-detail-grid strong {
        font-size: 11px;
      }

      .qr-hospital {
        display: flex;
        align-items: center;
        gap: 11px;
        margin-top: 14px;
      }

      .qr-hospital-icon {
        width: 43px;
        height: 43px;
        border-radius: 10px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-hospital strong,
      .qr-hospital span {
        display: block;
      }

      .qr-hospital strong {
        font-size: 13px;
      }

      .qr-hospital span {
        color: #64748b;
        font-size: 10px;
        margin-top: 3px;
      }

      .qr-location {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #64748b;
        font-size: 10px;
        margin-top: 12px;
      }

      .qr-priority {
        display: flex;
        justify-content: space-between;
        margin-top: 13px;
        padding-top: 12px;
        border-top: 1px solid #eef2f6;
        font-size: 10px;
      }

      .qr-priority span {
        color: #64748b;
      }

      .qr-priority strong.normal {
        color: #2563eb;
      }

      .qr-priority strong.urgent {
        color: #c2410c;
      }

      .qr-priority strong.emergency {
        color: #dc2626;
      }

      .qr-journey {
        margin-top: 15px;
      }

      .qr-journey-item {
        display: flex;
        align-items: center;
        gap: 9px;
        color: #94a3b8;
        font-size: 10px;
      }

      .qr-journey-item > div {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background: #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-journey-item.completed {
        color: #15803d;
      }

      .qr-journey-item.completed > div {
        background: #ecfdf3;
        color: #15803d;
      }

      .qr-journey-item.current {
        color: #0f4c81;
        font-weight: 700;
      }

      .qr-journey-item.current > div {
        background: #eaf4fb;
        color: #0f4c81;
      }

      .qr-journey-line {
        height: 18px;
        width: 1px;
        background: #dbe3ea;
        margin-left: 13px;
      }

      .qr-privacy {
        margin-top: 18px;
        background: #effaf7;
        border: 1px solid #d4eee7;
        border-radius: 12px;
        padding: 15px;
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }

      .qr-privacy-icon {
        color: #0f766e;
        flex-shrink: 0;
      }

      .qr-privacy > div:nth-child(2) {
        flex: 1;
      }

      .qr-privacy strong {
        font-size: 11px;
      }

      .qr-privacy p {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 9px;
        line-height: 1.5;
      }

      .qr-secure-tag {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #15803d;
        background: white;
        border: 1px solid #d8eee0;
        border-radius: 999px;
        padding: 6px 8px;
        font-size: 9px;
        font-weight: 700;
      }

      .qr-next-section {
        margin-top: 15px;
        padding: 17px 19px;
        background: #0f4c81;
        color: white;
        border-radius: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }

      .qr-next-section > div {
        flex: 1;
      }

      .qr-next-section span {
        display: block;
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .08em;
        opacity: .7;
      }

      .qr-next-section strong {
        display: block;
        font-size: 14px;
        margin-top: 4px;
      }

      .qr-next-section p {
        color: #d8e8f4;
        font-size: 9px;
        margin: 4px 0 0;
      }

      .qr-next-section button {
        border: none;
        background: white;
        color: #0f4c81;
        border-radius: 8px;
        padding: 10px 13px;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 10px;
        font-weight: 700;
        white-space: nowrap;
      }

      .qr-error-page {
        min-height: 100vh;
        background: #f5f9fc;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 25px;
        font-family: Inter, Arial, sans-serif;
      }

      .qr-error-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 17px;
        padding: 35px;
        width: min(450px, 100%);
        text-align: center;
        box-shadow: 0 15px 40px rgba(15,76,129,.09);
      }

      .qr-error-icon {
        width: 65px;
        height: 65px;
        margin: auto;
        border-radius: 50%;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-error-card h1 {
        font-size: 23px;
        margin: 17px 0 7px;
      }

      .qr-error-card p {
        color: #64748b;
        font-size: 12px;
        line-height: 1.5;
      }

      .qr-primary-button {
        border: none;
        background: #0f4c81;
        color: white;
        border-radius: 9px;
        padding: 11px 17px;
        font-weight: 700;
        font-size: 11px;
        margin-top: 12px;
      }

      @media (max-width: 900px) {

        .qr-sidebar {
          width: 70px;
        }

        .qr-sidebar-title,
        .qr-sidebar-security {
          display: none;
        }

        .qr-nav {
          justify-content: center;
          padding: 0;
          font-size: 0;
        }

        .qr-grid {
          grid-template-columns: 1fr;
        }

      }

      @media (max-width: 600px) {

        .qr-topbar {
          padding: 0 15px;
        }

        .qr-role {
          display: none;
        }

        .qr-main {
          padding: 25px 15px 45px;
        }

        .qr-header {
          align-items: flex-start;
          gap: 15px;
        }

        .qr-header h1 {
          font-size: 25px;
        }

        .qr-status {
          white-space: nowrap;
        }

        .qr-grid {
          grid-template-columns: 1fr;
        }

        .qr-code-card {
          padding: 15px;
        }

        .qr-frame canvas {
          max-width: 100%;
          height: auto;
        }

        .qr-privacy {
          flex-wrap: wrap;
        }

        .qr-next-section {
          flex-direction: column;
          align-items: flex-start;
        }

        .qr-next-section button {
          width: 100%;
          justify-content: center;
        }

      }

      @media print {

        .qr-topbar,
        .qr-sidebar,
        .qr-back,
        .qr-actions,
        .qr-privacy,
        .qr-next-section {
          display: none !important;
        }

        .qr-main {
          max-width: none;
          padding: 0;
        }

        .qr-grid {
          display: block;
        }

        .qr-code-card {
          border: none;
          box-shadow: none;
        }

        .qr-details-column {
          display: none;
        }

        .qr-frame {
          box-shadow: none;
        }

      }

    `}</style>
  );
}