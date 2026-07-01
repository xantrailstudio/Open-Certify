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
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
