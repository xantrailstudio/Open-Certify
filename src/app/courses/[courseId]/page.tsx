import { getCourse } from "@/lib/courses";
import CourseOverview from "@/components/CourseOverview";
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
  return <CourseOverview course={course} />;
}
