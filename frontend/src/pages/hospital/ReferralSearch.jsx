import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clipboard,
  FileSearch,
  Hospital,
  LockKeyhole,
  QrCode,
  ScanLine,
  Search,
  ShieldCheck,
  Stethoscope,
  UserRound,
  XCircle,
} from "lucide-react";

export default function ReferralSearch() {
  const navigate = useNavigate();
  const location = useLocation();

  const [referralId, setReferralId] = useState("");
  const [referral, setReferral] = useState(null);
  const [error, setError] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);

  const searchReferral = (id = referralId) => {
    const searchId = id.trim();

    if (!searchId) {
      setError("Please enter a Referral ID.");
      setReferral(null);
      return;
    }

    const storedReferral = localStorage.getItem(
      "hospitalLockerReferral"
    );

    if (!storedReferral) {
      setReferral(null);
      setError(
        "No referral is currently available. Create a referral from the PHC portal first."
      );
      return;
    }

    try {
      const data = JSON.parse(storedReferral);

      if (
        data.referralId &&
        data.referralId.toLowerCase() ===
          searchId.toLowerCase()
      ) {
        setReferral(data);
        setError("");
      } else {
        setReferral(null);
        setError(
          "Referral not found. Please verify the Referral ID."
        );
      }
    } catch {
      setReferral(null);
      setError("Unable to read the referral data.");
    }
  };

  useEffect(() => {
    if (!scannerOpen) return;

    const scanner = new Html5QrcodeScanner(
      "hospital-qr-reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setReferralId(decodedText);
        searchReferral(decodedText);

        scanner
          .clear()
          .catch(() => {});

        setScannerOpen(false);
      },
      () => {
        // Scanner continuously reports unsuccessful frames.
        // These are intentionally ignored.
      }
    );

    return () => {
      scanner
        .clear()
        .catch(() => {});
    };
  }, [scannerOpen]);

  const handleAccessPatient = () => {
    if (!referral) return;

    navigate("/hospital/patient-access", {
      state: {
        referral,
      },
    });
  };

  return (
    <div className="hospital-search-page page-enter">

      {/* ================= TOP BAR ================= */}

      <header className="hospital-search-topbar">

        <div className="hospital-search-brand">

          <div className="hospital-search-brand-icon">
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


        <div className="hospital-search-role">

          <div className="hospital-search-role-icon">
            <Hospital size={17} />
          </div>

          <div>
            <strong>Hospital Staff</strong>
            <span>Referral Desk</span>
          </div>

        </div>

      </header>


      <div className="hospital-search-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="hospital-search-sidebar">

          <div className="hospital-search-sidebar-title">
            HOSPITAL PORTAL
          </div>


          <button
            className="hospital-search-nav"
            onClick={() => navigate("/hospital")}
          >
            <Building2 size={18} />
            Dashboard
          </button>


          <button className="hospital-search-nav active">
            <FileSearch size={18} />
            Referral Search
          </button>


          <button
            className="hospital-search-nav"
            onClick={() =>
              navigate("/hospital/patient-access")
            }
          >
            <UserRound size={18} />
            Patient Access
          </button>


          <div className="hospital-search-security">

            <LockKeyhole size={18} />

            <strong>
              Authorized access
            </strong>

            <p>
              Patient records are accessed only
              after referral verification.
            </p>

          </div>

        </aside>


        {/* ================= MAIN ================= */}

        <main className="hospital-search-main">

          <button
            className="hospital-search-back"
            onClick={() => navigate("/hospital")}
          >
            <ArrowLeft size={16} />
            Back to Hospital Dashboard
          </button>


          {/* HEADER */}

          <div className="hospital-search-header">

            <div>

              <div className="hospital-search-eyebrow">
                HOSPITAL WORKFLOW
              </div>

              <h1>
                Referral Search
              </h1>

              <p>
                Verify a digital referral before accessing
                the patient's authorized records.
              </p>

            </div>


            <div className="hospital-search-status">
              <ShieldCheck size={15} />
              Secure Access
            </div>

          </div>


          {/* FLOW */}

          <div className="hospital-search-flow">

            <div className="hospital-flow-item completed">

              <div>
                <CheckCircle2 size={15} />
              </div>

              <span>
                Referral Created
              </span>

            </div>


            <div className="hospital-flow-line active" />


            <div className="hospital-flow-item current">

              <div>
                2
              </div>

              <span>
                Verify Referral
              </span>

            </div>


            <div className="hospital-flow-line" />


            <div className="hospital-flow-item">

              <div>
                3
              </div>

              <span>
                Patient Access
              </span>

            </div>


            <div className="hospital-flow-line" />


            <div className="hospital-flow-item">

              <div>
                4
              </div>

              <span>
                Doctor
              </span>

            </div>

          </div>


          {/* SEARCH CARD */}

          <section className="hospital-search-card">

            <div className="hospital-search-card-header">

              <div>

                <span className="hospital-search-label">
                  REFERRAL VERIFICATION
                </span>

                <h2>
                  Find Patient Referral
                </h2>

                <p>
                  Enter the referral ID manually or scan
                  the patient's QR code.
                </p>

              </div>


              <div className="hospital-search-header-icon">
                <FileSearch size={22} />
              </div>

            </div>


            {/* MANUAL SEARCH */}

            <div className="hospital-input-section">

              <label>
                Referral ID
              </label>

              <div className="hospital-search-input-row">

                <div className="hospital-search-input-wrapper">

                  <Search size={18} />

                  <input
                    value={referralId}
                    onChange={(e) => {
                      setReferralId(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchReferral();
                      }
                    }}
                    placeholder="Example: HL-REF-12345"
                  />

                  {referralId && (
                    <button
                      className="hospital-clear-input"
                      onClick={() => {
                        setReferralId("");
                        setReferral(null);
                        setError("");
                      }}
                    >
                      ×
                    </button>
                  )}

                </div>


                <button
                  className="hospital-search-button"
                  onClick={() => searchReferral()}
                >
                  <Search size={17} />
                  Search
                </button>

              </div>

            </div>


            {/* DIVIDER */}

            <div className="hospital-or-divider">
              <span />
              <strong>OR</strong>
              <span />
            </div>


            {/* QR SCAN */}

            {!scannerOpen && (

              <button
                className="hospital-scan-button"
                onClick={() => {
                  setError("");
                  setReferral(null);
                  setScannerOpen(true);
                }}
              >

                <div className="hospital-scan-icon">
                  <ScanLine size={23} />
                </div>

                <div>
                  <strong>
                    Scan Referral QR
                  </strong>

                  <span>
                    Use the hospital device camera
                    to scan the patient's QR.
                  </span>
                </div>

                <ArrowRight size={17} />

              </button>

            )}


            {/* QR SCANNER */}

            {scannerOpen && (

              <div className="hospital-scanner-container">

                <div className="hospital-scanner-header">

                  <div>
                    <span className="hospital-search-label">
                      QR SCANNER
                    </span>

                    <h3>
                      Scan Patient Referral
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setScannerOpen(false)
                    }
                    className="hospital-scanner-close"
                  >
                    <XCircle size={19} />
                  </button>

                </div>


                <div
                  id="hospital-qr-reader"
                  className="hospital-qr-reader"
                />


                <div className="hospital-scanner-help">

                  <QrCode size={16} />

                  <span>
                    Point the camera at the referral QR.
                    Only the referral identifier is read.
                  </span>

                </div>

              </div>

            )}

          </section>


          {/* ERROR */}

          {error && (

            <div className="hospital-error">

              <XCircle size={19} />

              <div>
                <strong>
                  Referral not verified
                </strong>

                <span>
                  {error}
                </span>
              </div>

            </div>

          )}


          {/* RESULT */}

          {referral && (

            <section className="hospital-result page-enter">

              <div className="hospital-result-header">

                <div className="hospital-result-title">

                  <div className="hospital-result-icon">
                    <CheckCircle2 size={23} />
                  </div>

                  <div>

                    <span>
                      VERIFIED REFERRAL
                    </span>

                    <h2>
                      Referral Found
                    </h2>

                  </div>

                </div>


                <div className="hospital-verified-badge">
                  <CheckCircle2 size={14} />
                  Verified
                </div>

              </div>


              {/* PATIENT */}

              <div className="hospital-result-patient">

                <div className="hospital-patient-avatar">
                  <UserRound size={26} />
                </div>

                <div>

                  <span>
                    PATIENT
                  </span>

                  <h3>
                    {referral.patientName}
                  </h3>

                  <p>
                    Patient ID: {referral.patientId}
                  </p>

                </div>

              </div>


              {/* DETAILS */}

              <div className="hospital-result-details">

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

                <div>
                  <span>Referral ID</span>
                  <strong>
                    {referral.referralId}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className="status">
                    {referral.status}
                  </strong>
                </div>

              </div>


              {/* REFERRAL INFORMATION */}

              <div className="hospital-referral-info">

                <div className="hospital-referral-info-header">

                  <div>
                    <span>
                      REFERRAL INFORMATION
                    </span>

                    <h3>
                      Treatment Details
                    </h3>
                  </div>

                  <Stethoscope size={20} />

                </div>


                <div className="hospital-info-grid">

                  <div>

                    <span>
                      From
                    </span>

                    <strong>
                      {referral.source}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Receiving Hospital
                    </span>

                    <strong>
                      {referral.hospital}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Department
                    </span>

                    <strong>
                      {referral.department}
                    </strong>

                  </div>


                  <div>

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


                  <div className="hospital-reason">

                    <span>
                      Reason for Referral
                    </span>

                    <strong>
                      {referral.reason}
                    </strong>

                  </div>

                </div>

              </div>


              {/* PRIVACY */}

              <div className="hospital-result-security">

                <ShieldCheck size={19} />

                <div>

                  <strong>
                    Referral verified successfully
                  </strong>

                  <p>
                    Patient records can now be accessed
                    according to authorization and consent.
                  </p>

                </div>

              </div>


              {/* ACTION */}

              <button
                className="hospital-access-button"
                onClick={handleAccessPatient}
              >

                <LockKeyhole size={18} />

                Verify & Access Patient

                <ArrowRight size={18} />

              </button>

            </section>

          )}


          {/* BOTTOM INFORMATION */}

          {!referral && !error && !scannerOpen && (

            <div className="hospital-info-banner">

              <div className="hospital-info-icon">
                <ShieldCheck size={19} />
              </div>

              <div>

                <strong>
                  Privacy-first referral verification
                </strong>

                <p>
                  The QR contains only a referral identifier.
                  Patient medical records remain outside the QR
                  and are retrieved through authorized access.
                </p>

              </div>

            </div>

          )}

        </main>

      </div>


      <HospitalSearchStyles />

    </div>
  );
}


