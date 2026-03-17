import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStudentCourse from "../../hooks/StudentCourseHook";
import useStudentHook from "../../hooks/StudentHooks";
import useAttendanceHook from "../../hooks/AttendanceHook";
import QRGenerator from "../../components/QRGenerator.jsx";

const AttendanceView = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { state } = useLocation();

  const [absentStudent, setAbsentStudent] = useState([]);
  const [presentStudent, setPresentStudent] = useState([]);
  const [lessonInfo, setLessonInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);

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

    if (!success) {
      console.log(
        `Student ${student.firstName} ${student.lastName} logging failed`,
      );
    }

    return success;
  };

  const handlePostAttendances = async () => {
    const results = await Promise.all([
      ...presentStudent.map((s) => postAttendances(s, true)),
      ...absentStudent.map((s) => postAttendances(s, false)),
    ]);

    const failedCount = results.filter((success) => !success).length;

    if (failedCount > 0) {
      console.log(`${failedCount} attendance posts failed`);
    }

    return failedCount === 0;
  };

  const fetchAttendance = async () => {
    if (!lessonInfo.lessonId || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const studentIds = await getCourseStudents(lessonInfo.courseId);

      const students = await Promise.all(studentIds.map((id) => getStudent(id)));

      const validStudents = students.filter(Boolean);

      const present = [];
      const absent = [];

      validStudents.forEach((student) => {
        const attended = student.attendance?.some(
          (att) => att.lessonId === lessonInfo.lessonId && att.present === true,
        );

        if (attended) {
          present.push(student);
        } else {
          absent.push(student);
        }
      });

      setPresentStudent(present);
      setAbsentStudent(absent);
    } catch (err) {
      console.error(err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state) {
      window.alert(t("missingStateError"));
      return;
    }

    setLessonInfo(state);
  }, [state, t]);

  useEffect(() => {
    if (!lessonInfo.lessonId) return;

    fetchAttendance();

    const interval = setInterval(fetchAttendance, 60000);

    return () => clearInterval(interval);
  }, [lessonInfo.lessonId]);

  return (
    <div className="main-card inner-card--stack">
      <h1>{lessonInfo?.course?.name ?? t("placeholderName")}</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          margin: "0 auto",
          borderRadius: "10px",
          backgroundColor: "#fefcfcff",
          padding: "1rem",
        }}
      >
        <QRGenerator value={{ lessonId: lessonInfo.lessonId }} size={256} />
      </div>
      <button className="btn" onClick={fetchAttendance} disabled={loading}>
        {loading ? t("refreshing") : t("refresh")}
      </button>

      <div className="inner-card inner-card--stack">
        <h2>{t("presentStudents")}</h2>

        <div className="inner-card inner-card--wrap">
          {presentStudent.map((student) => (
            <button
              key={student.studentID}
              className="btn"
              onClick={() => presentToAbsent(student)}
            >
              {student.firstName} {student.lastName}
            </button>
          ))}
        </div>
      </div>

      <div className="inner-card inner-card--stack">
        <h2>{t("absentStudents")}</h2>

        <div className="inner-card inner-card--wrap">
          {absentStudent.map((student) => (
            <button
              key={student.studentID}
              className="btn"
              onClick={() => absentToPresent(student)}
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

          navigate("/courses/manage", {
            state: { course: lessonInfo.course },
          });
        }}
      >
        {t("stopAttendanceMarking")}
      </button>
    </div>
  );
};

export default AttendanceView;
