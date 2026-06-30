"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function LandingPage() {
  const { user, loading } = useAuth();

  return (
    <div className={`container animate-fade-in ${styles.landingContainer}`}>
      <div className="hero">
        <h1 style={{ textAlign: "center", color: 'var(--primary-color)' }}>
          Elevate Your Tech Career.
        </h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "700px", margin: "1rem auto 2.5rem" }}>
          OpenCertify provides high-quality, completely free certification courses in HTML, CSS, and React. Build your skills, complete milestones, and earn verifiable certificates today.
        </p>
        
        <div className={styles.heroButtonRow}>
          {loading ? null : user ? (
             <Link href="/dashboard" className={`btn btn-primary ${styles.heroButton}`}>
               Go to Dashboard
             </Link>
          ) : (
            <>
              <Link href="/signup" className={`btn btn-primary ${styles.heroButton}`}>
                Start Learning Now
              </Link>
              <Link href="/login" className={`btn btn-outline ${styles.heroButton}`}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className={styles.coursesSection}>
        <h2 className={styles.coursesHeader}>Our Courses</h2>
        <p className={styles.coursesIntro}>
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
          <div key={section.track} className={styles.trackSection}>
            <h3 className={styles.trackHeader}>
              {section.icon}
              {section.track}
            </h3>
            <div className={styles.coursesGrid}>
              {section.courses.map((c) => (
                <div key={c.id} className={`glass-panel ${styles.courseCard}`}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{c.title}</h3>
                    <span className={styles.levelBadge}>
                      {c.level}
                    </span>
                  </div>
                  <Link href={`/courses/${c.id}`} className={`btn btn-primary ${styles.viewButton}`}>
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
