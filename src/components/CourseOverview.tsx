"use client";

import Link from "next/link";
import { type Course } from "@/lib/courses";
import styles from "./CourseOverview.module.css";

export default function CourseOverview({ course }: { course: Course }) {
  if (!course) return null;

  return (
    <div className={`container animate-fade-in ${styles.courseContainer}`}>
      <div className={`hero ${styles.overviewHero}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/dashboard" className={styles.breadcrumbsLink}>
            Dashboard
          </Link>
          <span className={styles.breadcrumbsSeparator}>/</span>
          <span className={styles.breadcrumbsCurrent}>{course.track}</span>
          <span className={styles.breadcrumbsSeparator}>/</span>
          <span className={styles.breadcrumbsCurrent}>{course.title}</span>
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.badgeTrack}>
            {course.track}
          </span>
          <span className={styles.badgeLevel}>
            {course.level}
          </span>
        </div>

        <h1 className={styles.heroTitle}>
          {course.title}
        </h1>
        <p className={styles.heroDesc}>
          {course.description}
        </p>
        <Link
          href={`/courses/${course.id}/test`}
          className={`btn btn-primary ${styles.examLink}`}
        >
          Take Certification Exam →
        </Link>
      </div>

      <div className={styles.contentPlan}>
        <div>
          <h2 className={styles.sectionTitle}>
            Syllabus
          </h2>
          <div className={styles.syllabusList}>
            {course.modules.map((mod, i) => (
              <div key={i} className={`glass-panel ${styles.syllabusCard}`}>
                <div className={styles.moduleRow}>
                  <span className={styles.moduleNum}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className={styles.moduleTitle}>{mod.title}</h3>
                    <p className={styles.moduleDesc}>{mod.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sideBar}>
          <div className={`glass-panel ${styles.detailsCard}`}>
            <h3 className={styles.detailsTitle}>Exam Details</h3>
            <ul className={styles.detailsList}>
              {[
                ["Level", course.level],
                ["Questions", course.questions.length.toString()],
                ["Passing Score", `${course.passingScore * 100}%`],
                ["Reward", `${course.xp} XP`],
              ].map(([label, val]) => (
                <li key={label} className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>{label}:</span>
                  <strong className={styles.detailsValue}>{val}</strong>
                </li>
              ))}
            </ul>
            <Link
              href={`/courses/${course.id}/test`}
              className={`btn btn-primary ${styles.detailsStartButton}`}
            >
              Start Exam
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
