import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStudentCourse from "../../hooks/StudentCourseHook";
import useStudentHook from "../../hooks/StudentHooks";
import useAttendanceHook from "../../hooks/AttendanceHook";

const AttendanceView = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [absentStudent, setAbsentStudent] = useState([]);
  const [presentStudent, setPresentStudent] = useState([]);
  /**
   * lessonInfo: {
      lessonId: lessonId,
      courseId: 2,
      course: {id: 6, name: 'jessus kurssi2233', lessonIds: Array(3), assignmentIds: Array(0), teacherNames: Array(0)},
    }
   */
  const [lessonInfo, setLessonInfo] = useState({});

  const { getCourseStudents } = useStudentCourse();
  const { getStudent } = useStudentHook();
  const { postAttendance } = useAttendanceHook();

  const absentToPresent = (student) => {
    setPresentStudent((prev) => [...prev, student]);

    setAbsentStudent((prev) =>
      prev.filter((s) => s.studentID !== student.studentID),
    );
  };

  const presentToAbsent = (student) => {
    setAbsentStudent((prev) => [...prev, student]);

    setPresentStudent((prev) =>
      prev.filter((s) => s.studentID !== student.studentID),
    );
  };

  const postAttendances = async (student, isPresent) => {
    const attendance = {
      present: isPresent,
      lessonId: lessonInfo.lessonId,
      lessonDate: "",
    };

    const success = await postAttendance(student.studentID, attendance);
    if (!success)
      console.log(
        `Student ${student.firstName} ${student.lastName} logging failed`,
      );
    return success;
  };

  const handlePostAttendances = async () => {
    const result = await Promise.all([
      ...presentStudent.map((student) => postAttendances(student, true)),
      ...absentStudent.map((student) => postAttendances(student, false)),
    ]);

    const failedCount = (await result).filter((success) => !success).length;
    if (failedCount > 0) {
      console.log(`${failedCount} attendance posts failed`);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const updateStudentList = () => {};
  }, [presentStudent, absentStudent]);

  useEffect(() => {
    const initialStudents = async () => {
      if (!lessonInfo) return;
      if (!lessonInfo.courseId) return;
      const studentsInCourse = await getCourseStudents(lessonInfo.courseId);
      const allStudents = Promise.all(
        studentsInCourse.map((studentId) => {
          return getStudent(studentId);
        }),
      );
      setAbsentStudent((await allStudents).filter(Boolean));
    };
    initialStudents();
  }, [lessonInfo]);

  useEffect(() => {
    const initLessonInfo = () => {
      if (!state) {
        window.alert("How did you get here without state?");
        return;
      }
      console.log(state);
      setLessonInfo(state);
    };
    initLessonInfo();
  }, []);

  return (
    <>
      <h1>
        {lessonInfo?.course?.name
          ? lessonInfo?.course?.name
          : "Placeholder name"}
      </h1>
      <img src="/images/qr_code.svg" alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Present student:</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {presentStudent.map((student) => (
            <button
              key={student.studentID}
              id={student.studentID}
              onClick={() => {
                presentToAbsent(student);
              }}
            >
              {student.firstName} {student.lastName}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Current users:</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {absentStudent.map((student) => (
            <button
              key={student.studentID}
              id={student.studentID}
              onClick={() => {
                absentToPresent(student);
              }}
            >
              {student.firstName} {student.lastName}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={async () => {
          const ok = await handlePostAttendances();
          if (!ok) return;
          else {
            navigate("/courses/manage", {
              state: { course: lessonInfo.course },
            });
          }
        }}
      >
        Stop attendance marking
      </button>
    </>
  );
};

export default AttendanceView;
