"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to log in.");
      } else {
        setError("Failed to log in.");
      }
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="glass-panel auth-card">
        <h2 style={{ textAlign: "center" }}>Welcome Back</h2>
        <p>Log in to access your courses and certificates.</p>
        <form onSubmit={handleLogin} style={{ marginTop: "2rem" }}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-text">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            Log In
          </button>
        </form>
        <p style={{ marginTop: "1.5rem" }}>
          Don&apos;t have an account? <Link href="/signup" style={{ color: "var(--primary-color)", fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
