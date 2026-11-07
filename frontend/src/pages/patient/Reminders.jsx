import React, { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
  Trash2,
  UserRound,
} from "lucide-react";

export default function Reminders() {
  const prescription = JSON.parse(
    localStorage.getItem("hospitalLockerPrescription") || "null"
  );

  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Take prescribed medicines",
      description: prescription
        ? `${prescription.medicines?.length || 0} medicine(s) from your latest prescription`
        : "Follow the medicine schedule provided by your doctor.",
      time: "After meals",
      date: "Today",
      type: "Medicine",
      icon: Pill,
      completed: false,
    },
    {
      id: 2,
      title: "Doctor follow-up",
      description:
        prescription?.followUp ||
        "Follow-up information will appear after your consultation.",
      time: "As advised",
      date: "Upcoming",
      type: "Follow-up",
      icon: Stethoscope,
      completed: false,
    },
    {
      id: 3,
      title: "Keep your health records updated",
      description:
        "Review your latest prescription and healthcare journey.",
      time: "Anytime",
      date: "Today",
      type: "Health",
      icon: ShieldCheck,
      completed: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    time: "",
    date: "",
  });

  const pendingCount = useMemo(
    () => reminders.filter((item) => !item.completed).length,
    [reminders]
  );

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteReminder = (id) => {
    setReminders((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleAddReminder = () => {
    if (!newReminder.title.trim()) {
      alert("Please enter a reminder title.");
      return;
    }

    setReminders((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newReminder.title,
        description:
          newReminder.description ||
          "Personal health reminder",
        time: newReminder.time || "Anytime",
        date: newReminder.date || "Upcoming",
        type: "Personal",
        icon: Bell,
        completed: false,
      },
    ]);

    setNewReminder({
      title: "",
      description: "",
      time: "",
      date: "",
    });

    setShowForm(false);
  };

  return (
    <div className="reminders-page">
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
              Patient Health Assistant
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
              <Bell size={15} />
              CARE REMINDERS
            </div>

            <h1>Reminders</h1>

            <p>
              Stay on track with medicines, follow-ups and
              important healthcare tasks.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={17} />
            Add Reminder
          </button>
        </section>

        <section className="summary-banner">
          <div className="summary-icon">
            <Bell size={22} />
          </div>

          <div className="summary-main">
            <span>YOUR CARE PLAN</span>

            <h2>
              {pendingCount} reminder
              {pendingCount !== 1 ? "s" : ""} need attention
            </h2>

            <p>
              Small reminders can help patients stay
              connected with their treatment plan.
            </p>
          </div>

          <div className="today-box">
            <CalendarDays size={17} />
            <div>
              <strong>Today</strong>
              <span>04 Sep 2026</span>
            </div>
          </div>
        </section>

        {showForm && (
          <section className="form-card">
            <div className="form-title">
              <div className="form-icon">
                <Plus size={19} />
              </div>

              <div>
                <h2>Create Reminder</h2>
                <p>
                  Add a personal healthcare reminder.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label>Reminder Title *</label>

                <input
                  value={newReminder.title}
                  onChange={(e) =>
                    setNewReminder({
                      ...newReminder,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Take medicine"
                />
              </div>

              <div className="field">
                <label>Date</label>

                <input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) =>
                    setNewReminder({
                      ...newReminder,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="field">
                <label>Time</label>

                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) =>
                    setNewReminder({
                      ...newReminder,
                      time: e.target.value,
                    })
                  }
                />
              </div>

              <div className="field full">
                <label>Description</label>

                <textarea
                  rows="3"
                  value={newReminder.description}
                  onChange={(e) =>
                    setNewReminder({
                      ...newReminder,
                      description: e.target.value,
                    })
                  }
                  placeholder="Add additional instructions..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleAddReminder}
              >
                <CheckCircle2 size={16} />
                Save Reminder
              </button>
            </div>
          </section>
        )}

        <div className="section-heading">
          <div>
            <h2>Your Reminders</h2>
            <p>Keep track of your next healthcare actions.</p>
          </div>

          <div className="reminder-count">
            {reminders.length} Total
          </div>
        </div>

        <section className="reminder-list">
          {reminders.map((reminder) => {
            const Icon = reminder.icon;

            return (
              <article
                className={`reminder-card ${
                  reminder.completed ? "completed" : ""
                }`}
                key={reminder.id}
              >
                <button
                  className={`check-button ${
                    reminder.completed ? "checked" : ""
                  }`}
                  onClick={() =>
                    toggleReminder(reminder.id)
                  }
                >
                  {reminder.completed ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <span />
                  )}
                </button>

                <div className="reminder-icon">
                  <Icon size={20} />
                </div>

                <div className="reminder-content">
                  <div className="reminder-top">
                    <div>
                      <span className="reminder-type">
                        {reminder.type}
                      </span>

                      <h3>{reminder.title}</h3>
                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteReminder(reminder.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p>{reminder.description}</p>

                  <div className="reminder-meta">
                    <span>
                      <CalendarDays size={13} />
                      {reminder.date}
                    </span>

                    <span>
                      <Clock3 size={13} />
                      {reminder.time}
                    </span>

                    {reminder.completed && (
                      <span className="done-label">
                        <CheckCircle2 size={13} />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="medicine-tip">
          <div className="tip-icon">
            <Pill size={20} />
          </div>

          <div>
            <strong>Medication reminder</strong>

            <p>
              Always follow the dosage and timing given by
              your healthcare provider. HospitalLocker AI
              does not independently recommend medicines.
            </p>
          </div>
        </section>

        <div className="privacy-note">
          <LockKeyhole size={17} />

          <div>
            <strong>Privacy protected</strong>

            <p>
              Reminders are associated with your patient
              journey. In production, reminders would be
              stored through authenticated backend services.
            </p>
          </div>
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

.reminders-page {
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
  max-width: 1100px;
  margin: auto;
  padding: 32px 24px 60px;
}

.hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 25px;
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
}

.add-btn {
  border: 0;
  border-radius: 11px;
  background: #0f766e;
  color: white;
  padding: 11px 15px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  transition: .2s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(15,118,110,.2);
}

.summary-banner {
  background: linear-gradient(135deg, #0f4c81, #176b91);
  color: white;
  border-radius: 18px;
  padding: 21px 23px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 14px 35px rgba(15,76,129,.14);
  animation: slideUp .45s ease both;
}

.summary-icon {
  width: 49px;
  height: 49px;
  border-radius: 14px;
  background: rgba(255,255,255,.16);
  display: grid;
  place-items: center;
}

.summary-main {
  flex: 1;
}

.summary-main > span {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .1em;
  opacity: .7;
}

.summary-main h2 {
  margin: 3px 0;
  font-size: 18px;
}

.summary-main p {
  margin: 0;
  font-size: 10px;
  opacity: .72;
}

.today-box {
  border-left: 1px solid rgba(255,255,255,.25);
  padding-left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.today-box div {
  display: flex;
  flex-direction: column;
}

.today-box strong {
  font-size: 11px;
}

.today-box span {
  font-size: 9px;
  opacity: .7;
  margin-top: 2px;
}

.form-card {
  margin-top: 18px;
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 7px 25px rgba(15,76,129,.05);
  animation: slideUp .3s ease both;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 11px;
  padding-bottom: 17px;
  border-bottom: 1px solid #edf2f6;
  margin-bottom: 18px;
}

.form-icon {
  width: 39px;
  height: 39px;
  border-radius: 10px;
  background: #e8f7f5;
  color: #0f766e;
  display: grid;
  place-items: center;
}

.form-title h2 {
  font-size: 15px;
  margin: 0 0 3px;
}

.form-title p {
  color: #64748b;
  font-size: 10px;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  display: block;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 6px;
}

.field input,
.field textarea {
  width: 100%;
  border: 1px solid #d9e3ea;
  border-radius: 10px;
  padding: 10px 11px;
  font: inherit;
  font-size: 11px;
  color: #16324f;
  outline: none;
  background: #fbfdff;
}

.field input:focus,
.field textarea:focus {
  border-color: #0f766e;
  box-shadow: 0 0 0 4px rgba(15,118,110,.08);
}

.field textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 17px;
}

.cancel-btn,
.save-btn {
  border-radius: 9px;
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.cancel-btn {
  border: 1px solid #d9e3ea;
  background: white;
  color: #64748b;
}

.save-btn {
  border: 0;
  background: #0f766e;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-heading {
  margin: 28px 0 13px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.section-heading h2 {
  margin: 0;
  font-size: 19px;
}

.section-heading p {
  color: #64748b;
  margin: 4px 0 0;
  font-size: 11px;
}

.reminder-count {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 999px;
  color: #64748b;
  padding: 7px 10px;
  font-size: 9px;
  font-weight: 800;
}

.reminder-list {
  display: grid;
  gap: 11px;
}

.reminder-card {
  background: white;
  border: 1px solid #e2eaf0;
  border-radius: 15px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: .2s;
}

.reminder-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 9px 25px rgba(15,76,129,.07);
}

.reminder-card.completed {
  opacity: .68;
}

.reminder-card.completed h3 {
  text-decoration: line-through;
}

.check-button {
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  border: 2px solid #cbd9e1;
  border-radius: 50%;
  background: white;
  padding: 0;
  color: #15803d;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.check-button > span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.check-button.checked {
  border: 0;
  background: #e8f7f5;
}

.reminder-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 11px;
  background: #eaf4fb;
  color: #0f4c81;
  display: grid;
  place-items: center;
}

.reminder-content {
  flex: 1;
  min-width: 0;
}

.reminder-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.reminder-type {
  color: #0f766e;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .1em;
}

.reminder-content h3 {
  font-size: 13px;
  margin: 3px 0;
}

.reminder-content > p {
  color: #64748b;
  font-size: 11px;
  line-height: 1.5;
  margin: 6px 0 10px;
}

.delete-button {
  border: 0;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
}

.delete-button:hover {
  color: #be123c;
  background: #fff1f2;
}

.reminder-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.reminder-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #64748b;
  font-size: 9px;
}

.reminder-meta .done-label {
  color: #15803d;
  font-weight: 800;
}

.medicine-tip {
  margin-top: 18px;
  background: #eef9f8;
  border: 1px solid #dcefeb;
  border-radius: 14px;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #0f766e;
}

.tip-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: #dff4f1;
  display: grid;
  place-items: center;
}

.medicine-tip strong {
  font-size: 11px;
}

.medicine-tip p {
  color: #587775;
  font-size: 10px;
  line-height: 1.5;
  margin: 4px 0 0;
}

.privacy-note {
  margin-top: 12px;
  background: #f8fbfd;
  border: 1px solid #e2eaf0;
  border-radius: 13px;
  padding: 13px 15px;
  display: flex;
  align-items: flex-start;
  gap: 9px;
  color: #0f4c81;
}

.privacy-note > div {
  flex: 1;
}

.privacy-note strong {
  font-size: 10px;
}

.privacy-note p {
  color: #64748b;
  font-size: 9px;
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

  .add-btn {
    width: 100%;
    justify-content: center;
  }

  .summary-banner {
    flex-wrap: wrap;
  }

  .today-box {
    width: 100%;
    border-left: 0;
    border-top: 1px solid rgba(255,255,255,.25);
    padding: 12px 0 0;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .field.full {
    grid-column: auto;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
    justify-content: center;
  }
}
`;