export interface Question {
  question: string;
  options: string[];
  answer: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  track: string;
  passingScore: number;
  xp: number;
  modules: { title: string; description: string }[];
  questions: Question[];
}

export const courses: Course[] = [
  {
    id: "html",
    title: "HTML Fundamentals",
    description: "Master the building blocks of the web with semantic HTML5 elements.",
    level: "Beginner",
    track: "Web Development",
    passingScore: 0.75,
    xp: 100,
    modules: [
      { title: "Introduction to Web Design", description: "How browsers parse and render HTML documents." },
      { title: "Text Formatting and Links", description: "Headings, paragraphs, bold, italic, and anchor tags." },
      { title: "Forms and Inputs", description: "Gather user data with form elements and labels." },
      { title: "Semantic HTML5", description: "Structure documents with header, footer, article, and section." },
    ],
    questions: [
      { question: "What does HTML stand for?", options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Tool Multi Language", "Hyperlink and Text Markup Language"], answer: 1 },
      { question: "Which tag creates a hyperlink?", options: ["<a>", "<link>", "<href>", "<hyper>"], answer: 0 },
      { question: "Where should <title> be placed?", options: ["Inside <body>", "Inside <header>", "Inside <head>", "End of document"], answer: 2 },
      { question: "Which is an HTML5 semantic element?", options: ["<div>", "<article>", "<span>", "<b>"], answer: 1 },
    ],
  },
  {
    id: "css",
    title: "CSS Styling",
    description: "Control web design with modern CSS including Flexbox, Grid and Media Queries.",
    level: "Beginner",
    track: "Web Development",
    passingScore: 0.75,
    xp: 150,
    modules: [
      { title: "Selectors and Specificity", description: "Target elements precisely with the cascade." },
      { title: "Box Model", description: "Master margins, padding, borders, and dimensions." },
      { title: "Modern Layouts", description: "Build complex layouts with Flexbox and Grid." },
      { title: "Responsive Design", description: "Use media queries to adapt layouts to any screen." },
    ],
    questions: [
      { question: "Which property changes background color?", options: ["color", "bgcolor", "background-color", "bg-color"], answer: 2 },
      { question: "How do you select the element with id 'header'?", options: [".header", "#header", "header", "*header"], answer: 1 },
      { question: "What does z-index control?", options: ["Font size", "Stacking order", "Zoom level", "Opacity"], answer: 1 },
      { question: "Which value is NOT valid for display?", options: ["flex", "grid", "inline-block", "float"], answer: 3 },
    ],
  },
  {
    id: "react",
    title: "React Mastery",
    description: "Build dynamic interfaces using the world's leading UI library.",
    level: "Intermediate",
    track: "Web Development",
    passingScore: 0.8,
    xp: 300,
    modules: [
      { title: "Components and Props", description: "Modular UI composition and data passing." },
      { title: "State and Hooks", description: "Manage state with useState and useReducer." },
      { title: "Side Effects & Fetching", description: "Sync components with the outside world using useEffect." },
      { title: "Performance", description: "Optimize with useMemo, useCallback, and React.memo." },
    ],
    questions: [
      { question: "Which hook manages component state?", options: ["useData", "useState", "useEffect", "useComponent"], answer: 1 },
      { question: "Which statement about props is true?", options: ["They are mutable", "Passed from parent to child", "Must always be strings", "Functions cannot be props"], answer: 1 },
      { question: "Which hook memoizes expensive computations?", options: ["useReducer", "React.Fragment", "useMemo", "useContext"], answer: 2 },
      { question: "What does calling setState trigger?", options: ["Immediate DOM update", "Component re-render", "In-place sync update", "Nothing until reload"], answer: 1 },
      { question: "How do you prevent infinite loops in useEffect?", options: ["Pass [] as dependency array", "Use useMemo instead", "Avoid arrow functions", "Return true from effect"], answer: 0 },
    ],
  },
  {
    id: "responsive-web-design",
    title: "Responsive Web Design",
    description: "Build pixel-perfect responsive layouts using HTML5, CSS Flexbox, Grid, and Media Queries.",
    level: "Beginner",
    track: "Web Development",
    passingScore: 0.75,
    xp: 200,
    modules: [
      { title: "Semantic HTML5 Elements", description: "Use header, nav, main, footer correctly." },
      { title: "CSS Flexbox", description: "Build flexible, one-dimensional layouts." },
      { title: "CSS Grid", description: "Create powerful two-dimensional page layouts." },
      { title: "Media Queries", description: "Write CSS that adapts to any device width." },
    ],
    questions: [
      { question: "Which CSS property defines a flex container?", options: ["display: flex", "position: flex", "layout: flex", "flex: true"], answer: 0 },
      { question: "Which unit is relative to the viewport width?", options: ["em", "rem", "vw", "px"], answer: 2 },
      { question: "Which HTML5 element represents standalone content?", options: ["<div>", "<section>", "<article>", "<span>"], answer: 2 },
      { question: "What is the default flex-direction?", options: ["column", "row", "row-reverse", "column-reverse"], answer: 1 },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Algorithms & Data Structures",
    description: "Master core JavaScript: variables, loops, OOP, and algorithmic problem solving.",
    level: "Intermediate",
    track: "Web Development",
    passingScore: 0.75,
    xp: 250,
    modules: [
      { title: "Variables and Data Types", description: "var, let, const, primitives and reference types." },
      { title: "Arrays and Loops", description: "Iterating data with for, while, map, filter, reduce." },
      { title: "Functions & OOP", description: "Closures, prototypes, classes and inheritance." },
      { title: "Algorithms", description: "Sorting, searching, and Big-O complexity." },
    ],
    questions: [
      { question: "Which keyword creates a block-scoped variable?", options: ["var", "let", "function", "def"], answer: 1 },
      { question: "What does Array.prototype.map() return?", options: ["A filtered array", "A new array", "The original array", "undefined"], answer: 1 },
      { question: "What is a closure?", options: ["A function that returns undefined", "A function with access to its outer scope", "A class constructor", "An async function"], answer: 1 },
      { question: "What is the Big-O of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answer: 2 },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js Full-Stack Web",
    description: "Build production-grade apps with Next.js App Router, Server Actions, and dynamic routing.",
    level: "Advanced",
    track: "Web Development",
    passingScore: 0.8,
    xp: 350,
    modules: [
      { title: "App Router Architecture", description: "Pages, layouts, and the file-system routing model." },
      { title: "Server Components", description: "Understand the server/client component boundary." },
      { title: "Server Actions & Mutations", description: "Form handling and mutations without API endpoints." },
      { title: "Dynamic Routing", description: "Params, catch-all segments, and parallel routes." },
    ],
    questions: [
      { question: "In Next.js App Router, which folder holds the root layout?", options: ["/pages", "/app", "/src", "/layouts"], answer: 1 },
      { question: "Which directive marks a component as client-side in Next.js?", options: ["'use server'", "'use strict'", "'use client'", "'client only'"], answer: 2 },
      { question: "What is a Server Action?", options: ["A REST API route", "An async server-side function called from the client", "A middleware function", "A client-side event handler"], answer: 1 },
      { question: "How are dynamic segments represented in App Router?", options: ["[folder]", "{folder}", "<folder>", ":folder"], answer: 0 },
      { question: "What does generateStaticParams() do in Next.js?", options: ["Fetches client data", "Pre-generates dynamic route params at build time", "Handles server actions", "Creates API routes"], answer: 1 },
    ],
  },
  {
    id: "nodejs",
    title: "Backend with Node.js & Express",
    description: "Create scalable RESTful APIs with routing, middleware, and HTTP handling.",
    level: "Intermediate",
    track: "Web Development",
    passingScore: 0.75,
    xp: 280,
    modules: [
      { title: "Node.js Runtime", description: "Event loop, modules, and npm ecosystem." },
      { title: "Express Fundamentals", description: "Routing, request/response cycle." },
      { title: "Middleware", description: "Authentication, error handling, and body parsing." },
      { title: "RESTful APIs", description: "CRUD endpoints, status codes, and JSON responses." },
    ],
    questions: [
      { question: "What is the Node.js event loop?", options: ["A CSS animation loop", "A mechanism handling async callbacks", "A database query loop", "A frontend rendering loop"], answer: 1 },
      { question: "Which HTTP status code means 'Not Found'?", options: ["200", "201", "401", "404"], answer: 3 },
      { question: "What does Express middleware do?", options: ["Renders HTML", "Intercepts requests/responses", "Creates databases", "Manages state"], answer: 1 },
      { question: "Which method in Express handles POST requests?", options: ["app.get()", "app.use()", "app.post()", "app.request()"], answer: 2 },
    ],
  },
  {
    id: "python",
    title: "Python for Beginners",
    description: "Learn Python syntax, data structures, file handling and problem-solving fundamentals.",
    level: "Beginner",
    track: "Data Science & Python",
    passingScore: 0.75,
    xp: 200,
    modules: [
      { title: "Python Syntax", description: "Variables, data types, and control flow." },
      { title: "Lists and Dictionaries", description: "Core collections and iteration patterns." },
      { title: "Functions", description: "Arguments, return values, and scope." },
      { title: "File Handling", description: "Read and write files using Python's built-in I/O." },
    ],
    questions: [
      { question: "Which keyword defines a function in Python?", options: ["function", "def", "fn", "lambda"], answer: 1 },
      { question: "What data type is {'name': 'Alice'}?", options: ["list", "tuple", "set", "dict"], answer: 3 },
      { question: "What does len([1, 2, 3]) return?", options: ["2", "3", "4", "1"], answer: 1 },
      { question: "Which built-in opens a file for reading?", options: ["read()", "file()", "open()", "load()"], answer: 2 },
    ],
  },
  {
    id: "security-plus",
    title: "CompTIA Security+ Prep",
    description: "Scenario-based certification preparation covering network security, cryptography, and threats.",
    level: "Intermediate",
    track: "Cybersecurity & Systems",
    passingScore: 0.75,
    xp: 400,
    modules: [
      { title: "Network Security", description: "Firewalls, VPNs, IDS/IPS, and network threats." },
      { title: "Threat Identification", description: "Malware types, social engineering, and attack vectors." },
      { title: "Cryptography Basics", description: "Symmetric/asymmetric keys, hashing, and PKI." },
      { title: "Operational Security", description: "Policies, incident response, and risk management." },
    ],
    questions: [
      { question: "Which attack sends unsolicited mass emails?", options: ["Phishing", "Spamming", "Whaling", "Spoofing"], answer: 0 },
      { question: "What does AES stand for?", options: ["Advanced Encryption Standard", "Automatic Encoding System", "Application Error Scan", "Auth Exchange Service"], answer: 0 },
      { question: "Which port does HTTPS use by default?", options: ["80", "21", "443", "22"], answer: 2 },
      { question: "What is a zero-day vulnerability?", options: ["A known patched bug", "An unknown exploit with no existing fix", "A vulnerability fixed same day", "A low-severity bug"], answer: 1 },
    ],
  },
  {
    id: "git",
    title: "Git & GitHub Version Control",
    description: "Master repositories, branching, commits, merging, and collaborative workflows.",
    level: "Beginner",
    track: "Mobile & Cloud",
    passingScore: 0.75,
    xp: 150,
    modules: [
      { title: "Repositories & Commits", description: "Initialize repos and create meaningful commits." },
      { title: "Branching", description: "Create, switch, and manage feature branches." },
      { title: "Merging & Conflicts", description: "Merge branches and resolve merge conflicts." },
      { title: "Collaboration", description: "Pull requests, forks, and GitHub workflows." },
    ],
    questions: [
      { question: "Which command initializes a new Git repository?", options: ["git start", "git init", "git new", "git create"], answer: 1 },
      { question: "Which command stages all changes for a commit?", options: ["git push .", "git commit -a", "git add .", "git stage all"], answer: 2 },
      { question: "What does git merge do?", options: ["Deletes a branch", "Combines two branch histories", "Reverts all commits", "Pushes to remote"], answer: 1 },
      { question: "What is a Pull Request?", options: ["Downloading code", "A request to merge code into a branch", "Pulling from upstream", "A git command"], answer: 1 },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
