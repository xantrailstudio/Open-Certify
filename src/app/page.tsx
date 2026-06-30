"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { user, loading } = useAuth();

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="hero">
        <h1 style={{ textAlign: "center", color: 'var(--primary-color)' }}>
          Elevate Your Tech Career.
        </h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "700px", margin: "1rem auto 2.5rem" }}>
          OpenCertify provides high-quality, completely free certification courses in HTML, CSS, and React. Build your skills, complete milestones, and earn verifiable certificates today.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          {loading ? null : user ? (
             <Link href="/dashboard" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
               Go to Dashboard
             </Link>
          ) : (
            <>
              <Link href="/signup" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
                Start Learning Now
              </Link>
              <Link href="/login" className="btn btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: "6rem", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "0.75rem" }}>Our Courses</h2>
        <p style={{ textAlign: "center", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem" }}>
          10 free certifications across Web Development, Data Science, Cybersecurity, and more.
        </p>
        
        {[
          {
            track: "Web Development",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            ),
            courses: [
              { id: "html", title: "HTML Fundamentals", level: "Beginner" },
              { id: "css", title: "CSS Styling", level: "Beginner" },
              { id: "responsive-web-design", title: "Responsive Web Design", level: "Beginner" },
              { id: "javascript", title: "JavaScript Algorithms", level: "Intermediate" },
              { id: "react", title: "React Mastery", level: "Intermediate" },
              { id: "nextjs", title: "Next.js Full-Stack", level: "Advanced" },
              { id: "nodejs", title: "Node.js & Express", level: "Intermediate" },
            ],
          },
          {
            track: "Data Science & Python",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            ),
            courses: [
              { id: "python", title: "Python for Beginners", level: "Beginner" },
            ],
          },
          {
            track: "Cybersecurity & Systems",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            ),
            courses: [
              { id: "security-plus", title: "CompTIA Security+ Prep", level: "Intermediate" },
            ],
          },
          {
            track: "Mobile & Cloud",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            ),
            courses: [
              { id: "git", title: "Git & GitHub", level: "Beginner" },
            ],
          },
        ].map((section) => (
          <div key={section.track} style={{ marginBottom: "3rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {section.icon}
              {section.track}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {section.courses.map((c) => (
                <div key={c.id} className="glass-panel" style={{ padding: "1.5rem", borderTop: "3px solid var(--primary-color)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "1rem", margin: 0 }}>{c.title}</h3>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", background: "var(--bg-subtle)", padding: "0.15rem 0.5rem", borderRadius: "999px", border: "1px solid var(--border-color)", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                      {c.level}
                    </span>
                  </div>
                  <Link href={`/courses/${c.id}`} className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", fontSize: "0.9rem", padding: "0.6rem 1rem" }}>
                    View Course
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
