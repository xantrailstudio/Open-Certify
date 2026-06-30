"use client";

import Link from "next/link";
import { type Course } from "@/lib/courses";

export default function CourseOverview({ course }: { course: Course }) {
  return (
    <div className="container animate-fade-in" style={{ padding: "3rem 2rem" }}>
      <div
        className="hero"
        style={{
          minHeight: "auto",
          alignItems: "flex-start",
          textAlign: "left",
          padding: "3rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          <Link href="/dashboard" style={{ color: "var(--primary-color)", textDecoration: "none" }}>
            Dashboard
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-muted)" }}>{course.track}</span>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-muted)" }}>{course.title}</span>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span
            style={{
              background: "var(--bg-subtle)",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--primary-color)",
              border: "1px solid var(--border-color)",
            }}
          >
            {course.track}
          </span>
          <span
            style={{
              background: "var(--bg-subtle)",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              border: "1px solid var(--border-color)",
            }}
          >
            {course.level}
          </span>
        </div>

        <h1 style={{ textAlign: "left", fontSize: "2.5rem", marginBottom: "0.75rem" }}>
          {course.title}
        </h1>
        <p style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 0 2rem" }}>
          {course.description}
        </p>
        <Link
          href={`/courses/${course.id}/test`}
          className="btn btn-primary"
          style={{ padding: "1rem 2rem", fontSize: "1.05rem" }}
        >
          Take Certification Exam →
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 2fr) minmax(220px, 1fr)",
          gap: "3rem",
        }}
      >
        <div>
          <h2
            style={{
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "0.5rem",
              marginBottom: "1.5rem",
              fontSize: "1.5rem",
            }}
          >
            Syllabus
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {course.modules.map((mod, i) => (
              <div key={i} className="glass-panel" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span
                    style={{
                      minWidth: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "var(--primary-color)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 style={{ marginBottom: "0.3rem", fontSize: "1rem" }}>{mod.title}</h3>
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>{mod.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="glass-panel" style={{ padding: "2rem" }}>
            <h3 style={{ marginBottom: "1.25rem" }}>Exam Details</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                ["Level", course.level],
                ["Questions", course.questions.length.toString()],
                ["Passing Score", `${course.passingScore * 100}%`],
                ["Reward", `${course.xp} XP`],
              ].map(([label, val]) => (
                <li
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--bg-subtle)",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>{label}:</span>
                  <strong style={{ color: "var(--text-main)" }}>{val}</strong>
                </li>
              ))}
            </ul>
            <Link
              href={`/courses/${course.id}/test`}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1.5rem" }}
            >
              Start Exam
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
