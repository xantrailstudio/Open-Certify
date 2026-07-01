import { courses } from "@/lib/courses";
import Link from "next/link";

export const metadata = {
  title: "Courses | OpenCertify",
  description: "Browse all free certification courses on OpenCertify — HTML, CSS, Next.js, and Python.",
};

export default function CoursesPage() {
  const tracks = Array.from(new Set(courses.map((c) => c.track)));

  return (
    <div className="container animate-fade-in" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>
          All Courses
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
          Choose a certification course below. Each includes a structured syllabus and a proctored exam.
        </p>
      </div>

      {/* Tracks */}
      {tracks.map((track) => (
        <div key={track} style={{ marginBottom: "3rem" }}>

          {/* Track label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "1.25rem",
            paddingBottom: "0.6rem",
            borderBottom: "2px solid #e2e8f0",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#2563eb", margin: 0, letterSpacing: "0.03em" }}>
              {track}
            </h2>
          </div>

          {/* Course grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {courses.filter((c) => c.track === track).map((course) => (
              <div key={course.id} className="glass-panel" style={{ padding: "1.75rem", borderTop: "3px solid #2563eb", display: "flex", flexDirection: "column", gap: "0.75rem" }}>

                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                    {course.title}
                  </h3>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    background: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                    marginLeft: "0.5rem",
                  }}>
                    {course.level}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0, lineHeight: 1.55 }}>
                  {course.description}
                </p>

                {/* Meta */}
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.82rem", color: "#94a3b8" }}>
                  <span>{course.questions.length} questions</span>
                  <span>·</span>
                  <span>{course.xp} XP</span>
                  <span>·</span>
                  <span>{Math.round(course.passingScore * 100)}% to pass</span>
                </div>

                {/* CTA */}
                <Link
                  href={`/courses/${course.id}`}
                  className="btn btn-primary"
                  style={{ marginTop: "auto", width: "100%", padding: "0.65rem 1rem", fontSize: "0.9rem" }}
                >
                  View Course →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
