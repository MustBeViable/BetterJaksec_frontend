import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseList from "../../components/CourseList";
import ClassAttendanceStatsAdmin from "../../components/admin/ClassAttendanceStatsAdmin";
import useCourseHook from "../../hooks/CourseHook";

const AdminAttendanceTrackingView = () => {
  const { getCourse } = useCourseHook();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const hookData = await getCourse();
        console.log(hookData);
        setCourses(hookData || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [getCourse]);

  const [Users] = useState([
    { name: "Jukka", attendedClasses: 18 },
    { name: "Pekka", attendedClasses: 15 },
    { name: "Liisa", attendedClasses: 20 },
  ]);

  if (loading) return <div>Loading courses...</div>;

  return (
    <div className="main-card inner-card--stack">
      <div className="inner-card inner-card--row">
        <CourseList courses={courses} />

        <div className="inner-card inner-card--row">
          <Link className="btn" to="/">Main</Link>
          <Link className="btn" to="">Return</Link>
        </div>
      </div>

      <ClassAttendanceStatsAdmin students={Users} totalClasses={20} />
    </div>
  );
};

export default AdminAttendanceTrackingView;