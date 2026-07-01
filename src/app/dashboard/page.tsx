"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getUserProfile, UserProfile } from "@/lib/firebase/firestore";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        try {
          const data = await getUserProfile(user.uid);
          setProfile(data);
        } catch (error) {
          console.error("Failed to fetch profile", error);
        } finally {
          setFetching(false);
        }
      }
    }
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading || fetching || !user) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2>Welcome, {user.email?.split('@')[0]}!</h2>
        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Profile Stats */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Your Stats</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Total Points:</span>
            <strong style={{ color: 'var(--primary-color)' }}>{profile?.points || 0} XP</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Certificates Completed:</span>
            <strong>{profile?.history?.filter(h => h.passed).length || 0}</strong>
          </div>
        </div>

        {/* Current Courses */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Course Catalog</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-main)' }}>HTML Certification</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Master the basics of the web.</p>
              </div>
              <Link href="/courses/html" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Open
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-main)' }}>CSS Styling</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Master responsive layout and design.</p>
              </div>
              <Link href="/courses/css" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Open
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Next.js Full-Stack</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Next.js App Router and server actions.</p>
              </div>
              <Link href="/courses/nextjs" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Open
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-main)' }}>Python for Beginners</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Syntaxes, collections and function basics.</p>
              </div>
              <Link href="/courses/python" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Open
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* history */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Exam History</h3>
        {(!profile?.history || profile.history.length === 0) ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ margin: 0 }}>You haven&apos;t taken any exams yet.</p>
          </div>
        ) : (
          <div className="glass-panel">
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 0' }}>Course</th>
                  <th style={{ padding: '1rem 0' }}>Date</th>
                  <th style={{ padding: '1rem 0' }}>Score</th>
                  <th style={{ padding: '1rem 0' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {profile.history.map((exam, idx) => {
                  // Safely parse date - Firestore Timestamp objects have .toDate(), ISO strings work in new Date()
                  let dateStr = '—';
                  try {
                    const raw = exam.date as any;
                    const d = raw?.toDate ? raw.toDate() : new Date(raw);
                    if (!isNaN(d.getTime())) dateStr = d.toLocaleDateString();
                  } catch {}

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 0', textTransform: 'uppercase' }}>{exam.courseId || '—'}</td>
                      <td style={{ padding: '1rem 0' }}>{dateStr}</td>
                      <td style={{ padding: '1rem 0' }}>{exam.score ?? '?'} / {exam.total ?? '?'}</td>
                      <td style={{ padding: '1rem 0' }}>
                        <span style={{ 
                          background: exam.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', 
                          color: exam.passed ? 'var(--success)' : 'var(--danger)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}>
                          {exam.passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
