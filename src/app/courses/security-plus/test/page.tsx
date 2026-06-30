import CourseTest from '@/components/CourseTest';
import { getCourse } from '@/lib/courses';

export default function Page() {
  const course = getCourse('security-plus')!;
  return <CourseTest course={course} />;
}
