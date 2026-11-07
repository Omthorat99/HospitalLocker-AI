import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Hospital,
  MapPin,
  QrCode,
  ShieldCheck,
  Stethoscope,
  UserRound,
  AlertCircle,
} from "lucide-react";

export default function CreateReferral() {
  const navigate = useNavigate();
  const location = useLocation();

  const patient = location.state?.patient || {
    patientId: "HL-PAT-001",
    name: "Ramesh",
    age: 42,
    gender: "Male",
    phone: "98XXXXXX42",
  };

  const [department, setDepartment] = useState("General Medicine");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referralId, setReferralId] = useState("");

  const generateReferral = () => {
    if (!reason.trim()) {
      alert("Please enter the reason for referral.");
      return;
    }

    const newReferralId =
      "HL-REF-" + Math.floor(10000 + Math.random() * 90000);

    const referral = {
      referralId: newReferralId,

      patientId: patient.patientId,
      patientName: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,

      source: "Primary Health Centre",
      hospital: "Sassoon General Hospital",

      department,
      reason: reason.trim(),
      priority,
      notes: notes.trim(),

      status: "Pending",
      date: new Date().toLocaleDateString("en-IN"),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "hospitalLockerReferral",
      JSON.stringify(referral)
    );

    setReferralId(newReferralId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="phc-page page-enter">
        <div className="phc-success-wrapper">

          <div className="phc-success-card">

            <div className="phc-success-icon">
              <CheckCircle2 size={42} />
            </div>

            <div className="phc-success-label">
              REFERRAL CREATED
            </div>

            <h1>Digital Referral Ready</h1>

            <p className="phc-success-description">
              The referral has been securely created for{" "}
              <strong>{patient.name}</strong>.
            </p>

            <div className="phc-referral-id-box">
              <span>REFERRAL ID</span>
              <strong>{referralId}</strong>
            </div>

            <div className="phc-flow-mini">

              <div className="flow-item completed">
                <CheckCircle2 size={16} />
                PHC Visit
              </div>

              <div className="flow-line" />

              <div className="flow-item completed">
                <CheckCircle2 size={16} />
                Referral Created
              </div>

              <div className="flow-line" />

              <div className="flow-item">
                <QrCode size={16} />
                QR Ready
              </div>

            </div>

            <div className="phc-success-actions">

              <button
                className="phc-btn phc-btn-primary"
                onClick={() =>
                  navigate("/phc/qr-referral", {
                    state: {
                      referral: JSON.parse(
                        localStorage.getItem(
                          "hospitalLockerReferral"
                        )
                      ),
                    },
                  })
                }
              >
                <QrCode size={18} />
                Generate Referral QR
                <ArrowRight size={16} />
              </button>

              <button
                className="phc-btn phc-btn-secondary"
                onClick={() => navigate("/phc")}
              >
                Back to PHC Dashboard
              </button>

            </div>

            <div className="phc-security-note">
              <ShieldCheck size={17} />

              <span>
                Only the referral ID is represented in the QR.
                Sensitive medical information is not embedded.
              </span>
            </div>

          </div>

        </div>

        <PHCStyles />
      </div>
    );
  }

  return (
    <div className="phc-page page-enter">

      {/* HEADER */}

      <header className="phc-topbar">

        <div className="phc-brand">

          <div className="phc-brand-icon">
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

        <div className="phc-role">
          <div className="phc-role-icon">
            <Stethoscope size={18} />
          </div>

          <div>
            <strong>PHC Staff</strong>
            <span>Primary Health Centre</span>
          </div>
        </div>

      </header>


      <div className="phc-layout">

        {/* SIDEBAR */}

        <aside className="phc-sidebar">

          <div className="phc-sidebar-title">
            PHC PORTAL
          </div>

          <button
            className="phc-nav"
            onClick={() => navigate("/phc")}
          >
            <ClipboardList size={18} />
            Dashboard
          </button>

          <button
            className="phc-nav"
            onClick={() => navigate("/phc/patients")}
          >
            <UserRound size={18} />
            Patient Search
          </button>

          <button
            className="phc-nav active"
          >
            <FileText size={18} />
            Create Referral
          </button>

          <button
            className="phc-nav"
            onClick={() => navigate("/phc/qr-referral")}
          >
            <QrCode size={18} />
            Referral QR
          </button>


          <div className="phc-sidebar-security">

            <ShieldCheck size={18} />

            <strong>
              Secure Referral
            </strong>

            <p>
              Patient information is protected
              through controlled access.
            </p>

          </div>

        </aside>


        {/* MAIN */}

        <main className="phc-main">

          <button
            className="phc-back"
            onClick={() => navigate("/phc/patients")}
          >
            <ArrowLeft size={16} />
            Back to Patient Search
          </button>


          {/* HEADER */}

          <div className="phc-page-header">

            <div>

              <div className="phc-eyebrow">
                PHC WORKFLOW
              </div>

              <h1>
                Create Digital Referral
              </h1>

              <p>
                Refer the patient to the appropriate department
                at the receiving hospital.
              </p>

            </div>

            <div className="phc-step">
              <span>STEP</span>
              <strong>2 / 3</strong>
            </div>

          </div>


          {/* WORKFLOW */}

          <div className="phc-workflow">

            <div className="phc-workflow-item done">
              <div>
                <CheckCircle2 size={17} />
              </div>
              <span>Patient Selected</span>
            </div>

            <div className="phc-workflow-line active" />

            <div className="phc-workflow-item current">
              <div>2</div>
              <span>Create Referral</span>
            </div>

            <div className="phc-workflow-line" />

            <div className="phc-workflow-item">
              <div>3</div>
              <span>Generate QR</span>
            </div>

          </div>


          <div className="phc-grid">

            {/* LEFT */}

            <section>

              {/* PATIENT CARD */}

              <div className="phc-card">

                <div className="phc-card-header">

                  <div>
                    <span className="phc-card-label">
                      SELECTED PATIENT
                    </span>

                    <h2>
                      Patient Information
                    </h2>
                  </div>

                  <div className="phc-verified">
                    <CheckCircle2 size={14} />
                    Verified
                  </div>

                </div>


                <div className="patient-profile">

                  <div className="patient-avatar">
                    <UserRound size={25} />
                  </div>

                  <div className="patient-main-info">

                    <h3>
                      {patient.name}
                    </h3>

                    <span>
                      Patient ID: {patient.patientId}
                    </span>

                  </div>

                </div>


                <div className="patient-details">

                  <div>
                    <span>Age</span>
                    <strong>{patient.age} years</strong>
                  </div>

                  <div>
                    <span>Gender</span>
                    <strong>{patient.gender}</strong>
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>{patient.phone}</strong>
                  </div>

                </div>

              </div>


              {/* REFERRAL FORM */}

              <div className="phc-card">

                <div className="phc-card-header">

                  <div>
                    <span className="phc-card-label">
                      REFERRAL DETAILS
                    </span>

                    <h2>
                      Treatment Referral
                    </h2>
                  </div>

                  <FileText
                    size={21}
                    className="phc-header-icon"
                  />

                </div>


                {/* DEPARTMENT */}

                <div className="phc-form-group">

                  <label>
                    Receiving Department
                  </label>

                  <div className="phc-input-wrapper">

                    <Stethoscope size={17} />

                    <select
                      value={department}
                      onChange={(e) =>
                        setDepartment(e.target.value)
                      }
                    >
                      <option>General Medicine</option>
                      <option>Cardiology</option>
                      <option>Orthopedics</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                      <option>General Surgery</option>
                      <option>Emergency Medicine</option>
                    </select>

                  </div>

                </div>


                {/* REASON */}

                <div className="phc-form-group">

                  <label>
                    Reason for Referral
                    <span className="required">*</span>
                  </label>

                  <div className="phc-textarea-wrapper">

                    <FileText size={17} />

                    <textarea
                      value={reason}
                      onChange={(e) =>
                        setReason(e.target.value)
                      }
                      placeholder="Describe the patient's condition and reason for referral..."
                    />

                  </div>

                  <small>
                    Provide relevant clinical information for
                    the receiving healthcare provider.
                  </small>

                </div>


                {/* PRIORITY */}

                <div className="phc-form-group">

                  <label>
                    Referral Priority
                  </label>

                  <div className="priority-options">

                    {["Normal", "Urgent", "Emergency"].map(
                      (option) => (

                        <button
                          type="button"
                          key={option}
                          className={
                            priority === option
                              ? `priority-option selected ${option.toLowerCase()}`
                              : `priority-option ${option.toLowerCase()}`
                          }
                          onClick={() =>
                            setPriority(option)
                          }
                        >

                          <span className="priority-dot" />

                          {option}

                        </button>

                      )
                    )}

                  </div>

                </div>


                {/* NOTES */}

                <div className="phc-form-group">

                  <label>
                    Additional Notes
                    <span className="optional">
                      Optional
                    </span>
                  </label>

                  <textarea
                    className="plain-textarea"
                    value={notes}
                    onChange={(e) =>
                      setNotes(e.target.value)
                    }
                    placeholder="Add any additional information for the receiving doctor..."
                  />

                </div>

              </div>

            </section>


            {/* RIGHT */}

            <aside>

              {/* DESTINATION */}

              <div className="phc-card destination-card">

                <div className="phc-card-label">
                  RECEIVING FACILITY
                </div>

                <div className="hospital-icon">
                  <Hospital size={24} />
                </div>

                <h2>
                  Sassoon General Hospital
                </h2>

                <div className="destination-detail">
                  <MapPin size={15} />
                  Pune, Maharashtra
                </div>

                <div className="destination-detail">
                  <Building2 size={15} />
                  Government General Hospital
                </div>

                <div className="destination-status">
                  <span />
                  Referral destination available
                </div>

              </div>


              {/* PREVIEW */}

              <div className="phc-card preview-card">

                <div className="phc-card-label">
                  REFERRAL PREVIEW
                </div>

                <div className="preview-id">
                  <span>Referral ID</span>
                  <strong>
                    Generated after submission
                  </strong>
                </div>

                <div className="preview-row">
                  <span>Patient</span>
                  <strong>{patient.name}</strong>
                </div>

                <div className="preview-row">
                  <span>Department</span>
                  <strong>{department}</strong>
                </div>

                <div className="preview-row">
                  <span>Priority</span>
                  <strong className={priority.toLowerCase()}>
                    {priority}
                  </strong>
                </div>

              </div>


              {/* PRIVACY */}

              <div className="phc-privacy">

                <ShieldCheck size={19} />

                <div>
                  <strong>
                    Privacy & Security
                  </strong>

                  <p>
                    The referral QR contains only a secure
                    referral identifier. Medical records are
                    never embedded directly in the QR.
                  </p>
                </div>

              </div>


              {/* CREATE BUTTON */}

              <button
                className="phc-create-button"
                onClick={generateReferral}
              >
                <CheckCircle2 size={19} />
                Create Digital Referral
                <ArrowRight size={18} />
              </button>

              <div className="phc-form-note">
                <AlertCircle size={14} />
                Please verify the referral details before
                creating the referral.
              </div>

            </aside>

          </div>

        </main>

      </div>

      <PHCStyles />

    </div>
  );
}


