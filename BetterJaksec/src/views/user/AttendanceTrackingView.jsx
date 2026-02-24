import React from "react";
import useStudentData from "../../hooks/UseStudentDataHook";
import AttendanceCircle from "../../components/AttendanceCircle";

const AttendanceTrackingView = () => {
  const student = useStudentData();
  if (!student) return <div>Loading...</div>;

  const totalLessons = student.attendance?.length || 0;
  const attendedLessons =
    student.attendance?.filter((item) => item.present).length || 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "50px",
        gap: "60px",
      }}
    >
      {/* Attendance list */}
      <div style={{ flex: 2 }}>
        <h2 style={{ marginBottom: "20px" }}>Attendance List</h2>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            maxHeight: "600px",
            overflowY: "auto",
          }}
        >
          {student.attendance?.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "14px",
                marginBottom: "12px",
                borderRadius: "6px",
                backgroundColor: item.present ? "#d4edda" : "#f8d7da",
                fontSize: "20px",
              }}
            >
              {new Date(item.lessonDate).toLocaleDateString()} —{" "}
              {item.present ? "yes" : "no"}
            </div>
          ))}
        </div>
      </div>

      {/* Attendance circle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
        <AttendanceCircle
          attended={attendedLessons}
          total={totalLessons}
          size={250}
        />
      </div>
    </div>
  );
};

export default AttendanceTrackingView;