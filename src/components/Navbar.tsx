"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <nav className="nav">
      <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none' }}>
        <span style={{ color: 'var(--primary-color)' }}>Open</span>Certify
      </Link>
      <div className="nav-links">
        <Link href="/courses">Courses</Link>
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button className="btn btn-outline" style={{ padding: '0.4rem 1rem' }} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</Link>
            <Link href="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
