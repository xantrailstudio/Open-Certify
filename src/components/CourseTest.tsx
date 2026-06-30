"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { recordExamResult } from "@/lib/firebase/firestore";
import { type Course } from "@/lib/courses";
import Link from "next/link";

export default function CourseTest({ course }: { course: Course }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number[]>(new Array(course.questions.length).fill(-1));
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push(`/login?redirect=/courses/${course.id}/test`);
  }, [user, loading, router, course.id]);

  const pick = (idx: number) => {
    const next = [...selected];
    next[current] = idx;
    setSelected(next);
  };

  const submit = async () => {
    if (!user) return;
    setSubmitting(true);
    const score = selected.reduce((acc, s, i) => acc + (s === course.questions[i].answer ? 1 : 0), 0);
    const passed = score / course.questions.length >= course.passingScore;
    try {
      await recordExamResult(user.uid, course.id, { courseId: course.id, score, total: course.questions.length, passed });
      setResult({ score, total: course.questions.length, passed });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) return <div className="container" style={{ textAlign: "center", padding: "4rem" }}>Loading...</div>;

  if (result) return (
    <div className="container animate-fade-in" style={{ padding: "4rem 2rem", display: "flex", justifyContent: "center" }}>
      <div className="glass-panel" style={{ textAlign: "center", maxWidth: "500px", width: "100%" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Exam Complete!</h2>
        <p>{course.title}</p>
        <div style={{ fontSize: "5rem", fontWeight: 700, margin: "1.5rem 0", color: result.passed ? "var(--success)" : "var(--danger)" }}>
          {result.score}/{result.total}
        </div>
        <p style={{ fontSize: "1.1rem", fontWeight: 600, color: result.passed ? "var(--success)" : "var(--danger)" }}>
          {result.passed ? `You passed and earned ${course.xp} XP! 🎉` : `You need ${Math.ceil(course.passingScore * 100)}% to pass. Keep studying!`}
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <Link href={`/courses/${course.id}`} className="btn btn-outline" style={{ flex: 1 }}>Review Course</Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ flex: 1 }}>Dashboard</Link>
        </div>
      </div>
    </div>
  );

  const q = course.questions[current];
  const progress = ((current + 1) / course.questions.length) * 100;
  const allAnswered = !selected.includes(-1);

  return (
    <div className="container animate-fade-in" style={{ padding: "3rem 2rem", maxWidth: "800px" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <span style={{ fontWeight: 600, color: "var(--text-main)" }}>{course.title}</span>
          <span>Question {current + 1} / {course.questions.length}</span>
        </div>
        <div style={{ width: "100%", height: "6px", background: "var(--border-color)", borderRadius: "3px" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "var(--primary-color)", borderRadius: "3px", transition: "width 0.3s ease" }} />
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--primary-color)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
          Question {current + 1}
        </p>
        <h2 style={{ fontSize: "1.4rem", lineHeight: 1.5, marginBottom: "2rem" }}>{q.question}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {q.options.map((opt, idx) => {
            const isSelected = selected[current] === idx;
            return (
              <button
                key={idx}
                onClick={() => pick(idx)}
                style={{
                  padding: "1rem 1.25rem",
                  textAlign: "left",
                  background: isSelected ? "#eff6ff" : "#fff",
                  border: isSelected ? "2px solid var(--primary-color)" : "1px solid var(--border-color)",
                  borderRadius: "8px",
                  color: "var(--text-main)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ display: "inline-flex", width: "22px", height: "22px", borderRadius: "50%", background: isSelected ? "var(--primary-color)" : "var(--border-color)", color: isSelected ? "#fff" : "var(--text-muted)", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, marginRight: "0.75rem" }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn btn-outline" onClick={() => setCurrent(c => c - 1)} disabled={current === 0} style={{ opacity: current === 0 ? 0.4 : 1 }}>
          ← Previous
        </button>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          {course.questions.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: "32px", height: "32px", borderRadius: "50%", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
              background: i === current ? "var(--primary-color)" : selected[i] !== -1 ? "#dbeafe" : "var(--border-color)",
              color: i === current ? "#fff" : selected[i] !== -1 ? "var(--primary-color)" : "var(--text-muted)",
            }}>{i + 1}</button>
          ))}
        </div>

        {current === course.questions.length - 1 ? (
          <button className="btn btn-primary" onClick={submit} disabled={submitting || !allAnswered} style={{ opacity: !allAnswered ? 0.6 : 1 }}>
            {submitting ? "Submitting…" : "Submit Exam"}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setCurrent(c => c + 1)}>
            Next →
          </button>
        )}
      </div>
      {!allAnswered && current === course.questions.length - 1 && (
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Please answer all questions before submitting.
        </p>
      )}
    </div>
  );
}
