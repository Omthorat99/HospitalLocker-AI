import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  ClipboardList,
  FileText,
  LockKeyhole,
  Save,
  ShieldCheck,
  Stethoscope,
  UserRound,
  WandSparkles,
} from "lucide-react";

export default function Consultation() {
  const navigate = useNavigate();
  const location = useLocation();

  const referral =
    location.state?.referral ||
    JSON.parse(localStorage.getItem("hospitalLockerReferral") || "null");

  const patient =
    location.state?.patient ||
    (referral
      ? {
          patientId: referral.patientId,
          name: referral.patientName,
          age: referral.age,
          gender: referral.gender,
          phone: referral.phone,
        }
      : {
          patientId: "HL-PAT-001",
          name: "Ramesh",
          age: 42,
          gender: "Male",
          phone: "******4821",
        });

  const [form, setForm] = useState({
    symptoms: "",
    diagnosis: "",
    notes: "",
    followUp: "",
  });

  const [saved, setSaved] = useState(false);

  const initials = useMemo(
    () =>
      patient.name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [patient.name]
  );

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!form.symptoms.trim() || !form.diagnosis.trim()) {
      alert("Please enter symptoms and diagnosis.");
      return;
    }

    const consultation = {
      consultationId: `HL-CON-${Date.now()}`,
      patientId: patient.patientId,
      patientName: patient.name,
      referralId: referral?.referralId || "",
      doctor: "Dr. Medical Officer",
      department: referral?.department || "General Medicine",
      symptoms: form.symptoms,
      diagnosis: form.diagnosis,
      notes: form.notes,
      followUp: form.followUp,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "hospitalLockerConsultation",
      JSON.stringify(consultation)
    );

    setSaved(true);
  };

  if (saved) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>

          <span className="success-label">CONSULTATION SAVED</span>

          <h1>Consultation completed</h1>

          <p>
            The consultation record for <strong>{patient.name}</strong> has
            been saved securely for the next step.
          </p>

          <div className="success-info">
            <div>
              <span>Patient</span>
              <strong>{patient.name}</strong>
            </div>

            <div>
              <span>Referral ID</span>
              <strong>{referral?.referralId || "—"}</strong>
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/doctor/prescription", {
                state: { patient, referral },
              })
            }
          >
            Create Prescription
            <span>→</span>
          </button>

          <button className="secondary-btn" onClick={() => navigate(-1)}>
            Back to Patient
          </button>
        </div>

        <style>{successStyles}</style>
      </div>
    );
  }

  return (
    <div className="consultation-page">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={23} />
          </div>

          <div>
            <div className="brand-name">HospitalLocker AI</div>
            <div className="brand-subtitle">Clinical Continuity Platform</div>
          </div>
        </div>

        <div className="doctor-profile">
          <div className="doctor-avatar">DM</div>
          <div>
            <strong>Dr. Medical Officer</strong>
            <span>Doctor Portal</span>
          </div>
        </div>
      </header>

      <main className="content">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back to Patient Details
        </button>

        <div className="page-heading">
          <div>
            <div className="eyebrow">
              <Stethoscope size={16} />
              DOCTOR CONSULTATION
            </div>

            <h1>Consultation</h1>

            <p>
              Record clinical observations and prepare the patient's
              consultation record.
            </p>
          </div>

          <div className="secure-pill">
            <LockKeyhole size={16} />
            Authorized Session
          </div>
        </div>

        <section className="patient-banner">
          <div className="patient-avatar">{initials}</div>

          <div className="patient-main">
            <span className="small-label">CURRENT PATIENT</span>
            <h2>{patient.name}</h2>

            <div className="patient-meta">
              <span>{patient.patientId}</span>
              <span>•</span>
              <span>{patient.age} years</span>
              <span>•</span>
              <span>{patient.gender}</span>
            </div>
          </div>

          <div className="referral-box">
            <span>Referral ID</span>
            <strong>{referral?.referralId || "HL-REF-2026-00124"}</strong>
          </div>
        </section>

        <div className="layout">
          <section className="form-card">
            <div className="card-header">
              <div className="header-icon">
                <ClipboardList size={21} />
              </div>

              <div>
                <h2>Clinical Assessment</h2>
                <p>Enter information from the current consultation.</p>
              </div>
            </div>

            <div className="field-group">
              <label>
                Symptoms <span>*</span>
              </label>

              <textarea
                value={form.symptoms}
                onChange={(e) => updateField("symptoms", e.target.value)}
                placeholder="Describe the patient's symptoms..."
                rows="5"
              />
            </div>

            <div className="field-group">
              <label>
                Diagnosis <span>*</span>
              </label>

              <textarea
                value={form.diagnosis}
                onChange={(e) => updateField("diagnosis", e.target.value)}
                placeholder="Enter clinical diagnosis..."
                rows="4"
              />
            </div>

            <div className="field-group">
              <label>Clinical Notes</label>

              <textarea
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Additional observations, examination findings or notes..."
                rows="5"
              />
            </div>

            <div className="field-group">
              <label>Follow-up Instructions</label>

              <textarea
                value={form.followUp}
                onChange={(e) => updateField("followUp", e.target.value)}
                placeholder="Enter recommended follow-up..."
                rows="4"
              />
            </div>

            <div className="form-footer">
              <div className="required-note">
                <span>*</span> Required fields
              </div>

              <button className="save-btn" onClick={handleSave}>
                <Save size={18} />
                Save Consultation
              </button>
            </div>
          </section>

          <aside className="side-column">
            <div className="ai-card">
              <div className="ai-title">
                <div className="ai-icon">
                  <WandSparkles size={19} />
                </div>

                <div>
                  <strong>AI Clinical Assistance</strong>
                  <span>Assistance only</span>
                </div>
              </div>

              <p>
                AI can help organize available patient information into a
                concise clinical summary.
              </p>

              <div className="ai-warning">
                <Brain size={16} />
                <span>
                  AI does not diagnose, prescribe, or replace the doctor's
                  clinical judgment.
                </span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-title">
                <FileText size={19} />
                Referral Context
              </div>

              <div className="info-row">
                <span>Department</span>
                <strong>
                  {referral?.department || "General Medicine"}
                </strong>
              </div>

              <div className="info-row">
                <span>Priority</span>
                <strong className="priority">
                  {referral?.priority || "Routine"}
                </strong>
              </div>

              <div className="info-row">
                <span>Status</span>
                <strong>Consultation</strong>
              </div>
            </div>

            <div className="privacy-card">
              <LockKeyhole size={20} />

              <div>
                <strong>Privacy Protected</strong>
                <p>
                  Only authorized patient information is used during this
                  consultation.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

.consultation-page {
  min-height: 100vh;
  background: #f5f9fc;
  color: #16324f;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.topbar {
  height: 72px;
  background: white;
  border-bottom: 1px solid #e2eaf0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 34px;
  position: sticky;
  top: 0;
  z-index: 20;
}

.brand,
.doctor-profile,
.doctor-profile > div,
.card-header,
.ai-title,
.info-card-title,
.privacy-card {
  display: flex;
  align-items: center;
}

.brand {
  gap: 12px;
}

.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #0f4c81;
  color: white;
  display: grid;
  place-items: center;
}

