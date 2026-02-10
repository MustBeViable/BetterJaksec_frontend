import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseList from "../../components/CourseList";
import ClassAttendanceStatsAdmin from "../../components/admin/ClassAttendanceStatsAdmin";

const AdminAttendanceTrackingView = () => {
  const [courses] = useState([
    { name: "English" },
    { name: "Math" },
    { name: "Physics" },
    { name: "Biology" },
  ]);

  const [Users] = useState([
    { name: "Jukka", attendedClasses: 18 },
    { name: "Pekka", attendedClasses: 15 },
    { name: "Liisa", attendedClasses: 20 },
  ]);

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

 {/* BOTTOMROW */}
  </div>
<ClassAttendanceStatsAdmin students={Users} totalClasses={20} />
</div>
  );
};

export default AdminAttendanceTrackingView;