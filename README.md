# OpenCertify

**OpenCertify** is a free, open-source certification platform that helps learners build verified tech skills across Web Development, Data Science, Cybersecurity, and more. Complete courses, pass exams, and earn XP — all at no cost.

Live: [open-certify.vercel.app](https://open-certify.vercel.app) &nbsp;|&nbsp; License: MIT

---

## Features

- **10 Certification Tracks** — HTML, CSS, Responsive Design, JavaScript, React, Next.js, Node.js, Python, Security+, and Git
- **MCQ Exam Engine** — Timed, paginated multiple-choice exams with instant pass/fail scoring
- **XP & Progress System** — Earn XP on every passed exam, tracked per user account
- **Exam History Dashboard** — Review past attempts, scores, and certification statuses
- **Authentication** — Email/password sign-up and login powered by Firebase Auth
- **Persistent Data** — Exam results stored in Firestore per user UID
- **Zero Cost** — Fully free for learners; no paywalls, no subscriptions

---

## Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Framework    | Next.js 15 (App Router)             |
| Language     | TypeScript                          |
| Styling      | Vanilla CSS (custom design system)  |
| Auth         | Firebase Authentication             |
| Database     | Firebase Firestore                  |
| Deployment   | Vercel                              |
| Font         | Inter (Google Fonts)                |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page with course catalog
│   ├── layout.tsx            # Root layout (Navbar, AuthContext)
│   ├── globals.css           # Global design system & CSS variables
│   ├── dashboard/page.tsx    # User dashboard (stats, history)
│   ├── courses/[id]/         # Dynamic course overview pages
│   │   ├── page.tsx
│   │   └── test/page.tsx     # Exam interface
│   ├── login/page.tsx
│   └── signup/page.tsx
├── components/
│   ├── Navbar.tsx            # Sticky navigation bar
│   ├── CourseOverview.tsx    # Course details & syllabus
│   └── CourseTest.tsx        # MCQ exam engine component
├── context/
│   └── AuthContext.tsx       # Firebase auth state provider
└── lib/
    ├── courses.ts            # All course data (questions, modules, XP)
    └── firebase/
        ├── config.ts         # Firebase app initialization
        └── firestore.ts      # Firestore read/write helpers
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** (Email/Password) and **Firestore** enabled

### 1. Clone & Install

```bash
git clone https://github.com/xantrailstudio/Open-Certify.git
cd Open-Certify
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Course Catalog

| Track                  | Courses                                                   | Difficulty         |
|------------------------|-----------------------------------------------------------|--------------------|
| Web Development        | HTML, CSS, Responsive Design, JavaScript, React, Next.js, Node.js | Beginner – Advanced |
| Data Science & Python  | Python for Beginners                                      | Beginner           |
| Cybersecurity & Systems | CompTIA Security+ Prep                                   | Intermediate       |
| Mobile & Cloud         | Git & GitHub Version Control                              | Beginner           |

---

## Firestore Schema

```
users/{uid}
  points: number
  history: [
    {
      courseId: string
      score: number
      total: number
      passed: boolean
      date: string (ISO)
    }
  ]
```

---

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push your fork to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add all `NEXT_PUBLIC_FIREBASE_*` environment variables in the Vercel dashboard
4. Deploy

---

## Contributing

Pull requests are welcome. To add a new course:

1. Open `src/lib/courses.ts`
2. Add a new `Course` object to the `courses` array
3. Include at least 4 MCQ questions with an `answer` index
4. Submit a PR — no other files need to change

---

## License

[MIT](./LICENSE) — free to use, modify, and distribute.
