
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      const users = JSON.parse(
        localStorage.getItem("hospitalLockerDemoUsers") || "[]"
      );

      const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (existingUser) {
        setError("An account with this email already exists.");
        return;
      }

      users.push({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      localStorage.setItem(
        "hospitalLockerDemoUsers",
        JSON.stringify(users)
      );

      navigate(`/login?role=${role}`);
    } catch (err) {
      setError("Unable to create account. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.brand}>
          <HeartPulse size={30} />
          <span>HospitalLocker AI</span>
        </Link>

        <h1 style={styles.heading}>Create Account</h1>
        <p style={styles.subtitle}>
          Register to access your healthcare portal.
        </p>

        <form onSubmit={handleRegister}>
          <label style={styles.label}>Full name</label>
          <div style={styles.field}>
            <User size={18} color="#64748b" />
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.fieldInput}
              required
            />
          </div>

          <label style={styles.label}>Email address</label>
          <div style={styles.field}>
            <Mail size={18} color="#64748b" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.fieldInput}
              required
            />
          </div>

          <label style={styles.label}>Password</label>
          <div style={styles.field}>
            <Lock size={18} color="#64748b" />
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.fieldInput}
              minLength={6}
              required
            />
          </div>

          <label style={styles.label}>Register as</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="phc">PHC</option>
            <option value="hospital">Hospital</option>
          </select>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p style={styles.footer}>
          Already registered? <Link to="/login">Login here</Link>
        </p>

        <p style={styles.note}>
          Demonstration registration only. Account information is stored
          in this browser and is not securely authenticated.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background: "linear-gradient(135deg, #eaf4fb, #f4fbfa)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 430,
    padding: 35,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 15px 45px rgba(15, 76, 129, 0.12)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    color: "#0f4c81",
    fontSize: 20,
    fontWeight: 700,
    textDecoration: "none",
  },
  heading: {
    margin: "25px 0 8px",
    textAlign: "center",
    color: "#16324f",
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 22,
  },
  label: {
    display: "block",
    margin: "14px 0 8px",
    color: "#334155",
    fontSize: 14,
    fontWeight: 600,
  },
  field: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 12px",
    border: "1px solid #d5e2ea",
    borderRadius: 9,
  },
  fieldInput: {
    width: "100%",
    padding: 12,
    border: "none",
    outline: "none",
    fontSize: 14,
  },
  select: {
    width: "100%",
    padding: 12,
    border: "1px solid #d5e2ea",
    borderRadius: 9,
    background: "#fff",
  },
  button: {
    width: "100%",
    marginTop: 22,
    padding: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    border: "none",
    borderRadius: 9,
    background: "#0f4c81",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  error: {
    color: "#dc2626",
    fontSize: 13,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#64748b",
  },
  note: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#94a3b8",
  },
};
