import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/AuthHooks";
import useStudentHook from "../../hooks/StudentHooks";
import useCourseHook from "../../hooks/CourseHook";
import AttendanceCircle from "../../components/AttendanceCircle";

const AttendanceTrackingView = () => {
  const navigate = useNavigate();
  const { getUserByToken } = useUser();
  const { getStudent } = useStudentHook();
  const { getCourse } = useCourseHook();

  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByToken();
        if (!user?.id) return;

        const [studentData, coursesData] = await Promise.all([
          getStudent(user.id),
          getCourse(),
        ]);

        setStudent(studentData);
        setCourses(coursesData || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!student || courses.length === 0) return <div>Loading...</div>;

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const lessonIds = selectedCourse?.lessonIds || [];

  const currentAttendance = !selectedCourseId
    ? student.attendance || []
    : (student.attendance || []).filter(record =>
        lessonIds.includes(record.lessonId)
      );

  const total = currentAttendance.length;
  const attended = currentAttendance.filter(r => r.present).length;

  return (
    <div className="main-card inner-card--stack">
      <div className="inner-card inner-card--row">
        <h1>Attendance Tracking</h1>
        <button
          className="btn"
          onClick={() => navigate('/')}
        >
          Return
        </button>
      </div>

      <div className="inner-card">
        <label htmlFor="courseSelect">Choose a course:</label>
        <select
          id="courseSelect"
          value={selectedCourseId || ""}
          onChange={(e) =>
            setSelectedCourseId(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="inner-card inner-card--row">
        <div style={{ flex: 2 }}>
          <h2>{selectedCourse?.name || "Overall"} Attendance</h2>
        </div>
        <div style={{ flex: 1 }}>
          <AttendanceCircle attended={attended} total={total} size={200} />
        </div>
      </div>

      <div className="inner-card">
        <h3>Attendance List</h3>
        <div className="inner-card inner-card--stack">
          {currentAttendance.length === 0 ? (
            <p>No attendance records.</p>
          ) : (
            currentAttendance.map((record, idx) => (
              <div
                key={idx}
                className="inner-card"
                style={{
                  backgroundColor: record.present ? "#d4edda" : "#f8d7da",
                  color: record.present ? "#155724" : "#721c24",
                  padding: "8px",
                  margin: "4px 0",
                  borderRadius: "4px",
                }}
              >
                {new Date(record.lessonDate).toLocaleDateString()} —{" "}
                {record.present ? "Present" : "Absent"}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrackingView;