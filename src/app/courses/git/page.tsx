import CourseOverview from '@/components/CourseOverview';
import { getCourse } from '@/lib/courses';

export default function Page() {
  const course = getCourse('git')!;
  return <CourseOverview course={course} />;
}
