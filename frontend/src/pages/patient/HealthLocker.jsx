import React, { useEffect, useState } from "react";
import AIAssistant from "../../components/AIAssistant";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  LockKeyhole,
  Pill,
  Search,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

export default function HealthLocker() {
  console.log("HEALTH LOCKER COMPONENT LOADED");
  const [activeTab, setActiveTab] = useState("prescription");
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const storedPrescription = localStorage.getItem(
      "hospitalLockerPrescription"
    );

    if (storedPrescription) {
      try {
        setPrescription(JSON.parse(storedPrescription));
      } catch {
        setPrescription(null);
      }
    }
  }, []);

  const medicines = prescription?.medicines || [];

  const documents = [
    {
      type: "Prescription",
      title: prescription
        ? "Latest Doctor Prescription"
        : "Prescription",
      date: prescription?.date || "Not available",
      icon: Pill,
      status: prescription ? "Available" : "Pending",
    },
    {
      type: "Referral",
      title: "Digital Hospital Referral",
      date: "2026-09-03",
      icon: ClipboardList,
      status: "Available",
    },
    {
      type: "Consultation",
      title: "Doctor Consultation Record",
      date: prescription?.date || "2026-09-03",
      icon: Stethoscope,
      status: prescription
        ? "Available"
        : "Pending",
    },
    {
      type: "Medical Record",
      title: "Medical History",
      date: "Previous records",
      icon: Activity,
      status: "Available",
    },
  ];

  return (
    <div className="locker-page">
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
              Patient Health Locker
            </div>
          </div>
        </div>

        <div className="patient-profile">
          <div className="profile-avatar">
            <UserRound size={18} />
          </div>

          <div>
            <strong>Ramesh</strong>
            <span>HL-PAT-001</span>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <div>
            <div className="eyebrow">
              <LockKeyhole size={15} />
              YOUR SECURE HEALTH SPACE
            </div>

            <h1>Health Locker</h1>

            <p>
              Your important healthcare records, prescriptions and
              referral information — connected in one place.
            </p>
          </div>

          <div className="security-badge">
            <ShieldCheck size={18} />
            Authorized & Protected
          </div>
        </section>

        <section className="patient-card">
          <div className="patient-avatar">R</div>

          <div className="patient-details">
            <span>HEALTH RECORD FOR</span>
            <h2>Ramesh</h2>

            <div className="patient-meta">
              <span>Patient ID: HL-PAT-001</span>
              <span>•</span>
              <span>42 years</span>
              <span>•</span>
              <span>Male</span>
            </div>
          </div>

          <div className="locker-status">
            <CheckCircle2 size={17} />
            Locker Active
          </div>
        </section>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FileText size={19} />
            </div>

            <div>
              <strong>{documents.length}</strong>
              <span>Health Records</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon teal">
              <Pill size={19} />
            </div>

            <div>
              <strong>{medicines.length}</strong>
              <span>Current Medicines</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <strong>
                {prescription ? "Complete" : "Active"}
              </strong>
              <span>Latest Journey</span>
            </div>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <h2>My Health Records</h2>
            <p>Access your healthcare information anytime.</p>
          </div>

          <div className="search-box">
            <Search size={16} />
            <input placeholder="Search records..." />
          </div>
        </div>

        <div className="tabs">
          <button
            className={
              activeTab === "prescription"
                ? "tab active"
                : "tab"
            }
            onClick={() => setActiveTab("prescription")}
          >
            <Pill size={16} />
            Prescription
          </button>

          <button
            className={
              activeTab === "records"
                ? "tab active"
                : "tab"
            }
            onClick={() => setActiveTab("records")}
          >
            <FileText size={16} />
            All Records
          </button>

          <button
            className={
              activeTab === "consultation"
                ? "tab active"
                : "tab"
            }
            onClick={() => setActiveTab("consultation")}
          >
            <Stethoscope size={16} />
            Consultation
          </button>
        </div>

        {activeTab === "prescription" && (
          <section className="prescription-layout">
            {prescription ? (
              <>
                <div className="prescription-card">
                  <div className="record-header">
                    <div className="record-icon">
                      <Pill size={22} />
                    </div>

                    <div>
                      <span className="record-label">
                        LATEST PRESCRIPTION
                      </span>

                      <h2>Doctor Prescription</h2>

                      <p>
                        Issued by {prescription.doctor}
                      </p>
                    </div>

                    <div className="available">
                      <CheckCircle2 size={14} />
                      Available
                    </div>
                  </div>

                  <div className="prescription-meta">
                    <div>
                      <span>Prescription ID</span>
                      <strong>
                        {prescription.prescriptionId}
                      </strong>
                    </div>

                    <div>
                      <span>Date</span>
                      <strong>{prescription.date}</strong>
                    </div>

                    <div>
                      <span>Department</span>
                      <strong>
                        {prescription.department}
                      </strong>
                    </div>
                  </div>

                  <div className="medicine-heading">
                    <h3>Medicines</h3>
                    <span>
                      {medicines.length} medicine
                      {medicines.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="medicine-list">
                    {medicines.map((medicine, index) => (
                      <div
                        className="medicine-row"
                        key={index}
                      >
                        <div className="medicine-number">
                          {index + 1}
                        </div>

                        <div className="medicine-main">
                          <strong>{medicine.name}</strong>

                          <span>
                            {medicine.dosage} •{" "}
                            {medicine.frequency} •{" "}
                            {medicine.duration}
                          </span>

                          {medicine.instructions && (
                            <small>
                              {medicine.instructions}
                            </small>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {prescription.advice && (
                    <div className="advice-box">
                      <strong>Doctor's Advice</strong>
                      <p>{prescription.advice}</p>
                    </div>
                  )}

                  {prescription.followUp && (
                    <div className="followup-box">
                      <CalendarDays size={18} />

                      <div>
                        <strong>Follow-up</strong>
                        <p>{prescription.followUp}</p>
                      </div>
                    </div>
                  )}

                  <div className="record-actions">
                    <button
                      className="download-btn"
                      onClick={() =>
                        window.print()
                      }
                    >
                      <Download size={16} />
                      Print / Save Record
                    </button>
                  </div>
                </div>

                <aside className="locker-side">
                  <div className="continuity-card">
                    <div className="continuity-icon">
                      <Activity size={20} />
                    </div>

                    <h3>Healthcare Journey Connected</h3>

                    <p>
                      Your referral, consultation and
                      prescription are connected to the
                      same patient journey.
                    </p>

                    <div className="mini-flow">
                      <div className="flow-item done">
                        <CheckCircle2 size={15} />
                        PHC Referral
                      </div>

                      <div className="line" />

                      <div className="flow-item done">
                        <CheckCircle2 size={15} />
                        Consultation
                      </div>

                      <div className="line" />

                      <div className="flow-item done">
                        <CheckCircle2 size={15} />
                        Prescription
                      </div>
                    </div>
                  </div>

                  <div className="privacy-card">
                    <LockKeyhole size={20} />

                    <div>
                      <strong>Your data, your access</strong>

                      <p>
                        Patient records should only be
                        accessed by authorized healthcare
                        providers.
                      </p>
                    </div>
                  </div>
                </aside>
              </>
            ) : (
              <div className="empty-card">
                <div className="empty-icon">
                  <Pill size={28} />
                </div>

                <h2>No prescription yet</h2>

                <p>
                  Once your doctor creates a prescription,
                  it will appear here automatically.
                </p>
              </div>
            )}
          </section>
        )}

        {activeTab === "records" && (
          <section className="records-grid">
            {documents.map((document, index) => {
              const Icon = document.icon;

              return (
                <div
                  className="document-card"
                  key={index}
                >
                  <div className="document-top">
                    <div className="document-icon">
                      <Icon size={20} />
                    </div>

                    <span
                      className={
                        document.status === "Available"
                          ? "status available"
                          : "status pending"
                      }
                    >
                      {document.status}
                    </span>
                  </div>

                  <span className="document-type">
                    {document.type}
                  </span>

                  <h3>{document.title}</h3>

                  <div className="document-date">
                    <CalendarDays size={14} />
                    {document.date}
                  </div>

                  <button className="view-btn">
                    View Record →
                  </button>
                </div>
              );
            })}
          </section>
        )}

        {activeTab === "consultation" && (
          <ConsultationTab />
        )}

        <div className="prototype-note">
          <ShieldCheck size={17} />

          <div>
            <strong>Prototype security notice</strong>

            <p>
              This demonstration currently stores records in
              browser local storage. A production deployment
              would use authenticated backend services,
              authorization, encryption and audit logging.
            </p>
          </div>
        </div>
      </main>
      <AIAssistant />

      <style>{styles}</style>
    </div>
  );
}

function ConsultationTab() {
  const consultation = JSON.parse(
    localStorage.getItem(
      "hospitalLockerConsultation"
    ) || "null"
  );

  if (!consultation) {
    return (
      <div className="empty-card">
        <div className="empty-icon">
          <Stethoscope size={28} />
        </div>

        <h2>No consultation record</h2>

        <p>
          Your consultation details will appear here after
          your doctor completes the consultation.
        </p>
      </div>
    );
  }

  return (
    <div className="consultation-record">
      <div className="record-header">
        <div className="record-icon">
          <Stethoscope size={22} />
        </div>

        <div>
          <span className="record-label">
            CONSULTATION RECORD
          </span>

          <h2>Doctor Consultation</h2>

          <p>{consultation.doctor}</p>
        </div>

        <div className="available">
          <CheckCircle2 size={14} />
          Available
        </div>
      </div>

      <div className="consultation-grid">
        <div>
          <span>Symptoms</span>
          <p>{consultation.symptoms}</p>
        </div>

        <div>
          <span>Diagnosis</span>
          <p>{consultation.diagnosis}</p>
        </div>

        <div>
          <span>Clinical Notes</span>
          <p>
            {consultation.notes ||
              "No additional notes recorded."}
          </p>
        </div>

        <div>
          <span>Follow-up</span>
          <p>
            {consultation.followUp ||
              "No follow-up instructions recorded."}
          </p>
        </div>
      </div>
           
    </div>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

.locker-page {
  min-height: 100vh;
  background: #f5f9fc;
  color: #16324f;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
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

.patient-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
}

.patient-profile > div:last-child {
  display: flex;
  flex-direction: column;
}

.patient-profile strong {
  font-size: 13px;
}

.patient-profile span {
  color: #64748b;
  font-size: 11px;
}

.content {
  max-width: 1250px;
  margin: auto;
  padding: 32px 24px 60px;
}

.hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 25px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #0f766e;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .1em;
}

.hero h1 {
  margin: 7px 0;
  font-size: 35px;
  letter-spacing: -1px;
}

.hero p {
  margin: 0;
  color: #64748b;
  max-width: 650px;
  line-height: 1.6;
  font-size: 13px;
}

.security-badge {
  background: #e8f7f5;
  color: #0f766e;
  border-radius: 999px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.patient-card {
  background: linear-gradient(135deg, #0f4c81, #176b91);
  color: white;
  border-radius: 18px;
  padding: 21px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 14px 35px rgba(15, 76, 129, .14);
  animation: slideUp .45s ease both;
}

.patient-avatar {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.28);
  font-size: 20px;
  font-weight: 900;
}

.patient-details {
  flex: 1;
}

.patient-details > span {
  font-size: 9px;
  opacity: .7;
  font-weight: 900;
  letter-spacing: .1em;
}

.patient-details h2 {
  margin: 2px 0 5px;
  font-size: 21px;
}

.patient-meta {
  display: flex;
  gap: 8px;
  opacity: .78;
  font-size: 11px;
  flex-wrap: wrap;
}

.locker-status {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,.13);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 800;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 20px 0 32px;
}

.stat-card {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 15px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: grid;
  place-items: center;
}

.stat-icon.blue {
  background: #eaf4fb;
  color: #0f4c81;
}

.stat-icon.teal {
  background: #e8f7f5;
  color: #0f766e;
}

.stat-icon.green {
  background: #edf9f0;
  color: #15803d;
}

.stat-card strong,
.stat-card span {
  display: block;
}

.stat-card strong {
  font-size: 18px;
}

.stat-card span {
  color: #64748b;
  font-size: 10px;
  margin-top: 2px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.section-heading h2 {
  margin: 0;
  font-size: 20px;
}

.section-heading p {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 12px;
}

.search-box {
  width: 220px;
  height: 38px;
  background: white;
  border: 1px solid #dfe8ee;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  color: #94a3b8;
}

.search-box input {
  border: 0;
  outline: 0;
  width: 100%;
  font: inherit;
  font-size: 11px;
}

.tabs {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 12px;
  padding: 5px;
  display: flex;
  width: fit-content;
  margin-bottom: 17px;
}

.tab {
  border: 0;
  background: transparent;
  color: #64748b;
  padding: 9px 13px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 800;
}

.tab:hover {
  color: #0f4c81;
}

.tab.active {
  background: #eaf4fb;
  color: #0f4c81;
}

.prescription-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 310px;
  gap: 18px;
  align-items: start;
}

.prescription-card,
.consultation-record {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 17px;
  padding: 23px;
  box-shadow: 0 7px 25px rgba(15, 76, 129, .05);
}

.record-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid #edf2f6;
}

.record-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: #e8f7f5;
  color: #0f766e;
  display: grid;
  place-items: center;
}

.record-header > div:nth-child(2) {
  flex: 1;
}

.record-label {
  color: #0f766e;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .1em;
}

.record-header h2 {
  font-size: 17px;
  margin: 3px 0;
}

.record-header p {
  color: #64748b;
  font-size: 11px;
  margin: 0;
}

.available {
  color: #15803d;
  background: #edf9f0;
  border-radius: 999px;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 800;
}

.prescription-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 18px 0 22px;
}

.prescription-meta div {
  background: #f6f9fb;
  border-radius: 10px;
  padding: 11px;
}

.prescription-meta span,
.prescription-meta strong {
  display: block;
}

.prescription-meta span {
  color: #64748b;
  font-size: 9px;
  margin-bottom: 4px;
}

.prescription-meta strong {
  font-size: 11px;
}

.medicine-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.medicine-heading h3 {
  margin: 0;
  font-size: 14px;
}

.medicine-heading span {
  color: #64748b;
  font-size: 10px;
}

.medicine-list {
  display: grid;
  gap: 8px;
}

.medicine-row {
  display: flex;
  gap: 11px;
  padding: 13px;
  border: 1px solid #e6edf2;
  border-radius: 11px;
  background: #fbfdff;
}

.medicine-number {
  width: 29px;
  height: 29px;
  flex: 0 0 29px;
  border-radius: 8px;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 900;
}

.medicine-main strong,
.medicine-main span,
.medicine-main small {
  display: block;
}

.medicine-main strong {
  font-size: 12px;
}

.medicine-main span {
  color: #475569;
  font-size: 10px;
  margin-top: 3px;
}

.medicine-main small {
  color: #64748b;
  font-size: 10px;
  margin-top: 4px;
}

.advice-box,
.followup-box {
  margin-top: 14px;
  border-radius: 11px;
  padding: 13px;
}

.advice-box {
  background: #f8fbfd;
}

.advice-box strong,
.followup-box strong {
  font-size: 11px;
}

.advice-box p,
.followup-box p {
  margin: 5px 0 0;
  color: #64748b;
  font-size: 11px;
  line-height: 1.5;
}

.followup-box {
  background: #e8f7f5;
  color: #0f766e;
  display: flex;
  gap: 9px;
  align-items: flex-start;
}

.followup-box p {
  color: #426b68;
}

.record-actions {
  margin-top: 19px;
  padding-top: 17px;
  border-top: 1px solid #edf2f6;
}

.download-btn {
  border: 1px solid #d5e1e8;
  background: white;
  color: #0f4c81;
  border-radius: 10px;
  padding: 10px 13px;
  font-weight: 800;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 7px;
}

.download-btn:hover {
  background: #f5f9fc;
}

.locker-side {
  display: grid;
  gap: 15px;
}

.continuity-card {
  background: linear-gradient(145deg, #eef9f8, white);
  border: 1px solid #dcefeb;
  border-radius: 16px;
  padding: 19px;
}

.continuity-icon {
  width: 39px;
  height: 39px;
  border-radius: 11px;
  background: #dff4f1;
  color: #0f766e;
  display: grid;
  place-items: center;
}

.continuity-card h3 {
  font-size: 15px;
  margin: 12px 0 6px;
}

.continuity-card > p {
  color: #64748b;
  font-size: 11px;
  line-height: 1.55;
  margin: 0;
}

.mini-flow {
  margin-top: 18px;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #0f766e;
  font-size: 10px;
  font-weight: 800;
}

.line {
  height: 15px;
  width: 1px;
  background: #b9d9d5;
  margin-left: 7px;
}

.privacy-card {
  background: #f8fbfd;
  border: 1px solid #e2eaf0;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #0f4c81;
}

.privacy-card > div {
  flex: 1;
}

.privacy-card strong {
  font-size: 11px;
}

.privacy-card p {
  color: #64748b;
  font-size: 10px;
  line-height: 1.5;
  margin: 4px 0 0;
}

.records-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.document-card {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 15px;
  padding: 18px;
  transition: .2s;
}

.document-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(15,76,129,.08);
}

.document-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.document-icon {
  width: 39px;
  height: 39px;
  border-radius: 10px;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
}

.status {
  border-radius: 999px;
  padding: 5px 8px;
  font-size: 9px;
  font-weight: 800;
}

.status.available {
  background: #edf9f0;
  color: #15803d;
}

.status.pending {
  background: #fff8e7;
  color: #9a6700;
}

.document-type {
  display: block;
  color: #0f766e;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .08em;
  margin-top: 15px;
}

.document-card h3 {
  margin: 5px 0 9px;
  font-size: 14px;
}

.document-date {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #64748b;
  font-size: 10px;
}

.view-btn {
  margin-top: 15px;
  border: 0;
  background: transparent;
  color: #0f4c81;
  padding: 0;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
}

.consultation-record {
  max-width: 900px;
}

.consultation-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 20px;
}

.consultation-grid > div {
  border: 1px solid #e7edf2;
  border-radius: 11px;
  padding: 14px;
}

.consultation-grid span {
  color: #64748b;
  font-size: 10px;
  font-weight: 800;
}

.consultation-grid p {
  margin: 7px 0 0;
  font-size: 12px;
  line-height: 1.6;
}

.empty-card {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 17px;
  padding: 50px 25px;
  text-align: center;
}

.empty-icon {
  width: 58px;
  height: 58px;
  border-radius: 15px;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
  margin: auto;
}

.empty-card h2 {
  margin: 14px 0 5px;
  font-size: 18px;
}

.empty-card p {
  color: #64748b;
  font-size: 12px;
  max-width: 430px;
  margin: auto;
  line-height: 1.6;
}

.prototype-note {
  margin-top: 22px;
  border: 1px solid #dfe8ee;
  background: #f8fbfd;
  border-radius: 13px;
  padding: 13px 15px;
  display: flex;
  gap: 10px;
  color: #0f4c81;
}

.prototype-note strong {
  font-size: 11px;
}

.prototype-note p {
  color: #64748b;
  font-size: 10px;
  line-height: 1.5;
  margin: 3px 0 0;
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

@media (max-width: 900px) {
  .prescription-layout {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .topbar {
    padding: 0 16px;
  }

  .patient-profile {
    display: none;
  }

  .content {
    padding: 24px 14px 45px;
  }

  .hero {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero h1 {
    font-size: 29px;
  }

  .patient-card {
    flex-wrap: wrap;
  }

  .locker-status {
    width: 100%;
    justify-content: center;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .tabs {
    width: 100%;
    overflow-x: auto;
  }

  .tab {
    white-space: nowrap;
  }

  .prescription-meta,
  .records-grid,
  .consultation-grid {
    grid-template-columns: 1fr;
  }
}
`;