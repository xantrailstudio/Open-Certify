"use server";

import { getCourse } from "@/lib/courses";
import { saveActiveSession, getActiveSession, clearActiveSession, recordExamResult } from "@/lib/firebase/firestore";

interface ClientQuestion {
  question: string;
  options: string[];
}

export async function startExamAction(courseId: string, userId: string) {
  const course = getCourse(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  const allQuestions = [...course.questions];
  
  // Shuffle all questions to randomize order
  const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
  
  // Pool questions (up to 30)
  const pooledQuestions = shuffledQuestions.slice(0, Math.min(30, shuffledQuestions.length));

  const clientQuestions: ClientQuestion[] = [];
  const correctAnswers: number[] = [];

  pooledQuestions.forEach((q) => {
    // Shuffle choices for this question and track where the original correct answer lands
    const optionsWithIndexes = q.options.map((opt, idx) => ({ opt, idx }));
    const shuffledOptions = [...optionsWithIndexes].sort(() => Math.random() - 0.5);

    const clientOptions = shuffledOptions.map((o) => o.opt);
    const newCorrectIdx = shuffledOptions.findIndex((o) => o.idx === q.answer);

    clientQuestions.push({
      question: q.question,
      options: clientOptions,
    });
    correctAnswers.push(newCorrectIdx);
  });

  // Save the correct answers & start time under the user's active session in Firestore
  const session = {
    courseId,
    correctAnswers,
    startTime: new Date().toISOString(),
  };

  await saveActiveSession(userId, session);

  return {
    success: true,
    questions: clientQuestions,
  };
}

export async function submitExamAction(courseId: string, selectedAnswers: number[], userId: string) {
  const course = getCourse(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  // Retrieve active session from Firestore
  const session = await getActiveSession(userId);
  if (!session || session.courseId !== courseId) {
    throw new Error("No active exam session found for this course.");
  }

  const { correctAnswers } = session;
  if (selectedAnswers.length !== correctAnswers.length) {
    throw new Error("Submitted answers count does not match exam questions count.");
  }

  // Calculate score securely
  let score = 0;
  selectedAnswers.forEach((ans, idx) => {
    if (ans === correctAnswers[idx]) {
      score++;
    }
  });

  const total = correctAnswers.length;
  const passed = score / total >= course.passingScore;

  // Save exam results
  await recordExamResult(userId, courseId, {
    courseId,
    score,
    total,
    passed,
  });

  // Clear out the active session since the exam is complete
  await clearActiveSession(userId);

  return {
    success: true,
    score,
    total,
    passed,
  };
}