function PHCStyles() {
  return (
    <style>{`

      .phc-page {
        min-height: 100vh;
        background: #f5f9fc;
        color: #16324f;
        font-family: Inter, Arial, sans-serif;
      }

      .phc-topbar {
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

      .phc-brand {
        display: flex;
        align-items: center;
        gap: 11px;
      }

      .phc-brand-icon {
        width: 40px;
        height: 40px;
        border-radius: 11px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .phc-brand strong {
        display: block;
        font-size: 18px;
        font-weight: 800;
      }

      .phc-brand strong span {
        color: #0f766e;
      }

      .phc-brand small {
        display: block;
        color: #64748b;
        font-size: 10px;
        margin-top: 2px;
      }

      .phc-role {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .phc-role-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #e8f7f5;
        color: #0f766e;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .phc-role strong,
      .phc-role span {
        display: block;
      }

      .phc-role strong {
        font-size: 12px;
      }

      .phc-role span {
        font-size: 10px;
        color: #64748b;
        margin-top: 2px;
      }

      .phc-layout {
        display: flex;
        min-height: calc(100vh - 72px);
      }

      .phc-sidebar {
        width: 235px;
        background: white;
        border-right: 1px solid #e2e8f0;
        padding: 24px 15px;
        flex-shrink: 0;
      }

      .phc-sidebar-title {
        font-size: 10px;
        color: #94a3b8;
        font-weight: 700;
        letter-spacing: .08em;
        margin-bottom: 12px;
      }

      .phc-nav {
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

      .phc-nav:hover {
        background: #f1f7fb;
        color: #0f4c81;
        transform: translateX(2px);
      }

      .phc-nav.active {
        background: #eaf4fb;
        color: #0f4c81;
        font-weight: 700;
      }

      .phc-sidebar-security {
        margin-top: 30px;
        padding: 14px;
        border-radius: 11px;
        background: #f0f7fc;
        color: #0f766e;
      }

      .phc-sidebar-security strong {
        display: block;
        color: #16324f;
        font-size: 11px;
        margin-top: 8px;
      }

      .phc-sidebar-security p {
        color: #64748b;
        font-size: 10px;
        line-height: 1.5;
        margin: 5px 0 0;
      }

      .phc-main {
        width: 100%;
        max-width: 1250px;
        padding: 30px 36px 60px;
      }

      .phc-back {
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

      .phc-back:hover {
        color: #0f4c81;
      }

      .phc-page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 22px;
      }

      .phc-eyebrow,
      .phc-card-label {
        color: #0f766e;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .phc-page-header h1 {
        margin: 6px 0 6px;
        font-size: 29px;
        letter-spacing: -.03em;
      }

      .phc-page-header p {
        margin: 0;
        color: #64748b;
        font-size: 13px;
      }

      .phc-step {
        text-align: right;
      }

      .phc-step span {
        display: block;
        color: #94a3b8;
        font-size: 9px;
        font-weight: 700;
      }

      .phc-step strong {
        display: block;
        color: #0f4c81;
        font-size: 17px;
        margin-top: 2px;
      }

      .phc-workflow {
        display: flex;
        align-items: center;
        margin-bottom: 22px;
        max-width: 700px;
      }

      .phc-workflow-item {
        display: flex;
        align-items: center;
        gap: 7px;
        color: #94a3b8;
        font-size: 10px;
        white-space: nowrap;
      }

      .phc-workflow-item > div {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background: #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
      }

      .phc-workflow-item.done {
        color: #15803d;
      }

      .phc-workflow-item.done > div {
        background: #ecfdf3;
        color: #15803d;
      }

      .phc-workflow-item.current {
        color: #0f4c81;
        font-weight: 700;
      }

      .phc-workflow-item.current > div {
        background: #0f4c81;
        color: white;
        box-shadow: 0 0 0 4px #eaf4fb;
      }

      .phc-workflow-line {
        height: 1px;
        background: #dbe3ea;
        width: 55px;
        margin: 0 9px;
      }

      .phc-workflow-line.active {
        background: #8fc3df;
      }

      .phc-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.6fr) minmax(290px, .8fr);
        gap: 18px;
      }

      .phc-grid section,
      .phc-grid aside {
        display: flex;
        flex-direction: column;
        gap: 17px;
      }

      .phc-card {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 3px 12px rgba(15,76,129,.045);
        transition: all .2s ease;
      }

      .phc-card:hover {
        box-shadow: 0 9px 25px rgba(15,76,129,.08);
      }

      .phc-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 15px;
        border-bottom: 1px solid #eef2f6;
        margin-bottom: 17px;
      }

      .phc-card-header h2 {
        margin: 5px 0 0;
        font-size: 17px;
        letter-spacing: -.02em;
      }

      .phc-header-icon {
        color: #0f4c81;
      }

      .phc-verified {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #15803d;
        background: #ecfdf3;
        padding: 6px 9px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
      }

      .patient-profile {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .patient-avatar {
        width: 50px;
        height: 50px;
        border-radius: 13px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .patient-main-info h3 {
        margin: 0 0 4px;
        font-size: 16px;
      }

      .patient-main-info span {
        color: #64748b;
        font-size: 10px;
      }

      .patient-details {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 17px;
      }

      .patient-details > div {
        padding: 11px;
        background: #f8fafc;
        border-radius: 9px;
      }

      .patient-details span,
      .patient-details strong {
        display: block;
      }

      .patient-details span {
        color: #94a3b8;
        font-size: 9px;
        margin-bottom: 4px;
      }

      .patient-details strong {
        font-size: 11px;
      }

      .phc-form-group {
        margin-bottom: 19px;
      }

      .phc-form-group:last-child {
        margin-bottom: 0;
      }

      .phc-form-group label {
        display: block;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 7px;
      }

      .required {
        color: #dc2626;
        margin-left: 3px;
      }

      .optional {
        color: #94a3b8;
        font-weight: 400;
        margin-left: 6px;
      }

      .phc-input-wrapper {
        position: relative;
      }

      .phc-input-wrapper > svg {
        position: absolute;
        left: 13px;
        top: 50%;
        transform: translateY(-50%);
        color: #64748b;
        pointer-events: none;
      }

      .phc-input-wrapper select {
        width: 100%;
        height: 43px;
        border: 1px solid #dce4eb;
        border-radius: 9px;
        padding: 0 13px 0 39px;
        background: white;
        color: #16324f;
        outline: none;
        font-size: 12px;
      }

      .phc-input-wrapper select:focus {
        border-color: #0f4c81;
        box-shadow: 0 0 0 3px rgba(15,76,129,.08);
      }

      .phc-textarea-wrapper {
        position: relative;
      }

      .phc-textarea-wrapper > svg {
        position: absolute;
        left: 13px;
        top: 14px;
        color: #64748b;
      }

      .phc-textarea-wrapper textarea {
        width: 100%;
        min-height: 105px;
        resize: vertical;
        border: 1px solid #dce4eb;
        border-radius: 9px;
        padding: 12px 13px 12px 39px;
        outline: none;
        font-size: 12px;
        color: #16324f;
      }

      .phc-textarea-wrapper textarea:focus,
      .plain-textarea:focus {
        border-color: #0f4c81;
        box-shadow: 0 0 0 3px rgba(15,76,129,.08);
      }

      .phc-form-group small {
        display: block;
        color: #94a3b8;
        font-size: 9px;
        margin-top: 5px;
      }

      .priority-options {
        display: flex;
        gap: 8px;
      }

      .priority-option {
        border: 1px solid #dce4eb;
        background: white;
        color: #64748b;
        border-radius: 9px;
        padding: 9px 13px;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 11px;
        transition: all .2s ease;
      }

      .priority-option:hover {
        transform: translateY(-1px);
      }

      .priority-option.selected.normal {
        background: #eff6ff;
        border-color: #93c5fd;
        color: #1d4ed8;
      }

      .priority-option.selected.urgent {
        background: #fff7ed;
        border-color: #fdba74;
        color: #c2410c;
      }

      .priority-option.selected.emergency {
        background: #fef2f2;
        border-color: #fca5a5;
        color: #dc2626;
      }

      .priority-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #cbd5e1;
      }

      .selected.normal .priority-dot {
        background: #2563eb;
      }

      .selected.urgent .priority-dot {
        background: #f97316;
      }

      .selected.emergency .priority-dot {
        background: #dc2626;
      }

      .plain-textarea {
        width: 100%;
        min-height: 85px;
        border: 1px solid #dce4eb;
        border-radius: 9px;
        padding: 12px;
        resize: vertical;
        outline: none;
        font-size: 12px;
      }

      .destination-card {
        position: relative;
        overflow: hidden;
      }

      .destination-card:before {
        content: "";
        position: absolute;
        width: 110px;
        height: 110px;
        right: -45px;
        top: -45px;
        border-radius: 50%;
        background: #e8f7f5;
      }

      .hospital-icon {
        width: 47px;
        height: 47px;
        border-radius: 12px;
        background: #eaf4fb;
        color: #0f4c81;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 13px 0;
        position: relative;
      }

      .destination-card h2 {
        font-size: 16px;
        margin: 0 0 10px;
      }

      .destination-detail {
        display: flex;
        align-items: center;
        gap: 7px;
        color: #64748b;
        font-size: 10px;
        margin-top: 7px;
      }

      .destination-status {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-top: 16px;
        padding-top: 13px;
        border-top: 1px solid #eef2f6;
        color: #15803d;
        font-size: 10px;
        font-weight: 600;
      }

      .destination-status span {
        width: 7px;
        height: 7px;
        background: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 0 4px #dcfce7;
      }

      .preview-id {
        margin-top: 14px;
        padding: 12px;
        background: #f8fafc;
        border-radius: 9px;
      }

      .preview-id span,
      .preview-id strong {
        display: block;
      }

      .preview-id span {
        font-size: 9px;
        color: #94a3b8;
      }

      .preview-id strong {
        font-size: 11px;
        margin-top: 4px;
        color: #0f4c81;
      }

      .preview-row {
        display: flex;
        justify-content: space-between;
        padding: 11px 0;
        border-bottom: 1px solid #f1f5f9;
        font-size: 10px;
      }

      .preview-row span {
        color: #64748b;
      }

      .preview-row strong.normal {
        color: #2563eb;
      }

      .preview-row strong.urgent {
        color: #c2410c;
      }

      .preview-row strong.emergency {
        color: #dc2626;
      }

      .phc-privacy {
        display: flex;
        gap: 10px;
        padding: 14px;
        background: #effaf7;
        border: 1px solid #d5eee8;
        border-radius: 11px;
        color: #0f766e;
      }

      .phc-privacy strong {
        display: block;
        color: #16324f;
        font-size: 11px;
      }

      .phc-privacy p {
        margin: 5px 0 0;
        color: #64748b;
        font-size: 9px;
        line-height: 1.5;
      }

      .phc-create-button {
        border: none;
        background: #0f4c81;
        color: white;
        border-radius: 10px;
        padding: 13px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 700;
        box-shadow: 0 7px 16px rgba(15,76,129,.2);
        transition: all .2s ease;
      }

      .phc-create-button:hover {
        background: #0b3b64;
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(15,76,129,.24);
      }

      .phc-form-note {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        color: #94a3b8;
        font-size: 9px;
        line-height: 1.5;
      }

      /* SUCCESS */

      .phc-success-wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
        background:
          radial-gradient(
            circle at top right,
            #e6f5f7,
            transparent 35%
          ),
          #f5f9fc;
      }

      .phc-success-card {
        width: min(650px, 100%);
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        padding: 38px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(15,76,129,.11);
        animation: successCardIn .45s ease-out;
      }

      @keyframes successCardIn {
        from {
          opacity: 0;
          transform: translateY(15px) scale(.98);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .phc-success-icon {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        background: #ecfdf3;
        color: #15803d;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 18px;
        animation: successPop .5s ease-out;
      }

      @keyframes successPop {
        from {
          transform: scale(.5);
          opacity: 0;
        }

        70% {
          transform: scale(1.08);
        }

        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      .phc-success-label {
        color: #15803d;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .1em;
      }

      .phc-success-card h1 {
        margin: 7px 0;
        font-size: 27px;
      }

      .phc-success-description {
        color: #64748b;
        font-size: 13px;
        margin: 0;
      }

      .phc-referral-id-box {
        margin: 24px 0;
        padding: 17px;
        background: #f0f7fc;
        border: 1px solid #d6e9f5;
        border-radius: 12px;
      }

      .phc-referral-id-box span {
        display: block;
        color: #64748b;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .08em;
      }

      .phc-referral-id-box strong {
        display: block;
        margin-top: 6px;
        color: #0f4c81;
        font-size: 23px;
        letter-spacing: .04em;
      }

      .phc-flow-mini {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 25px 0;
      }

      .flow-item {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #94a3b8;
        font-size: 9px;
        font-weight: 600;
      }

      .flow-item.completed {
        color: #15803d;
      }

      .flow-line {
        width: 45px;
        height: 1px;
        background: #dbe3ea;
        margin: 0 8px;
      }

      .phc-success-actions {
        display: flex;
        gap: 9px;
        justify-content: center;
      }

      .phc-btn {
        border: none;
        border-radius: 9px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 11px;
        font-weight: 700;
      }

      .phc-btn-primary {
        background: #0f4c81;
        color: white;
      }

      .phc-btn-secondary {
        background: #edf2f7;
        color: #475569;
      }

      .phc-security-note {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #eef2f6;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 7px;
        color: #64748b;
        font-size: 9px;
      }

      @media (max-width: 900px) {

        .phc-grid {
          grid-template-columns: 1fr;
        }

        .phc-sidebar {
          width: 70px;
        }

        .phc-sidebar-title,
        .phc-nav:not(.active)::after,
        .phc-nav {
          font-size: 0;
        }

        .phc-nav {
          justify-content: center;
          padding: 0;
        }

        .phc-sidebar-security {
          display: none;
        }

      }

      @media (max-width: 600px) {

        .phc-topbar {
          padding: 0 15px;
        }

        .phc-role {
          display: none;
        }

        .phc-main {
          padding: 24px 15px 45px;
        }

        .phc-page-header h1 {
          font-size: 24px;
        }

        .phc-workflow {
          overflow-x: auto;
        }

        .patient-details {
          grid-template-columns: 1fr;
        }

        .priority-options {
          flex-direction: column;
        }

        .phc-success-card {
          padding: 25px 18px;
        }

        .phc-success-actions {
          flex-direction: column;
        }

        .phc-flow-mini {
          overflow-x: auto;
          justify-content: flex-start;
        }

      }

    `}</style>
  );
}