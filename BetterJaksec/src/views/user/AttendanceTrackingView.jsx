import React, { useState, useEffect } from "react";
import { useUser } from "../../hooks/AuthHooks";
import useStudentHook from "../../hooks/StudentHooks";
import AttendanceCircle from "../../components/AttendanceCircle";

const AttendanceTrackingView = () => {
  const { getUserByToken } = useUser();
  const { getStudent } = useStudentHook();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getUserByToken();

        if (!data?.id) return;

        const studentData = await getStudent(data.id);
        setStudent(studentData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, []);

  if (!student) return <div>Loading...</div>;

  const totalLessons = student.attendance?.length || 0;
  const attendedLessons =
    student.attendance?.filter((item) => item.present).length || 0;

  return (
    <div className="main-card inner-card--stack">
      <div className="inner-card inner-card--row">
        <div className="inner-card" style={{ flex: 2 }}>
          <h2>Attendance List</h2>
          <div className="inner-card inner-card--stack">
            {student.attendance?.map((item, index) => (
              <div key={index} className="inner-card">
                {new Date(item.lessonDate).toLocaleDateString()} —{" "}
                {item.present ? "yes" : "no"}
              </div>
            ))}
          </div>
        </div>

        <div className="inner-card" style={{ flex: 1 }}>
          <AttendanceCircle
            attended={attendedLessons}
            total={totalLessons}
            size={250}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrackingView;