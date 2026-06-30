"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { recordExamResult } from "@/lib/firebase/firestore";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language",
      "Hyperlink and Text Markup Language"
    ],
    answer: 1
  },
  {
    id: 2,
    question: "Which tag is used for creating a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    answer: 0
  },
  {
    id: 3,
    question: "Where should the <title> tag be placed?",
    options: ["Inside the <body>", "Inside the <header>", "Inside the <head>", "At the end of the document"],
    answer: 2
  },
  {
    id: 4,
    question: "Which of the following is an HTML5 semantic element?",
    options: ["<div>", "<article>", "<span>", "<b>"],
    answer: 1
  }
];

export default function TestPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(new Array(questions.length).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number, total: number, passed: boolean } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/courses/html/test");
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
      courseId: "html",
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
              {result.passed ? "Congratulations! You passed the exam!" : "You didn't pass this time. Review the materials and try again."}
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
      
      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'var(--glass-border)', borderRadius: '4px' }}>
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
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{currentQ.question}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOptions[currentQuestion] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  background: isSelected ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                  border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative'
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
