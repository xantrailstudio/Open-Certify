import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

// Types
export interface UserProfile {
  uid: string;
  email: string;
  points: number;
  enrolledCourses: string[];
  history: ExamResult[];
}

export interface ExamResult {
  courseId: string;
  score: number;
  total: number;
  passed: boolean;
  date: string;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!uid) return null;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
}

export async function createUserProfile(uid: string, email: string): Promise<void> {
  const docRef = doc(db, "users", uid);
  const initialData: UserProfile = {
    uid,
    email,
    points: 0,
    enrolledCourses: [],
    history: [],
  };
  await setDoc(docRef, initialData);
}

export async function recordExamResult(uid: string, courseId: string, result: Omit<ExamResult, 'date'>): Promise<void> {
  const userProfile = await getUserProfile(uid);
  if (!userProfile) return;

  const newHistory = [
    ...userProfile.history,
    { ...result, date: new Date().toISOString() }
  ];

  const pointsToAdd = result.passed ? 100 : 10;
  
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    history: newHistory,
    points: userProfile.points + pointsToAdd
  });
}
