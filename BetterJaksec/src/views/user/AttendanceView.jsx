import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStudentCourse from "../../hooks/StudentCourseHook";
import useStudentHook from "../../hooks/StudentHooks";
import useAttendanceHook from "../../hooks/AttendanceHook";
import QRGenerator from "../../components/QRGenerator.jsx";
import useStudentAttendance from "../../hooks/StudentAttendanceHook";

const AttendanceView = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [absentStudent, setAbsentStudent] = useState([]);
  const [presentStudent, setPresentStudent] = useState([]);
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
    if (!lessonInfo.lessonId) return;

    const fetchAttendance = async () => {
      const studentIds = await getCourseStudents(lessonInfo.courseId);
      const allStudents = await Promise.all(
        studentIds.map((id) => getStudent(id)),
      );
      const validStudents = allStudents.filter(Boolean);

      const present = [];
      const absent = [];

      validStudents.forEach((student) => {
        const attended = student.attendance?.some(
          (att) => att.lessonId === lessonInfo.lessonId && att.present,
        );
        if (attended) present.push(student);
        else absent.push(student);
      });

      setPresentStudent(present);
      setAbsentStudent(absent);
    };

    fetchAttendance();
    const interval = setInterval(fetchAttendance, 60000);
    return () => clearInterval(interval);
  }, [lessonInfo.lessonId]);
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
    <div className="main-card inner-card--stack">
      <h1>
        {lessonInfo?.course?.name
          ? lessonInfo?.course?.name
          : "Placeholder name"}
      </h1>
      <QRGenerator value={{ lessonId: lessonInfo.lessonId }} size={256} />
      <div className="inner-card inner-card--stack">
        <h2>Present student:</h2>
        <div className="inner-card inner-card--wrap">
          {presentStudent.map((student) => (
            <button
              className="btn"
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

      <div className="inner-card inner-card--stack">
        <h2>Current users:</h2>
        <div className="inner-card inner-card--wrap">
          {absentStudent.map((student) => (
            <button
              className="btn"
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
        className="btn btn--primary"
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
    </div>
  );
};

export default AttendanceView;
