import React from "react";

const ClassAttendanceStatsAdmin = ({ students, totalClasses }) => {
  let totalAttended = 0;
  students.forEach((student) => {
    totalAttended += student.attendedClasses;
  });

  const averageAttendance =
    students.length > 0
      ? (totalAttended / (students.length * totalClasses)) * 100
      : 0;

  return (
    <div className="inner-card inner-card--row" style={{ width: "100%" }}>
      <div className="inner-card inner-card--stack" style={{ maxHeight: "150px", overflowY: "auto", flex: 1 }}>
        {students.map((student, index) => (
          <div key={index} className="inner-card">
            {student.name} — {(student.attendedClasses / totalClasses) * 100}%
          </div>
        ))}
      </div>

      <div className="inner-card">
        <p>Average: {averageAttendance}%</p>
      </div>
    </div>
  );
};

export default ClassAttendanceStatsAdmin;