import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CourseList from "../../components/CourseList";
import ClassAttendanceStatsAdmin from "../../components/admin/ClassAttendanceStatsAdmin";
import useCourseHook from "../../hooks/CourseHook";
import useStudentCourseHook from "../../hooks/StudentCourseHook";
import useStudentHook from "../../hooks/StudentHooks";
import { useUser } from "../../hooks/AuthHooks";
import LanguageSelector from "../../components/LanguageSwitcher";

const AdminAttendanceTrackingView = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { getCourse } = useCourseHook();
  const { getCourseStudents } = useStudentCourseHook();
  const { getStudent } = useStudentHook();
  const { getUserByToken } = useUser();

  const [userRole, setUserRole] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByToken();
        setUserRole(user.role);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const hookData = await getCourse();
        setCourses(hookData || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let studentData = [];

        if (selectedCourse) {
          const studentIds = await getCourseStudents(selectedCourse.id);
          const studentPromises = studentIds.map((id) => getStudent(id));
          studentData = await Promise.all(studentPromises);

          const lessons = selectedCourse.lessonIds || [];

          const computedStudents = studentData.map((student) => {
            const attendanceForCourse = (student.attendance || []).filter((a) =>
              lessons.includes(a.lessonId),
            );

            return {
              name: `${student.firstName} ${student.lastName}`,
              attendedClasses: attendanceForCourse.filter((a) => a.present).length,
              totalClasses: lessons.length,
            };
          });

          setStudents(computedStudents);
        } else if (userRole === "admin") {
          studentData = await getStudent();

          const computedStudents = studentData.map((student) => {
            const attendanceAll = student.attendance || [];

            return {
              name: `${student.firstName} ${student.lastName}`,
              attendedClasses: attendanceAll.filter((a) => a.present).length,
              totalClasses: attendanceAll.length,
            };
          });

          setStudents(computedStudents);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setStudents([]);
      }
    };

    if (!loading && userRole) {
      fetchStudents();
    }
  }, [selectedCourse, loading, userRole]);

  if (loading || !userRole) return <div>{t("loading")}</div>;

  const totalClasses =
    selectedCourse?.lessonIds?.length ||
    students.reduce((sum, s) => sum + (s.totalClasses || 0), 0);

  return (
    <div
      className="main-card inner-card--stack"
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <h3 style={{ margin: 0 }}>{t("courses")}</h3>
          <LanguageSelector></LanguageSelector>
          {userRole === "teacher" && (
            <button className="btn" onClick={() => navigate("/")}>
              {t("return")}
            </button>
          )}
        </div>

        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          <CourseList
            courses={courses}
            onSelect={setSelectedCourse}
            selectedCourse={selectedCourse}
          />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          marginTop: "10px",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
          {selectedCourse
            ? `${selectedCourse.name} ${t("attendanceStats")}`
            : userRole === "admin"
              ? t("allCoursesStats")
              : t("selectACourse")}
        </h3>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <ClassAttendanceStatsAdmin
            students={students}
            totalClasses={totalClasses}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAttendanceTrackingView;
