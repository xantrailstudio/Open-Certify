"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { user, loading } = useAuth();

  return (
    <div className="animate-fade-in">

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 60%, #bfdbfe 100%)",
        padding: "6rem 2rem 5rem",
        textAlign: "center",
      }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <span style={{
            display: "inline-block",
            background: "#2563eb",
            color: "#fff",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            marginBottom: "1.5rem",
          }}>
            100% Free · No Credit Card
          </span>
          <h1 style={{ fontSize: "3.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.25rem", lineHeight: 1.15 }}>
            Earn Real Certifications.<br />
            <span style={{ color: "#2563eb" }}>Completely Free.</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#475569", maxWidth: 620, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            OpenCertify gives you structured certification courses in HTML, CSS, Next.js, and Python — with proctored exams and verifiable certificates. No paywalls, ever.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {loading ? null : user ? (
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "1.05rem" }}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/signup" className="btn btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "1.05rem" }}>
                  Get Started Free →
                </Link>
                <Link href="/courses" className="btn btn-outline" style={{ padding: "0.9rem 2rem", fontSize: "1.05rem" }}>
                  Browse Courses
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: "#2563eb", padding: "2rem" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
          {[
            { value: "4", label: "Free Courses" },
            { value: "100%", label: "Free Forever" },
            { value: "XP", label: "Rewards System" },
            { value: "0", label: "Paywalls" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center", color: "#fff" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.85, marginTop: "0.3rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.75rem" }}>
              Why OpenCertify?
            </h2>
            <p style={{ color: "#64748b", maxWidth: 520, margin: "0 auto" }}>
              We believe quality education should be accessible to everyone, without compromise.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: "Proctored Exams",
                desc: "Our quiz engine blocks copy-paste, detects tab switches, and randomises questions — ensuring your certificate has real value.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                ),
                title: "Google Sign-In",
                desc: "One click to sign up with your Google account. No forms, no verification emails — start learning in seconds.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                ),
                title: "XP & Progress",
                desc: "Earn XP for every exam you pass. Track your certificate history from your personal dashboard.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                  </svg>
                ),
                title: "Structured Syllabus",
                desc: "Each course has a module-by-module syllabus covering everything from basics to production-ready skills.",
              },
            ].map((f) => (
              <div key={f.title} className="glass-panel" style={{ padding: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>{f.icon}</div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "#0f172a" }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #1d4ed8, #2563eb)", padding: "5rem 2rem", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Ready to get certified?
          </h2>
          <p style={{ color: "#bfdbfe", marginBottom: "2rem", fontSize: "1.05rem" }}>
            Join OpenCertify today and start earning verifiable certificates for free.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" style={{
              background: "#fff",
              color: "#2563eb",
              padding: "0.9rem 2rem",
              borderRadius: "8px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1.05rem",
            }}>
              Create Free Account
            </Link>
            <Link href="/courses" style={{
              background: "transparent",
              color: "#fff",
              padding: "0.9rem 2rem",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.05rem",
              border: "2px solid rgba(255,255,255,0.5)",
            }}>
              View Courses
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
