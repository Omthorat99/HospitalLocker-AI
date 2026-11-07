
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HeartPulse, Lock, Mail, ArrowRight } from "lucide-react";

const roles = [
  { value: "patient", label: "Patient", path: "/patient" },
  { value: "doctor", label: "Doctor", path: "/doctor" },
  { value: "phc", label: "PHC", path: "/phc" },
  { value: "hospital", label: "Hospital", path: "/hospital" },
];

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = roles.some(
    (role) => role.value === searchParams.get("role")
  )
    ? searchParams.get("role")
    : "patient";

  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const selectedRole = roles.find((item) => item.value === role);

    const session = {
      email: email.trim(),
      role,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("hospitalLockerDemoSession", JSON.stringify(session));

    navigate(selectedRole.path);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <Link to="/" style={styles.brand}>
          <HeartPulse size={30} />
          <span>HospitalLocker AI</span>
        </Link>

        <h1 style={styles.heading}>Welcome Back</h1>
        <p style={styles.subtitle}>
          Sign in to access your healthcare portal.
        </p>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Select your role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            {roles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.fieldInput}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Login <ArrowRight size={18} />
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <p style={styles.note}>
          Demonstration login only. Credentials are not verified by a
          production authentication service.
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
    margin: "30px 0 8px",
    textAlign: "center",
    color: "#16324f",
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 28,
  },
  label: {
    display: "block",
    margin: "16px 0 8px",
    color: "#334155",
    fontSize: 14,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: 12,
    border: "1px solid #d5e2ea",
    borderRadius: 9,
    background: "#fff",
    boxSizing: "border-box",
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
  button: {
    width: "100%",
    marginTop: 24,
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
    marginTop: 22,
    textAlign: "center",
    fontSize: 14,
    color: "#64748b",
  },
  note: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#94a3b8",
  },
};
