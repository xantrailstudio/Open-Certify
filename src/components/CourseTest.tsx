"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { startExamAction, submitExamAction } from "@/app/actions/exam";
import Link from "next/link";
import styles from "./CourseTest.module.css";

interface ClientQuestion {
  question: string;
  options: string[];
}

interface ClientCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  track: string;
  passingScore: number;
  xp: number;
  modules: { title: string; description: string }[];
  questions: ClientQuestion[];
}

export default function CourseTest({ course }: { course: ClientCourse }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [examLoading, setExamLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  // Anti-cheating states
  const [warnings, setWarnings] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/courses/${course.id}/test`);
    }
  }, [user, loading, router, course.id]);

  // Load exam session on mount securely from backend
  useEffect(() => {
    if (user) {
      const initExam = async () => {
        try {
          const res = await startExamAction(course.id, user.uid);
          if (res.success) {
            setQuestions(res.questions);
            setSelected(new Array(res.questions.length).fill(-1));
          }
        } catch (e) {
          console.error("Failed to initialize exam session:", e);
        } finally {
          setExamLoading(false);
        }
      };
      initExam();
    }
  }, [course.id, user]);

  // Block right-clicks and text selection / copying
  useEffect(() => {
    const handleContextAndCopy = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextAndCopy);
    document.addEventListener("copy", handleContextAndCopy);

    return () => {
      document.removeEventListener("contextmenu", handleContextAndCopy);
      document.removeEventListener("copy", handleContextAndCopy);
    };
  }, []);

  // Submit Exam handler
  const submit = async (force: boolean = false) => {
    if (!user || submitting) return;

    const allAnswered = !selected.includes(-1);
    if (!force && !allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitExamAction(course.id, selected, user.uid);
      if (res.success) {
        setResult({ score: res.score, total: res.total, passed: res.passed });
      }
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Failed to submit exam.");
    } finally {
      setSubmitting(false);
    }
  };

  // Tab switch detection (HTML5 Page Visibility API)
  useEffect(() => {
    if (questions.length === 0 || result || examLoading) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const nextWarnings = prev + 1;
          if (nextWarnings > 2) {
            alert("Exceeded maximum tab switches. Your exam is being automatically submitted.");
            // Submit with current answers state asynchronously
            submit(true);
          } else {
            alert(`Warning: Tab switching is strictly monitored. Next time it will auto-submit! (Warnings: ${nextWarnings}/2)`);
          }
          return nextWarnings;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [questions.length, result, examLoading, selected]);

  // Question countdown timer (40 seconds per question)
  useEffect(() => {
    if (questions.length === 0 || result || examLoading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (current < questions.length - 1) {
            // Auto advance to next question
            setCurrent((c) => c + 1);
            return 40;
          } else {
            // Last question: Auto submit quiz
            submit(true);
            clearInterval(timer);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current, questions.length, result, examLoading, selected]);

  // Reset timer on change of question
  useEffect(() => {
    setTimeLeft(40);
  }, [current]);

  const pick = (idx: number) => {
    const next = [...selected];
    next[current] = idx;
    setSelected(next);
  };

  if (loading || examLoading || !user) {
    return <div className={styles.centerContainer}>Loading Exam...</div>;
  }

  if (result) return (
    <div className={`container animate-fade-in ${styles.resultWrapper}`}>
      <div className={`glass-panel ${styles.resultCard}`}>
        <h2 className={styles.resultHeader}>Exam Complete!</h2>
        <p>{course.title}</p>
        <div className={styles.scoreText} style={{ color: result.passed ? "var(--success)" : "var(--danger)" }}>
          {result.score}/{result.total}
        </div>
        <p className={styles.statusText} style={{ color: result.passed ? "var(--success)" : "var(--danger)" }}>
          {result.passed ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {`You passed and earned ${course.xp} XP!`}
            </>
          ) : `You need ${Math.ceil(course.passingScore * 100)}% to pass. Keep studying!`}
        </p>
        <div className={styles.resultButtons}>
          <Link href={`/courses/${course.id}`} className="btn btn-outline" style={{ flex: 1 }}>Review Course</Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ flex: 1 }}>Dashboard</Link>
        </div>
      </div>
    </div>
  );

  const q = questions[current];
  if (!q) return <div className={styles.centerContainer}>Loading Question...</div>;

  const progress = ((current + 1) / questions.length) * 100;
  const allAnswered = !selected.includes(-1);

  return (
    <div className={`container animate-fade-in ${styles.testContainer} ${styles.noSelect}`}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div className={styles.progressInfo}>
          <span className={styles.progressInfoTitle}>{course.title}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className={`${styles.timerContainer} ${timeLeft <= 10 ? styles.timerWarn : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {timeLeft}s
            </div>
            <span>Question {current + 1} / {questions.length}</span>
          </div>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`glass-panel ${styles.questionPanel}`}>
        <p className={styles.questionCountLabel}>
          Question {current + 1}
        </p>
        <h2 className={styles.questionTitle}>{q.question}</h2>
        <div className={styles.optionsList}>
          {q.options.map((opt, idx) => {
            const isSelected = selected[current] === idx;
            return (
              <button
                key={idx}
                onClick={() => pick(idx)}
                className={`${styles.optionButton} ${isSelected ? styles.optionButtonSelected : styles.optionButtonDefault}`}
              >
                <span className={`${styles.optionBadge} ${isSelected ? styles.optionBadgeSelected : styles.optionBadgeDefault}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.actionRow}>
        <button
          className="btn btn-outline"
          onClick={() => setCurrent(c => c - 1)}
          disabled={current === 0}
          style={{ opacity: current === 0 ? 0.4 : 1 }}
        >
          ← Previous
        </button>

        <div className={styles.dotsWrapper}>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={styles.dotBubble}
              style={{
                background: i === current ? "var(--primary-color)" : selected[i] !== -1 ? "#dbeafe" : "var(--border-color)",
                color: i === current ? "#fff" : selected[i] !== -1 ? "var(--primary-color)" : "var(--text-muted)",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current === questions.length - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => submit(false)}
            disabled={submitting || !allAnswered}
            style={{ opacity: !allAnswered ? 0.6 : 1 }}
          >
            {submitting ? "Submitting…" : "Submit Exam"}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => setCurrent(c => c + 1)}>
            Next →
          </button>
        )}
      </div>
      {!allAnswered && current === questions.length - 1 && (
        <p className={styles.warnMessage}>
          Please answer all questions before submitting.
        </p>
      )}
    </div>
  );
}
