import CourseTest from '@/components/CourseTest';
import { getCourse } from '@/lib/courses';

export default function Page() {
  const course = getCourse('nodejs')!;
  return <CourseTest course={course} />;
}
