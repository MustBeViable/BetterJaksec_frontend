import { useState, useEffect } from "react";
import useTeacherData from "./UseTeacherData";
import useCourseHook from "./CourseHook";

const useTeacherCourses = () => {
  const teacher = useTeacherData();
  const { getCourse } = useCourseHook();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teacher) return;

    const fetchCourses = async () => {
      try {
        const allCourses = await getCourse(); // calls /api/course/all
        if (!allCourses) return;

        // filter courses that include this teacher
        const myCourses = allCourses.filter(course =>
          course.teacherNames?.includes(`${teacher.firstName} ${teacher.lastName}`)
        );

        setCourses(myCourses);
      } catch (err) {
        console.error("Failed to fetch teacher courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [teacher]);

  return { courses, loading };
};

export default useTeacherCourses;