function HospitalSearchStyles() {
  return (
    <style>{`

      .hospital-search-page {
        min-height: 100vh;
        background: #f5f9fc;
        color: #16324f;
        font-family: Inter, Arial, sans-serif;
      }

      .hospital-search-topbar {
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

      .hospital-search-brand {
        display: flex;
        align-items: center;
        gap: 11px;
      }

      .hospital-search-brand-icon {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hospital-search-brand strong {
        display: block;
        font-size: 18px;
        font-weight: 800;
      }

      .hospital-search-brand strong span {
        color: #0f766e;
      }

      .hospital-search-brand small {
        display: block;
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .hospital-search-role {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .hospital-search-role-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #e8f7f5;
        color: #0f766e;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hospital-search-role strong,
      .hospital-search-role span {
        display: block;
      }

      .hospital-search-role strong {
        font-size: 12px;
      }

      .hospital-search-role span {
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .hospital-search-layout {
        display: flex;
        min-height: calc(100vh - 72px);
      }

      .hospital-search-sidebar {
        width: 235px;
        background: white;
        border-right: 1px solid #e2e8f0;
        padding: 24px 15px;
        flex-shrink: 0;
      }

      .hospital-search-sidebar-title {
        color: #94a3b8;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
        margin-bottom: 12px;
      }

      .hospital-search-nav {
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

      .hospital-search-nav:hover {
        background: #f1f7fb;
        color: #0f4c81;
        transform: translateX(2px);
      }

      .hospital-search-nav.active {
        background: #eaf4fb;
        color: #0f4c81;
        font-weight: 700;
      }

      .hospital-search-security {
        margin-top: 30px;
        padding: 14px;
        border-radius: 11px;
        background: #f0f7fc;
        color: #0f766e;
      }

      .hospital-search-security strong {
        display: block;
        color: #16324f;
        font-size: 11px;
        margin-top: 8px;
      }

      .hospital-search-security p {
        color: #64748b;
        font-size: 10px;
        line-height: 1.5;
        margin: 5px 0 0;
      }

      .hospital-search-main {
        width: 100%;
        max-width: 1120px;
        padding: 30px 36px 60px;
      }

      .hospital-search-back {
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

      .hospital-search-back:hover {
        color: #0f4c81;
      }

      .hospital-search-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 22px;
      }

      .hospital-search-eyebrow,
      .hospital-search-label {
        color: #0f766e;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .hospital-search-header h1 {
        margin: 6px 0;
        font-size: 29px;
        letter-spacing: -.03em;
      }

      .hospital-search-header p {
        margin: 0;
        color: #64748b;
        font-size: 13px;
      }

      .hospital-search-status {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #0f766e;
        background: #e8f7f5;
        border: 1px solid #d4eee9;
        padding: 8px 11px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
      }

      .hospital-search-flow {
        display: flex;
        align-items: center;
        margin-bottom: 22px;
        overflow-x: auto;
        max-width: 800px;
      }

      .hospital-flow-item {
        display: flex;
        align-items: center;
        gap: 7px;
        color: #94a3b8;
        font-size: 10px;
        white-space: nowrap;
      }

      .hospital-flow-item > div {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background: #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
      }

      .hospital-flow-item.completed {
        color: #15803d;
      }

      .hospital-flow-item.completed > div {
        background: #ecfdf3;
        color: #15803d;
      }

      .hospital-flow-item.current {
        color: #0f4c81;
        font-weight: 700;
      }

      .hospital-flow-item.current > div {
        background: #0f4c81;
        color: white;
        box-shadow: 0 0 0 4px #eaf4fb;
      }

      .hospital-flow-line {
        width: 48px;
        height: 1px;
        background: #dbe3ea;
        margin: 0 8px;
        flex-shrink: 0;
      }

      .hospital-flow-line.active {
        background: #9fc8df;
      }

      .hospital-search-card,
      .hospital-result {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 15px;
        box-shadow: 0 3px 12px rgba(15,76,129,.045);
      }

      .hospital-search-card {
        padding: 22px;
      }

      .hospital-search-card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-bottom: 18px;
        border-bottom: 1px solid #eef2f6;
      }

      .hospital-search-card-header h2 {
        margin: 5px 0;
        font-size: 18px;
      }

      .hospital-search-card-header p {
        color: #64748b;
        font-size: 11px;
        margin: 0;
      }

      .hospital-search-header-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hospital-input-section {
        margin-top: 20px;
      }

      .hospital-input-section label {
        display: block;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 7px;
      }

      .hospital-search-input-row {
        display: flex;
        gap: 9px;
      }

      .hospital-search-input-wrapper {
        flex: 1;
        height: 45px;
        position: relative;
      }

      .hospital-search-input-wrapper > svg {
        position: absolute;
        left: 13px;
        top: 50%;
        transform: translateY(-50%);
        color: #64748b;
      }

      .hospital-search-input-wrapper input {
        width: 100%;
        height: 100%;
        border: 1px solid #dce4eb;
        border-radius: 9px;
        padding: 0 40px;
        outline: none;
        color: #16324f;
        font-size: 12px;
      }

      .hospital-search-input-wrapper input:focus {
        border-color: #0f4c81;
        box-shadow: 0 0 0 3px rgba(15,76,129,.08);
      }

      .hospital-clear-input {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 25px;
        height: 25px;
        border: none;
        border-radius: 50%;
        background: #f1f5f9;
        color: #64748b;
      }

      .hospital-search-button {
        height: 45px;
        border: none;
        border-radius: 9px;
        background: #0f4c81;
        color: white;
        padding: 0 18px;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 11px;
        font-weight: 700;
        transition: all .2s ease;
      }

      .hospital-search-button:hover {
        background: #0b3b64;
        transform: translateY(-1px);
      }

      .hospital-or-divider {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 20px 0;
      }

      .hospital-or-divider span {
        flex: 1;
        height: 1px;
        background: #edf2f6;
      }

      .hospital-or-divider strong {
        color: #94a3b8;
        font-size: 9px;
      }

      .hospital-scan-button {
        width: 100%;
        border: 1px dashed #a9c8da;
        background: #f7fbfd;
        border-radius: 11px;
        padding: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: left;
        color: #16324f;
        transition: all .2s ease;
      }

      .hospital-scan-button:hover {
        border-color: #0f4c81;
        background: #f0f7fc;
        transform: translateY(-1px);
      }

      .hospital-scan-icon {
        width: 43px;
        height: 43px;
        border-radius: 10px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hospital-scan-button > div:nth-child(2) {
        flex: 1;
      }

      .hospital-scan-button strong,
      .hospital-scan-button span {
        display: block;
      }

      .hospital-scan-button strong {
        font-size: 12px;
      }

      .hospital-scan-button span {
        color: #64748b;
        font-size: 10px;
        margin-top: 3px;
      }

      .hospital-scan-button > svg {
        color: #64748b;
      }

      .hospital-scanner-container {
        border: 1px solid #dbe7ee;
        border-radius: 12px;
        background: #f8fbfd;
        padding: 17px;
      }

      .hospital-scanner-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .hospital-scanner-header h3 {
        margin: 5px 0 0;
        font-size: 15px;
      }

      .hospital-scanner-close {
        border: none;
        background: white;
        color: #64748b;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hospital-qr-reader {
        max-width: 500px;
        margin: 18px auto;
        background: white;
        border-radius: 10px;
        overflow: hidden;
      }

      .hospital-qr-reader video {
        border-radius: 8px;
      }

      .hospital-scanner-help {
        max-width: 500px;
        margin: auto;
        display: flex;
        align-items: center;
        gap: 7px;
        color: #64748b;
        font-size: 9px;
      }

      .hospital-scanner-help svg {
        color: #0f766e;
        flex-shrink: 0;
      }

      .hospital-error {
        margin-top: 15px;
        padding: 14px;
        border: 1px solid #fecaca;
        background: #fef2f2;
        color: #dc2626;
        border-radius: 11px;
        display: flex;
        align-items: flex-start;
        gap: 9px;
      }

      .hospital-error strong,
      .hospital-error span {
        display: block;
      }

      .hospital-error strong {
        font-size: 11px;
      }

      .hospital-error span {
        font-size: 10px;
        color: #7f1d1d;
        margin-top: 3px;
      }

      .hospital-result {
        margin-top: 18px;
        padding: 22px;
        border-color: #cfe7d7;
      }

      .hospital-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 16px;
        border-bottom: 1px solid #eef2f6;
      }

      .hospital-result-title {
        display: flex;
        align-items: center;
        gap: 11px;
      }

      .hospital-result-icon {
        width: 43px;
        height: 43px;
        border-radius: 11px;
        background: #ecfdf3;
        color: #15803d;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hospital-result-title span {
        color: #15803d;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .hospital-result-title h2 {
        margin: 4px 0 0;
        font-size: 18px;
      }

      .hospital-verified-badge {
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

      .hospital-result-patient {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 19px;
      }

      .hospital-patient-avatar {
        width: 52px;
        height: 52px;
        border-radius: 13px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hospital-result-patient span {
        color: #94a3b8;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .07em;
      }

      .hospital-result-patient h3 {
        margin: 3px 0;
        font-size: 17px;
      }

      .hospital-result-patient p {
        margin: 0;
        color: #64748b;
        font-size: 10px;
      }

      .hospital-result-details {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 9px;
        margin-top: 18px;
      }

      .hospital-result-details > div {
        background: #f8fafc;
        border-radius: 9px;
        padding: 11px;
      }

      .hospital-result-details span,
      .hospital-result-details strong {
        display: block;
      }

      .hospital-result-details span {
        color: #94a3b8;
        font-size: 9px;
        margin-bottom: 4px;
      }

      .hospital-result-details strong {
        font-size: 11px;
        word-break: break-word;
      }

      .hospital-result-details strong.status {
        color: #15803d;
      }

      .hospital-referral-info {
        margin-top: 18px;
        padding: 17px;
        border-radius: 11px;
        background: #f8fbfd;
        border: 1px solid #e5edf2;
      }

      .hospital-referral-info-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px solid #e7eef3;
      }

      .hospital-referral-info-header h3 {
        margin: 5px 0 0;
        font-size: 14px;
      }

      .hospital-referral-info-header > svg {
        color: #0f4c81;
      }

      .hospital-info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 12px;
      }

      .hospital-info-grid > div {
        padding: 9px;
        background: white;
        border-radius: 8px;
        border: 1px solid #edf2f5;
      }

      .hospital-info-grid span,
      .hospital-info-grid strong {
        display: block;
      }

      .hospital-info-grid span {
        color: #94a3b8;
        font-size: 9px;
        margin-bottom: 4px;
      }

      .hospital-info-grid strong {
        font-size: 10px;
      }

      .hospital-info-grid strong.normal {
        color: #2563eb;
      }

      .hospital-info-grid strong.urgent {
        color: #c2410c;
      }

      .hospital-info-grid strong.emergency {
        color: #dc2626;
      }

      .hospital-reason {
        grid-column: 1 / -1;
      }

      .hospital-result-security {
        margin-top: 15px;
        padding: 13px;
        border-radius: 10px;
        background: #effaf7;
        border: 1px solid #d5eee8;
        color: #0f766e;
        display: flex;
        gap: 9px;
        align-items: flex-start;
      }

      .hospital-result-security strong {
        display: block;
        color: #16324f;
        font-size: 11px;
      }

      .hospital-result-security p {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 9px;
      }

      .hospital-access-button {
        width: 100%;
        margin-top: 15px;
        height: 45px;
        border: none;
        border-radius: 9px;
        background: #0f4c81;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 700;
        box-shadow: 0 7px 16px rgba(15,76,129,.18);
        transition: all .2s ease;
      }

      .hospital-access-button:hover {
        background: #0b3b64;
        transform: translateY(-1px);
      }

      .hospital-info-banner {
        margin-top: 18px;
        padding: 15px;
        background: #effaf7;
        border: 1px solid #d5eee8;
        border-radius: 11px;
        display: flex;
        gap: 10px;
      }

      .hospital-info-icon {
        color: #0f766e;
        flex-shrink: 0;
      }

      .hospital-info-banner strong {
        display: block;
        font-size: 11px;
      }

      .hospital-info-banner p {
        color: #64748b;
        font-size: 9px;
        line-height: 1.5;
        margin: 4px 0 0;
      }

      @media (max-width: 900px) {

        .hospital-search-sidebar {
          width: 70px;
        }

        .hospital-search-sidebar-title,
        .hospital-search-security {
          display: none;
        }

        .hospital-search-nav {
          justify-content: center;
          padding: 0;
          font-size: 0;
        }

        .hospital-result-details {
          grid-template-columns: 1fr 1fr;
        }

      }

      @media (max-width: 600px) {

        .hospital-search-topbar {
          padding: 0 15px;
        }

        .hospital-search-role {
          display: none;
        }

        .hospital-search-main {
          padding: 25px 15px 45px;
        }

        .hospital-search-header {
          align-items: flex-start;
          gap: 12px;
        }

        .hospital-search-header h1 {
          font-size: 25px;
        }

        .hospital-search-status {
          white-space: nowrap;
        }

        .hospital-search-input-row {
          flex-direction: column;
        }

        .hospital-search-button {
          justify-content: center;
        }

        .hospital-result-details {
          grid-template-columns: 1fr;
        }

        .hospital-info-grid {
          grid-template-columns: 1fr;
        }

        .hospital-reason {
          grid-column: auto;
        }

      }

    `}</style>
  );
}