.brand-name {
  font-size: 17px;
  font-weight: 800;
}

.brand-subtitle {
  color: #64748b;
  font-size: 11px;
  margin-top: 2px;
}

.doctor-profile {
  gap: 10px;
}

.doctor-profile > div:last-child {
  flex-direction: column;
  align-items: flex-start;
}

.doctor-profile strong {
  font-size: 13px;
}

.doctor-profile span {
  color: #64748b;
  font-size: 11px;
}

.doctor-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid !important;
  place-items: center;
  font-weight: 800;
}

.content {
  max-width: 1250px;
  margin: 0 auto;
  padding: 30px 24px 60px;
}

.back-btn {
  border: 0;
  background: transparent;
  color: #64748b;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  padding: 5px 0;
}

.back-btn:hover {
  color: #0f4c81;
}

.page-heading {
  margin: 24px 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  color: #0f766e;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-heading h1 {
  font-size: 34px;
  margin: 6px 0;
  letter-spacing: -1px;
}

.page-heading p {
  margin: 0;
  color: #64748b;
}

.secure-pill {
  background: #e8f7f5;
  color: #0f766e;
  border-radius: 999px;
  padding: 9px 13px;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 7px;
}

.patient-banner {
  background: linear-gradient(135deg, #0f4c81, #176b91);
  border-radius: 18px;
  color: white;
  padding: 22px 25px;
  display: flex;
  align-items: center;
  gap: 17px;
  box-shadow: 0 14px 35px rgba(15, 76, 129, .15);
  animation: slideUp .45s ease both;
}

.patient-avatar {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.3);
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 900;
}

.patient-main {
  flex: 1;
}

.small-label {
  font-size: 10px;
  letter-spacing: .1em;
  opacity: .7;
  font-weight: 800;
}

.patient-main h2 {
  margin: 2px 0 5px;
  font-size: 22px;
}

.patient-meta {
  display: flex;
  gap: 8px;
  opacity: .8;
  font-size: 12px;
}

.referral-box {
  border-left: 1px solid rgba(255,255,255,.25);
  padding-left: 25px;
  min-width: 190px;
}

.referral-box span {
  display: block;
  opacity: .7;
  font-size: 11px;
  margin-bottom: 5px;
}

.referral-box strong {
  font-size: 14px;
}

.layout {
  margin-top: 22px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 22px;
  align-items: start;
}

.form-card,
.info-card,
.ai-card,
.privacy-card {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 17px;
  box-shadow: 0 7px 25px rgba(15, 76, 129, .05);
}

.form-card {
  padding: 25px;
}

.card-header {
  gap: 12px;
  padding-bottom: 22px;
  border-bottom: 1px solid #edf2f6;
  margin-bottom: 24px;
}

.header-icon {
  width: 43px;
  height: 43px;
  border-radius: 12px;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
}

