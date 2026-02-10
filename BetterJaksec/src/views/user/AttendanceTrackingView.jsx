import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseList from "../../components/CourseList";

const AttendanceTrackingView = () => {
  const [courses] = useState([
    { name: "English" },
    { name: "Math" },
    { name: "Physkkkkkkkkkkkkkics" },
    { name: "Biology" },
  ]);

  const [items] = useState([
    { date: "01.10.2020", attendance: "yes" },
    { date: "02.10.2020", attendance: "no" },
    { date: "03.10.2020", attendance: "yes" },
    { date: "04.10.2020", attendance: "no" },
    { date: "05.10.2020", attendance: "yes" },
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
  </div>


  <div style={{ display: "flex", justifyContent: "space-between" }}>
  {/* Attendance bottom-left */}
  <div style={{ border: "1px solid black", maxHeight: "150px", overflowY: "auto" }}>
    {items.map((item, index) => (
      <div
        key={index}
        style={{
          padding: "5px",
          backgroundColor: item.attendance === "yes" ? "#d4edda" : "#f8d7da",
        }}
      >
        {item.date} — {item.attendance}
      </div>
      
    ))}
    </div>

    <p>attendance %</p>
    </div>
</div>
  );
};

export default AttendanceTrackingView;