import React from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Hospital,
  MapPin,
  Pill,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";

export default function PatientJourney() {
  const referral =
    JSON.parse(
      localStorage.getItem("hospitalLockerReferral") || "null"
    );

  const prescription =
    JSON.parse(
      localStorage.getItem("hospitalLockerPrescription") || "null"
    );

  const consultation =
    JSON.parse(
      localStorage.getItem(
        "hospitalLockerConsultation"
      ) || "null"
    );

  const referralId =
    referral?.referralId || "HL-REF-2026-00124";

  const steps = [
    {
      title: "PHC Visit",
      subtitle: "Primary Health Centre",
      description:
        "Initial patient assessment and referral decision.",
      date: referral?.date || "03 Sep 2026",
      icon: Building2,
      status: "completed",
    },
    {
      title: "Digital Referral Created",
      subtitle: "Referral ID generated",
      description:
        "A secure digital referral connects the patient to the hospital.",
      date: referral?.date || "03 Sep 2026",
      icon: FileText,
      status: "completed",
    },
    {
      title: "Hospital Referral Received",
      subtitle: "Sassoon General Hospital",
      description:
        "Hospital verifies the referral before authorized access.",
      date: referral?.date || "03 Sep 2026",
      icon: Hospital,
      status: "completed",
    },
    {
      title: "Doctor Consultation",
      subtitle:
        referral?.department || "General Medicine",
      description:
        consultation
          ? "Doctor consultation has been recorded."
          : "Doctor reviews the authorized patient information.",
      date: consultation?.date || "Current stage",
      icon: Stethoscope,
      status: consultation
        ? "completed"
        : "current",
    },
    {
      title: "Prescription & Follow-up",
      subtitle: prescription
        ? "Prescription available"
        : "Upcoming",
      description:
        prescription
          ? "Prescription has been added to the Health Locker."
          : "Doctor prescription and follow-up will be connected here.",
      date: prescription?.date || "Upcoming",
      icon: Pill,
      status: prescription
        ? "completed"
        : "upcoming",
    },
  ];

  const completedCount = steps.filter(
    (step) => step.status === "completed"
  ).length;

  return (
    <div className="journey-page">
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
              Patient Health Journey
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
              <MapPin size={15} />
              CONNECTED CARE JOURNEY
            </div>

            <h1>My Healthcare Journey</h1>

            <p>
              Follow your care from the Primary Health Centre
              to hospital consultation and prescription.
            </p>
          </div>

          <div className="progress-card">
            <div className="progress-top">
              <span>Journey Progress</span>
              <strong>
                {completedCount}/{steps.length}
              </strong>
            </div>

            <div className="progress-bar">
              <div
                style={{
                  width: `${
                    (completedCount / steps.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <small>
              {prescription
                ? "Healthcare journey completed"
                : "Care journey in progress"}
            </small>
          </div>
        </section>

        <section className="patient-strip">
          <div className="patient-avatar">R</div>

          <div className="patient-info">
            <span>PATIENT</span>
            <h2>Ramesh</h2>

            <div>
              Patient ID: HL-PAT-001
              <span>•</span>
              42 years
              <span>•</span>
              Male
            </div>
          </div>

          <div className="referral-info">
            <span>ACTIVE REFERRAL</span>
            <strong>{referralId}</strong>
            <small>
              {referral?.department ||
                "General Medicine"}
            </small>
          </div>
        </section>

        <div className="journey-layout">
          <section className="timeline-card">
            <div className="section-title">
              <div className="section-icon">
                <MapPin size={19} />
              </div>

              <div>
                <h2>Care Timeline</h2>
                <p>
                  Every important step stays connected.
                </p>
              </div>
            </div>

            <div className="timeline">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    className={`timeline-item ${step.status}`}
                    key={step.title}
                  >
                    <div className="timeline-marker">
                      {step.status === "completed" ? (
                        <CheckCircle2 size={19} />
                      ) : step.status === "current" ? (
                        <Clock3 size={19} />
                      ) : (
                        <Icon size={19} />
                      )}
                    </div>

                    {index !== steps.length - 1 && (
                      <div className="timeline-line" />
                    )}

                    <div className="timeline-content">
                      <div className="timeline-heading">
                        <div>
                          <span className="step-label">
                            STEP {index + 1}
                          </span>

                          <h3>{step.title}</h3>

                          <div className="step-location">
                            <Icon size={13} />
                            {step.subtitle}
                          </div>
                        </div>

                        <span className="step-date">
                          {step.date}
                        </span>
                      </div>

                      <p>{step.description}</p>

                      <div className="status-label">
                        {step.status ===
                          "completed" && (
                          <>
                            <CheckCircle2 size={13} />
                            Completed
                          </>
                        )}

                        {step.status === "current" && (
                          <>
                            <Clock3 size={13} />
                            Current Stage
                          </>
                        )}

                        {step.status === "upcoming" && (
                          <>
                            <ArrowRight size={13} />
                            Upcoming
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="side-column">
            <div className="connection-card">
              <div className="connection-icon">
                <ShieldCheck size={21} />
              </div>

              <span className="card-label">
                HOSPITALLOCKER AI
              </span>

              <h3>
                One connected healthcare journey
              </h3>

              <p>
                Instead of keeping each hospital visit
                separate, your referral, consultation and
                prescription stay connected to your patient
                journey.
              </p>

              <div className="connection-flow">
                <FlowItem
                  icon={Building2}
                  text="PHC"
                />

                <ArrowRight size={14} />

                <FlowItem
                  icon={Hospital}
                  text="Hospital"
                />

                <ArrowRight size={14} />

                <FlowItem
                  icon={Stethoscope}
                  text="Doctor"
                />

                <ArrowRight size={14} />

                <FlowItem
                  icon={Pill}
                  text="Locker"
                />
              </div>
            </div>

            <div className="referral-card">
              <div className="referral-title">
                <FileText size={18} />
                Referral Details
              </div>

              <div className="detail-row">
                <span>Referral ID</span>
                <strong>{referralId}</strong>
              </div>

              <div className="detail-row">
                <span>From</span>
                <strong>
                  {referral?.source ||
                    "Primary Health Centre"}
                </strong>
              </div>

              <div className="detail-row">
                <span>Hospital</span>
                <strong>
                  {referral?.hospital ||
                    "Sassoon General Hospital"}
                </strong>
              </div>

              <div className="detail-row">
                <span>Department</span>
                <strong>
                  {referral?.department ||
                    "General Medicine"}
                </strong>
              </div>

              <div className="detail-row">
                <span>Status</span>
                <strong className="completed-text">
                  {referral?.status ||
                    (prescription
                      ? "Completed"
                      : "In Progress")}
                </strong>
              </div>
            </div>

            <div className="privacy-card">
              <LockIcon />

              <div>
                <strong>Privacy by design</strong>

                <p>
                  The QR referral contains only a referral
                  identifier. Patient health information is
                  not placed directly inside the QR code.
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

function FlowItem({ icon: Icon, text }) {
  return (
    <div className="flow-item">
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
}

function LockIcon() {
  return (
    <div className="lock-icon">
      <ShieldCheck size={19} />
    </div>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

.journey-page {
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
  justify-content: space-between;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 24px;
}

.eyebrow {
  color: #0f766e;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .1em;
  display: flex;
  align-items: center;
  gap: 6px;
}

.hero h1 {
  margin: 7px 0;
  font-size: 34px;
  letter-spacing: -1px;
}

.hero p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
  max-width: 650px;
}

.progress-card {
  width: 230px;
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 6px 20px rgba(15,76,129,.04);
}

.progress-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 9px;
}

.progress-top span {
  color: #64748b;
  font-size: 10px;
  font-weight: 700;
}

.progress-top strong {
  color: #0f766e;
  font-size: 12px;
}

.progress-bar {
  height: 7px;
  background: #e9eff3;
  border-radius: 99px;
  overflow: hidden;
}

.progress-bar div {
  height: 100%;
  background: #0f766e;
  border-radius: inherit;
  transition: width .5s ease;
}

.progress-card small {
  display: block;
  color: #64748b;
  font-size: 9px;
  margin-top: 7px;
}

.patient-strip {
  background: linear-gradient(135deg, #0f4c81, #176b91);
  color: white;
  border-radius: 18px;
  padding: 20px 23px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 14px 35px rgba(15,76,129,.14);
  animation: slideUp .45s ease both;
}

.patient-avatar {
  width: 55px;
  height: 55px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.25);
  font-size: 20px;
  font-weight: 900;
}

.patient-info {
  flex: 1;
}

.patient-info > span,
.referral-info > span {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .1em;
  opacity: .7;
}

.patient-info h2 {
  margin: 2px 0 4px;
  font-size: 20px;
}

.patient-info > div {
  font-size: 10px;
  opacity: .8;
}

.patient-info > div span {
  margin: 0 7px;
}

.referral-info {
  border-left: 1px solid rgba(255,255,255,.25);
  padding-left: 24px;
  min-width: 205px;
}

.referral-info strong,
.referral-info small {
  display: block;
}

.referral-info strong {
  font-size: 13px;
  margin-top: 4px;
}

.referral-info small {
  opacity: .7;
  margin-top: 3px;
  font-size: 10px;
}

.journey-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  margin-top: 20px;
  align-items: start;
}

.timeline-card,
.referral-card,
.connection-card,
.privacy-card {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 17px;
  box-shadow: 0 7px 25px rgba(15,76,129,.05);
}

.timeline-card {
  padding: 23px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 11px;
  padding-bottom: 20px;
  border-bottom: 1px solid #edf2f6;
}

.section-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
}

.section-title h2 {
  margin: 0 0 3px;
  font-size: 17px;
}

.section-title p {
  color: #64748b;
  font-size: 11px;
  margin: 0;
}

.timeline {
  padding-top: 22px;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 15px;
  min-height: 125px;
}

.timeline-marker {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  z-index: 2;
}

.timeline-item.completed .timeline-marker {
  background: #e8f7f5;
  color: #0f766e;
}

.timeline-item.current .timeline-marker {
  background: #eaf4fb;
  color: #0f4c81;
  box-shadow: 0 0 0 5px #f3f8fb;
}

.timeline-item.upcoming .timeline-marker {
  background: #f1f5f8;
  color: #94a3b8;
}

.timeline-line {
  position: absolute;
  width: 2px;
  background: #dce8ed;
  left: 18px;
  top: 38px;
  bottom: 0;
}

.timeline-content {
  flex: 1;
  padding-bottom: 24px;
}

.timeline-heading {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.step-label {
  color: #94a3b8;
  font-size: 8px;
  letter-spacing: .1em;
  font-weight: 900;
}

.timeline-content h3 {
  font-size: 14px;
  margin: 3px 0;
}

.step-location {
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
}

.step-date {
  color: #64748b;
  font-size: 10px;
  white-space: nowrap;
}

.timeline-content > p {
  color: #64748b;
  font-size: 11px;
  line-height: 1.55;
  margin: 10px 0;
  max-width: 600px;
}

.status-label {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 999px;
  padding: 5px 8px;
  font-size: 9px;
  font-weight: 800;
}

.completed .status-label {
  background: #edf9f0;
  color: #15803d;
}

.current .status-label {
  background: #eaf4fb;
  color: #0f4c81;
}

.upcoming .status-label {
  background: #f1f5f8;
  color: #64748b;
}

.side-column {
  display: grid;
  gap: 15px;
}

.connection-card {
  padding: 19px;
  background: linear-gradient(145deg, #eef9f8, white);
  border-color: #dcefeb;
}

.connection-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: #dff4f1;
  color: #0f766e;
  display: grid;
  place-items: center;
}

.card-label {
  display: block;
  color: #0f766e;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .1em;
  margin-top: 14px;
}

.connection-card h3 {
  font-size: 16px;
  margin: 5px 0;
}

.connection-card > p {
  color: #64748b;
  font-size: 11px;
  line-height: 1.55;
  margin: 0;
}

.connection-flow {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 17px;
  color: #7b9b99;
  overflow-x: auto;
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #0f766e;
  font-size: 9px;
  font-weight: 800;
  white-space: nowrap;
}

.referral-card {
  padding: 18px;
}

.referral-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 800;
  padding-bottom: 13px;
  border-bottom: 1px solid #edf2f6;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 0;
  border-bottom: 1px solid #f1f5f8;
  font-size: 10px;
}

.detail-row:last-child {
  border-bottom: 0;
}

.detail-row span {
  color: #64748b;
}

.detail-row strong {
  text-align: right;
  max-width: 180px;
}

.completed-text {
  color: #15803d;
}

.privacy-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  background: #f8fbfd;
  color: #0f4c81;
}

.lock-icon {
  flex: 0 0 auto;
}

.privacy-card > div:last-child {
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
  .journey-layout {
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
    flex-direction: column;
    align-items: stretch;
  }

  .progress-card {
    width: 100%;
  }

  .patient-strip {
    flex-wrap: wrap;
  }

  .referral-info {
    width: 100%;
    border-left: 0;
    border-top: 1px solid rgba(255,255,255,.25);
    padding: 13px 0 0;
  }

  .timeline-card {
    padding: 17px;
  }

  .timeline-heading {
    flex-direction: column;
    gap: 5px;
  }
}
`;