.card-header h2 {
  font-size: 18px;
  margin: 0 0 3px;
}

.card-header p {
  color: #64748b;
  font-size: 12px;
  margin: 0;
}

.field-group {
  margin-bottom: 21px;
}

.field-group label {
  display: block;
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 8px;
}

.field-group label span {
  color: #dc2626;
}

textarea {
  width: 100%;
  resize: vertical;
  min-height: 105px;
  border: 1px solid #d9e3ea;
  border-radius: 12px;
  padding: 13px 14px;
  font: inherit;
  font-size: 13px;
  color: #16324f;
  outline: none;
  background: #fbfdff;
  transition: .2s;
}

textarea::placeholder {
  color: #94a3b8;
}

textarea:focus {
  border-color: #0f766e;
  background: white;
  box-shadow: 0 0 0 4px rgba(15,118,110,.08);
}

.form-footer {
  border-top: 1px solid #edf2f6;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.required-note {
  font-size: 11px;
  color: #64748b;
}

.required-note span {
  color: #dc2626;
}

.save-btn,
.primary-btn {
  border: 0;
  background: #0f766e;
  color: white;
  border-radius: 11px;
  padding: 12px 17px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: .2s;
}

.save-btn:hover,
.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(15,118,110,.2);
}

.side-column {
  display: grid;
  gap: 16px;
}

.ai-card {
  padding: 19px;
  background: linear-gradient(145deg, #f2fbfa, #ffffff);
}

.ai-title {
  gap: 10px;
}

.ai-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: #dff4f1;
  color: #0f766e;
  display: grid;
  place-items: center;
}

.ai-title div:last-child {
  display: flex;
  flex-direction: column;
}

.ai-title strong {
  font-size: 13px;
}

.ai-title span {
  color: #0f766e;
  font-size: 10px;
  font-weight: 800;
  margin-top: 2px;
}

.ai-card > p {
  color: #64748b;
  line-height: 1.6;
  font-size: 12px;
}

.ai-warning {
  border-radius: 10px;
  background: #fff8e7;
  color: #8a5a00;
  padding: 10px;
  display: flex;
  gap: 8px;
  font-size: 11px;
  line-height: 1.45;
}

.info-card {
  padding: 19px;
}

.info-card-title {
  gap: 8px;
  font-weight: 800;
  font-size: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #edf2f6;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f8;
  font-size: 12px;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-row span {
  color: #64748b;
}

.info-row strong {
  text-align: right;
}

.priority {
  color: #0f766e;
}

.privacy-card {
  align-items: flex-start;
  gap: 11px;
  padding: 16px;
  color: #0f4c81;
  background: #f8fbfd;
}

.privacy-card > div {
  flex: 1;
}

.privacy-card strong {
  font-size: 12px;
}

.privacy-card p {
  color: #64748b;
  font-size: 11px;
  line-height: 1.5;
  margin: 5px 0 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 850px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .patient-banner {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .referral-box {
    width: 100%;
    border-left: 0;
    border-top: 1px solid rgba(255,255,255,.25);
    padding: 15px 0 0;
  }
}

@media (max-width: 600px) {
  .topbar {
    padding: 0 16px;
  }

  .doctor-profile {
    display: none;
  }

  .content {
    padding: 22px 14px 40px;
  }

  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .page-heading h1 {
    font-size: 28px;
  }

  .form-card {
    padding: 17px;
  }

  .form-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .save-btn {
    width: 100%;
  }
}
`;

const successStyles = `
.success-page {
  min-height: 100vh;
  background: #f5f9fc;
  display: grid;
  place-items: center;
  padding: 24px;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  color: #16324f;
}

.success-card {
  width: min(520px, 100%);
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 22px;
  padding: 38px;
  text-align: center;
  box-shadow: 0 18px 55px rgba(15,76,129,.1);
  animation: successIn .45s ease both;
}

.success-icon {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: #e8f7f5;
  color: #15803d;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
}

.success-label {
  color: #15803d;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .1em;
}

.success-card h1 {
  margin: 8px 0;
  font-size: 28px;
}

.success-card > p {
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

.success-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 24px 0;
}

.success-info div {
  background: #f5f9fc;
  border-radius: 12px;
  padding: 13px;
  text-align: left;
}

.success-info span,
.success-info strong {
  display: block;
}

.success-info span {
  color: #64748b;
  font-size: 10px;
  margin-bottom: 4px;
}

.success-info strong {
  font-size: 12px;
}

.primary-btn,
.secondary-btn {
  width: 100%;
  border-radius: 11px;
  padding: 13px;
  font-weight: 800;
  cursor: pointer;
}

.primary-btn {
  border: 0;
  background: #0f766e;
  color: white;
}

.secondary-btn {
  margin-top: 9px;
  border: 1px solid #d9e3ea;
  background: white;
  color: #64748b;
}

@keyframes successIn {
  from {
    opacity: 0;
    transform: translateY(16px) scale(.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 500px) {
  .success-card {
    padding: 26px 18px;
  }

  .success-info {
    grid-template-columns: 1fr;
  }
}
`;