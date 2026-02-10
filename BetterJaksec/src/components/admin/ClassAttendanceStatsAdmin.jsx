import React from "react";

const ClassAttendanceStatsAdmin = ({ students, totalClasses }) => {
  let totalAttended = 0;
  students.forEach(student => {
    totalAttended += student.attendedClasses;
  });
  const averageAttendance =
    students.length > 0
      ? (totalAttended / (students.length * totalClasses)) * 100
      : 0;

  return (
    <div style={{ display: "flex", justifyContent: "space-between",width:"100%",gap:"20px" }}>
      
      {/*users and their attendance %*/}
      <div style={{ border: "1px solid black", maxHeight: "150px", overflowY: "auto", padding: "5px" }}>
        {students.map((student, index) => (
          <div key={index} style={{ padding: "5px", borderBottom: "1px solid #ccc" }}>
            {student.name} — {student.attendedClasses / totalClasses * 100}%
          </div>
        ))}
      </div>

      {/* average attendance */}
      <div style={{ border: "1px solid black", padding: "10px", minWidth: "120px" }}>
        <p>Average: {averageAttendance}%</p>
      </div>

    </div>
  );
};

export default ClassAttendanceStatsAdmin