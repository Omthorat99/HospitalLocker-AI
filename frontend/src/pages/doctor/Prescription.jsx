import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Plus,
  Save,
  ShieldCheck,
  Stethoscope,
  Trash2,
  UserRound,
} from "lucide-react";

export default function Prescription() {
  const navigate = useNavigate();
  const location = useLocation();

  const referral =
    location.state?.referral ||
    JSON.parse(localStorage.getItem("hospitalLockerReferral") || "null");

  const consultation =
    JSON.parse(
      localStorage.getItem("hospitalLockerConsultation") || "null"
    );

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

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ]);

  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState(
    consultation?.followUp || ""
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (consultation?.followUp) {
      setFollowUp(consultation.followUp);
    }
  }, [consultation?.followUp]);

  const updateMedicine = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((medicine, i) =>
        i === index
          ? { ...medicine, [field]: value }
          : medicine
      )
    );
  };

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) return;

    setMedicines((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    const validMedicines = medicines.filter(
      (medicine) =>
        medicine.name.trim() &&
        medicine.dosage.trim() &&
        medicine.frequency.trim() &&
        medicine.duration.trim()
    );

    if (validMedicines.length === 0) {
      alert(
        "Please add at least one medicine with name, dosage, frequency and duration."
      );
      return;
    }

    const prescription = {
      prescriptionId: `HL-RX-${Date.now()}`,
      patientId: patient.patientId,
      patientName: patient.name,
      referralId: referral?.referralId || "",
      doctor: "Dr. Medical Officer",
      department: referral?.department || "General Medicine",
      date: new Date().toISOString().split("T")[0],

      medicines: validMedicines,

      advice,
      followUp,

      consultationId: consultation?.consultationId || "",
      diagnosis: consultation?.diagnosis || "",
      symptoms: consultation?.symptoms || "",

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "hospitalLockerPrescription",
      JSON.stringify(prescription)
    );

    if (referral) {
      const updatedReferral = {
        ...referral,
        status: "Completed",
      };

      localStorage.setItem(
        "hospitalLockerReferral",
        JSON.stringify(updatedReferral)
      );
    }

    setSaved(true);
  };

  if (saved) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle2 size={48} />
          </div>

          <span className="success-label">
            PRESCRIPTION SAVED
          </span>

          <h1>Prescription created</h1>

          <p>
            The prescription for{" "}
            <strong>{patient.name}</strong> has been saved to
            the patient's Health Locker.
          </p>

          <div className="success-info">
            <div>
              <span>Patient</span>
              <strong>{patient.name}</strong>
            </div>

            <div>
              <span>Prescription ID</span>
              <strong>
                HL-RX-{new Date().getTime().toString().slice(-6)}
              </strong>
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/patient/health-locker")}
          >
            Open Patient Health Locker
            <span>→</span>
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/doctor")}
          >
            Return to Doctor Dashboard
          </button>
        </div>

        <style>{successStyles}</style>
      </div>
    );
  }

  return (
    <div className="prescription-page">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={23} />
          </div>

          <div>
            <div className="brand-name">
              HospitalLocker AI
            </div>
            <div className="brand-subtitle">
              Clinical Continuity Platform
            </div>
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
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back to Consultation
        </button>

        <div className="page-heading">
          <div>
            <div className="eyebrow">
              <Stethoscope size={16} />
              DOCTOR PORTAL
            </div>

            <h1>Create Prescription</h1>

            <p>
              Prepare the patient's prescription and follow-up
              instructions.
            </p>
          </div>

          <div className="secure-pill">
            <LockKeyhole size={16} />
            Authorized Session
          </div>
        </div>

        <section className="patient-banner">
          <div className="patient-avatar">
            {patient.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="patient-main">
            <span className="small-label">
              PRESCRIPTION FOR
            </span>

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
            <strong>
              {referral?.referralId ||
                "HL-REF-2026-00124"}
            </strong>
          </div>
        </section>

        <div className="layout">
          <section className="form-card">
            <div className="card-header">
              <div className="header-icon">
                <FileText size={21} />
              </div>

              <div>
                <h2>Prescription</h2>
                <p>
                  Add medicines prescribed during this
                  consultation.
                </p>
              </div>
            </div>

            {medicines.map((medicine, index) => (
              <div className="medicine-card" key={index}>
                <div className="medicine-header">
                  <div>
                    <span className="medicine-number">
                      MEDICINE {index + 1}
                    </span>

                    <strong>
                      {medicine.name ||
                        "New Medicine"}
                    </strong>
                  </div>

                  {medicines.length > 1 && (
                    <button
                      className="delete-btn"
                      onClick={() =>
                        removeMedicine(index)
                      }
                      title="Remove medicine"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>

                <div className="medicine-grid">
                  <div className="field-group">
                    <label>
                      Medicine Name <span>*</span>
                    </label>

                    <input
                      value={medicine.name}
                      onChange={(e) =>
                        updateMedicine(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Paracetamol"
                    />
                  </div>

                  <div className="field-group">
                    <label>
                      Dosage <span>*</span>
                    </label>

                    <input
                      value={medicine.dosage}
                      onChange={(e) =>
                        updateMedicine(
                          index,
                          "dosage",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 500 mg"
                    />
                  </div>

                  <div className="field-group">
                    <label>
                      Frequency <span>*</span>
                    </label>

                    <input
                      value={medicine.frequency}
                      onChange={(e) =>
                        updateMedicine(
                          index,
                          "frequency",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Twice daily"
                    />
                  </div>

                  <div className="field-group">
                    <label>
                      Duration <span>*</span>
                    </label>

                    <input
                      value={medicine.duration}
                      onChange={(e) =>
                        updateMedicine(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 5 days"
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label>Instructions</label>

                  <input
                    value={medicine.instructions}
                    onChange={(e) =>
                      updateMedicine(
                        index,
                        "instructions",
                        e.target.value
                      )
                    }
                    placeholder="e.g. After food"
                  />
                </div>
              </div>
            ))}

            <button
              className="add-medicine-btn"
              onClick={addMedicine}
            >
              <Plus size={17} />
              Add Another Medicine
            </button>

            <div className="section-divider" />

            <div className="field-group">
              <label>Doctor's Advice</label>

              <textarea
                value={advice}
                onChange={(e) =>
                  setAdvice(e.target.value)
                }
                placeholder="Enter dietary advice, precautions or other instructions..."
                rows="4"
              />
            </div>

            <div className="field-group">
              <label>Follow-up</label>

              <textarea
                value={followUp}
                onChange={(e) =>
                  setFollowUp(e.target.value)
                }
                placeholder="Enter follow-up date or instructions..."
                rows="4"
              />
            </div>

            <div className="form-footer">
              <div className="required-note">
                <span>*</span> Required medicine fields
              </div>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                <Save size={18} />
                Save Prescription
              </button>
            </div>
          </section>

          <aside className="side-column">
            <div className="summary-card">
              <div className="summary-title">
                <UserRound size={19} />
                Patient Summary
              </div>

              <div className="summary-row">
                <span>Patient</span>
                <strong>{patient.name}</strong>
              </div>

              <div className="summary-row">
                <span>Patient ID</span>
                <strong>{patient.patientId}</strong>
              </div>

              <div className="summary-row">
                <span>Department</span>
                <strong>
                  {referral?.department ||
                    "General Medicine"}
                </strong>
              </div>

              <div className="summary-row">
                <span>Diagnosis</span>
                <strong>
                  {consultation?.diagnosis ||
                    "Not recorded"}
                </strong>
              </div>
            </div>

            <div className="consultation-card">
              <div className="consultation-title">
                <FileText size={18} />
                Consultation Record
              </div>

              <div className="consultation-item">
                <span>Symptoms</span>
                <p>
                  {consultation?.symptoms ||
                    "No symptoms recorded."}
                </p>
              </div>

              <div className="consultation-item">
                <span>Clinical Notes</span>
                <p>
                  {consultation?.notes ||
                    "No additional notes."}
                </p>
              </div>
            </div>

            <div className="privacy-card">
              <LockKeyhole size={20} />

              <div>
                <strong>Privacy Protected</strong>

                <p>
                  The prescription is linked to the patient's
                  referral and Health Locker record.
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

.prescription-page {
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

.brand {
  display: flex;
  align-items: center;
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
  display: flex;
  align-items: center;
  gap: 10px;
}

.doctor-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
}

.doctor-profile > div:last-child {
  display: flex;
  flex-direction: column;
}

.doctor-profile strong {
  font-size: 13px;
}

.doctor-profile span {
  color: #64748b;
  font-size: 11px;
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
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.eyebrow {
  color: #0f766e;
  font-size: 11px;
  font-weight: 900;
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
  color: #64748b;
  margin: 0;
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
.summary-card,
.consultation-card,
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
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 22px;
  border-bottom: 1px solid #edf2f6;
  margin-bottom: 22px;
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

.medicine-card {
  border: 1px solid #dfe8ee;
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 14px;
  background: #fbfdff;
  animation: slideUp .35s ease both;
}

.medicine-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
}

.medicine-header > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.medicine-number {
  color: #0f766e;
  font-size: 9px;
  letter-spacing: .1em;
  font-weight: 900;
}

.medicine-header strong {
  font-size: 14px;
}

.delete-btn {
  border: 0;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: #fff1f2;
  color: #be123c;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.delete-btn:hover {
  background: #ffe4e6;
}

.medicine-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.2fr 1fr;
  gap: 12px;
}

.field-group {
  margin-bottom: 17px;
}

.field-group label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 7px;
}

.field-group label span {
  color: #dc2626;
}

input,
textarea {
  width: 100%;
  border: 1px solid #d9e3ea;
  border-radius: 10px;
  padding: 11px 12px;
  font: inherit;
  font-size: 12px;
  color: #16324f;
  background: white;
  outline: none;
  transition: .2s;
}

input:focus,
textarea:focus {
  border-color: #0f766e;
  box-shadow: 0 0 0 4px rgba(15,118,110,.08);
}

input::placeholder,
textarea::placeholder {
  color: #94a3b8;
}

textarea {
  resize: vertical;
}

.add-medicine-btn {
  border: 1px dashed #a8c8d6;
  background: #f7fbfd;
  color: #0f4c81;
  width: 100%;
  padding: 12px;
  border-radius: 11px;
  cursor: pointer;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
}

.add-medicine-btn:hover {
  background: #eaf4fb;
  border-color: #0f4c81;
}

.section-divider {
  height: 1px;
  background: #edf2f6;
  margin: 25px 0;
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
  color: #64748b;
  font-size: 11px;
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

.summary-card,
.consultation-card {
  padding: 19px;
}

.summary-title,
.consultation-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #edf2f6;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f8;
  font-size: 11px;
}

.summary-row:last-child {
  border-bottom: 0;
}

.summary-row span {
  color: #64748b;
}

.summary-row strong {
  text-align: right;
  max-width: 170px;
}

.consultation-item {
  padding-top: 14px;
}

.consultation-item span {
  display: block;
  color: #64748b;
  font-size: 10px;
  font-weight: 800;
  margin-bottom: 5px;
}

.consultation-item p {
  font-size: 11px;
  line-height: 1.55;
  margin: 0;
}

.privacy-card {
  display: flex;
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

@media (max-width: 950px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .medicine-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 700px) {
  .patient-banner {
    flex-wrap: wrap;
  }

  .referral-box {
    width: 100%;
    border-left: 0;
    border-top: 1px solid rgba(255,255,255,.25);
    padding: 14px 0 0;
  }

  .medicine-grid {
    grid-template-columns: 1fr;
  }

  .form-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .save-btn {
    width: 100%;
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