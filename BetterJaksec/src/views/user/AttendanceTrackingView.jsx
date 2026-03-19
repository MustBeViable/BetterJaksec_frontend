import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/AuthHooks";
import useStudentHook from "../../hooks/StudentHooks";
import useCourseHook from "../../hooks/CourseHook";
import useAttendanceHook from "../../hooks/AttendanceHook";
import AttendanceCircle from "../../components/AttendanceCircle";
import LanguageSelector from "../../components/LanguageSwitcher";

const AttendanceTrackingView = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const { getUserByToken } = useUser();
  const { getStudent } = useStudentHook();
  const { getCourse } = useCourseHook();
  const { putAttendance } = useAttendanceHook();

  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reasons, setReasons] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getUserByToken();
        if (!user?.id) return;

        const [studentData, coursesData] = await Promise.all([
          getStudent(user.id),
          getCourse(),
        ]);

        setStudent(studentData);
        setCourses(coursesData || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  if (!student || !courses.length) return <div>{t("loading")}</div>;

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const lessonIds = selectedCourse?.lessonIds || [];

  const filteredAttendance = (student.attendance || []).filter(
    (a) => !selectedCourseId || lessonIds.includes(a.lessonId),
  );

  const total = filteredAttendance.length;
  const attended = filteredAttendance.filter((a) => a.present).length;

  const handleReasonChange = (id, value) => {
    setReasons((prev) => ({ ...prev, [id]: value }));
  };

  const handleConfirm = async (record) => {
    const id = record.lessonId + record.lessonDate;
    const reason = reasons[id] ?? "";

    const success = await putAttendance(student.id, record.id, {
      present: record.present,
      reason,
    });

    if (!success) return;

    setStudent((prev) => ({
      ...prev,
      attendance: prev.attendance.map((a) =>
        a.lessonId === record.lessonId && a.lessonDate === record.lessonDate
          ? { ...a, reason }
          : a,
      ),
    }));

    setEditingId(null);
    setReasons((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const buttonStyle = {
    color: "#fff",
    backgroundColor: "#6c7dff",
    border: "1px solid #6c7dff",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 700,
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#d9534f",
    border: "1px solid #d9534f",
  };

  return (
    <div className="main-card inner-card--stack">
      <div className="inner-card inner-card--row">
        <h1>{t("attendanceTracking")}</h1>
        <LanguageSelector></LanguageSelector>
        <button className="btn" onClick={() => navigate("/")}>
          {t("return")}
        </button>
      </div>

      <div className="inner-card">
        <label style={{ fontWeight: "600" }}>{t("chooseCourse")}</label>

        <select
          value={selectedCourseId || ""}
          onChange={(e) =>
            setSelectedCourseId(e.target.value ? Number(e.target.value) : null)
          }
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "1px solid #ccc",
            padding: "6px",
            borderRadius: "6px",
            marginLeft: "8px",
          }}
        >
          <option value="">{t("allCourses")}</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="inner-card inner-card--row">
        <div style={{ flex: 2 }}>
          <h2>{selectedCourse?.name || t("overall")} {t("attendance")}</h2>
        </div>
        <div style={{ flex: 1 }}>
          <AttendanceCircle attended={attended} total={total} size={200} />
        </div>
      </div>

      <div className="inner-card">
        <h3>{t("attendanceList")}</h3>
        {filteredAttendance.length === 0 ? (
          <p>{t("noAttendanceRecords")}</p>
        ) : (
          filteredAttendance.map((record) => {
            const id = record.lessonId + record.lessonDate;
            const isEditing = editingId === id;
            const reasonText = record.reason || t("none");

            return (
              <div
                key={id}
                className="inner-card"
                style={{
                  backgroundColor: record.present ? "#d4edda" : "#f8d7da",
                  color: record.present ? "#155724" : "#721c24",
                  padding: "8px",
                  margin: "4px 0",
                  borderRadius: "4px",
                }}
              >
                <div>
                  {new Date(record.lessonDate).toLocaleDateString()} — {record.present ? t("present") : t("absent")}
                </div>

                {!record.present && (
                  <div
                    style={{
                      marginTop: "6px",
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {!isEditing && (
                      <div>
                        {t("reason")}: {reasonText}
                      </div>
                    )}

                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          placeholder={t("reasonPlaceholder")}
                          value={reasons[id] ?? ""}
                          onChange={(e) => handleReasonChange(id, e.target.value)}
                          style={{
                            padding: "6px",
                            fontSize: "1rem",
                            flex: 1,
                            color: "#000",
                            background: "#ffffff",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            outline: "none",
                          }}
                        />
                        <button style={buttonStyle} onClick={() => handleConfirm(record)}>
                          {t("save")}
                        </button>
                        <button style={cancelButtonStyle} onClick={() => setEditingId(null)}>
                          {t("cancel")}
                        </button>
                      </>
                    ) : (
                      <button
                        style={buttonStyle}
                        onClick={() => {
                          setEditingId(id);
                          setReasons((prev) => ({ ...prev, [id]: record.reason ?? "" }));
                        }}
                      >
                        {record.reason ? t("edit") : t("addReason")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AttendanceTrackingView;
