import { getCourse } from "@/lib/courses";
import CourseTest from "@/components/CourseTest";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function Page({ params }: Props) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) {
    notFound();
  }

  // Remove the answers from questions to keep them out of client inspect/scope
  const sanitizedQuestions = course.questions.map((q) => ({
    question: q.question,
    options: q.options,
  }));

  const sanitizedCourse = {
    id: course.id,
    title: course.title,
    description: course.description,
    level: course.level,
    track: course.track,
    passingScore: course.passingScore,
    xp: course.xp,
    modules: course.modules,
    questions: sanitizedQuestions,
  };

  return <CourseTest course={sanitizedCourse} />;
}
