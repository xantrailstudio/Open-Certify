import Link from "next/link";

export default function HtmlCourseOverview() {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 2rem' }}>
      <div className="hero" style={{ minHeight: 'auto', marginBottom: '3rem', alignItems: 'flex-start', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
          <Link href="/dashboard" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Dashboard</Link>
          <span>/</span>
          <span>Courses</span>
          <span>/</span>
          <span>HTML</span>
        </div>
        <h1 style={{ textAlign: 'left', marginBottom: '0.5rem' }}>HTML Fundamentals</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 0 2rem' }}>
          Master the building blocks of the web. This course covers everything from basic tags to semantic structure, preparing you for the official OpenCertify HTML exam.
        </p>
        <Link href="/courses/html/test" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Take the Certification Exam
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(200px, 1fr)', gap: '3rem' }}>
        <div>
          <h2 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Syllabus</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Module 1: Introduction to Web Design</h3>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Understand how browsers read HTML to structure web pages.</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Module 2: Text Formatting and Links</h3>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Learn paragraphs, headings, bold tags, and anchor links.</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Module 3: Forms and Inputs</h3>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Gather user data easily using input fields and labels.</p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Module 4: Semantic HTML5</h3>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Structure your documents logically for SEO and accessibility (header, footer, article).</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Course Details</h3>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Level:</span>
                <strong>Beginner</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Exam Questions:</span>
                <strong>4</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Passing Score:</span>
                <strong>75%</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Reward:</span>
                <strong>100 XP</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
