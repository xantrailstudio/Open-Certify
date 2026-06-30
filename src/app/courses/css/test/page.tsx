"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { recordExamResult } from "@/lib/firebase/firestore";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "Which property is used to change the background color of an element?",
    options: ["color", "bgcolor", "background-color", "bg-color"],
    answer: 2
  },
  {
    id: 2,
    question: "How do you select an element with the id 'header' in CSS?",
    options: [".header", "#header", "header", "*header"],
    answer: 1
  },
  {
    id: 3,
    question: "What does the z-index property do?",
    options: ["Changes font size", "Controls stacking order", "Adds zoom", "Modifies opacity"],
    answer: 1
  },
  {
    id: 4,
    question: "Which of these is NOT a valid value for the display property?",
    options: ["flex", "grid", "inline-block", "float"],
    answer: 3
  }
];

export default function CssTestPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(new Array(questions.length).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number, total: number, passed: boolean } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/courses/css/test");
    }
  }, [user, loading, router]);

  const handleOptionSelect = (optIndex: number) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestion] = optIndex;
    setSelectedOptions(newSelections);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    let score = 0;
    selectedOptions.forEach((opt, idx) => {
      if (opt === questions[idx].answer) score++;
    });

    const passed = (score / questions.length) >= 0.75;
    const finalResult = {
      courseId: "css",
      score,
      total: questions.length,
      passed
    };

    try {
      await recordExamResult(user.uid, finalResult.courseId, finalResult);
      setResult(finalResult);
    } catch (err) {
      console.error("Failed to save result", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return <div className="container" style={{ textAlign: "center", padding: "4rem" }}>Loading...</div>;
  }

  if (result) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <h2>Exam Complete!</h2>
          <div style={{ margin: '2rem 0' }}>
            <div style={{ 
              fontSize: '4rem', 
              fontWeight: 700, 
              color: result.passed ? 'var(--success)' : 'var(--danger)' 
            }}>
              {result.score}/{result.total}
            </div>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              {result.passed ? "Congratulations! You passed the CSS exam!" : "You didn't pass this time. Review the materials and try again."}
            </p>
          </div>
          <Link href="/dashboard" className="btn btn-primary" style={{ width: '100%' }}>
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 2rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px' }}>
          <div style={{ 
            width: `${progressPercent}%`, 
            height: '100%', 
            background: 'var(--primary-color)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div className="glass-panel">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: 1.4 }}>{currentQ.question}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOptions[currentQuestion] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                style={{
                  padding: '1.25rem',
                  textAlign: 'left',
                  background: isSelected ? 'var(--bg-subtle)' : '#ffffff',
                  border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button 
          className="btn btn-outline" 
          onClick={handlePrev} 
          disabled={currentQuestion === 0}
          style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
        >
          Previous
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit} 
            disabled={isSubmitting || selectedOptions.includes(-1)}
          >
            {isSubmitting ? "Submitting..." : "Submit Exam"}
          </button>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={handleNext} 
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
