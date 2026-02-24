import React from "react";
import { Link } from "react-router-dom";
import CourseList from "../../components/CourseList";
import ClassAttendanceStatsAdmin from "../../components/admin/ClassAttendanceStatsAdmin";
import useTeacherCourses from "../../hooks/UseTeacherCourses";

const AdminAttendanceTrackingView = () => {
  const { courses, loading } = useTeacherCourses();

  // For demo purposes, student attendance
  const [Users] = React.useState([
    { name: "Jukka", attendedClasses: 18 },
    { name: "Pekka", attendedClasses: 15 },
    { name: "Liisa", attendedClasses: 20 },
  ]);

  if (loading) return <div>Loading courses...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px", height: "300px", justifyContent: "space-between" }}>
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Courses top-left */}
        <CourseList courses={courses} />

        {/* Navbar top-right */}
        <div>
          <Link to="/">Main</Link>
          <Link to="">Return</Link>
        </div>
      </div>

      {/* Bottom row: attendance stats */}
      <ClassAttendanceStatsAdmin students={Users} totalClasses={20} />
    </div>
  );
};

export default AdminAttendanceTrackingView;