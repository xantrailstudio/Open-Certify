import Link from "next/link";

export default function CssCourseOverview() {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 2rem' }}>
      <div className="hero" style={{ minHeight: 'auto', marginBottom: '3rem', alignItems: 'flex-start', textAlign: 'left', padding: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
          <Link href="/dashboard" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Dashboard</Link>
          <span>/</span>
          <span>Courses</span>
          <span>/</span>
          <span>CSS</span>
        </div>
        <h1 style={{ textAlign: 'left', marginBottom: '0.5rem' }}>CSS Styling</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 0 2rem' }}>
          Take full control of web design with modern CSS principles. Learn selectors, Flexbox, Grid, and responsive design techniques.
        </p>
        <Link href="/courses/css/test" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Take the Certification Exam
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(200px, 1fr)', gap: '3rem' }}>
        <div>
          <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Syllabus</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Module 1: Selectors and Specificity</h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Target elements precisely and understand the cascade.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Module 2: Box Model</h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Master margins, padding, borders, and dimensions.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Module 3: Modern Layouts (Flexbox & Grid)</h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Build complex 1D and 2D responsive layouts easily.</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Course Details</h3>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '0.5rem' }}>
                <span>Level:</span>
                <strong style={{ color: 'var(--text-main)' }}>Intermediate</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '0.5rem' }}>
                <span>Exam Questions:</span>
                <strong style={{ color: 'var(--text-main)' }}>4</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '0.5rem' }}>
                <span>Passing Score:</span>
                <strong style={{ color: 'var(--text-main)' }}>75%</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Reward:</span>
                <strong style={{ color: 'var(--text-main)' }}>150 XP</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
