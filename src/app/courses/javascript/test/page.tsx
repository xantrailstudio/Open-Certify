import CourseTest from '@/components/CourseTest';
import { getCourse } from '@/lib/courses';

export default function Page() {
  const course = getCourse('javascript')!;
  return <CourseTest course={course} />;
}
