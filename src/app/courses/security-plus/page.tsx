import CourseOverview from '@/components/CourseOverview';
import { getCourse } from '@/lib/courses';

export default function Page() {
  const course = getCourse('security-plus')!;
  return <CourseOverview course={course} />;
}
