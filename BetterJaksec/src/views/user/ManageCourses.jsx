import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddUserCourse from "../../components/user/AddUserCourse";
import useStudentHooks from "../../hooks/StudentHooks";
import useCourseHooks from "../../hooks/CourseHook";
import useStudentCourse from "../../hooks/StudentCourseHook";
import { UserContext } from "../../contexts/UserContext";

const ManageCourses = () => {
  const { t } = useTranslation("common");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [refresh, setRefresh] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [removeStudet, setRemoveStudent] = useState();
  const [course, setCourse] = useState(null);
  const [courseStudents, setCourseStudents] = useState();
  const [courseName, setCourseName] = useState("");
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [courseLessons, setCourseLessons] = useState([]);
  const [isAddUsersOpen, setIsAddUsersOpen] = useState(false);

  const [courseNameError, setCourseNameError] = useState("");

  const { getCourseStudents, deleteStudentFromCourse } = useStudentCourse();
  const { getStudent } = useStudentHooks();
  const { postCourse, putCourse, deleteCourse } = useCourseHooks();

  const createCourse = async () => {
    const newCourse = {
      courseName: courseName,
      lessonIds: [],
      assignmentIds: [],
      teacherId: user?.id,
      teacherIds: [user?.id],
    };
    console.log(newCourse);
    const success = await postCourse(newCourse);
    if (!success) return false;
    return true;
  };

  const updateCourse = async () => {
    if (!course?.id) return;
    const updatedCourse = {};
    updatedCourse.courseID = course.id;
    if (courseName !== null) updatedCourse.courseName = courseName;
    if (courseLessons.length > 0) updatedCourse.lessonIds = courseLessons;
    if (courseTeachers.length > 0) updatedCourse.teacherIds = courseTeachers;

    const success = await putCourse(updatedCourse);
    if (!success) return false;
    return true;
  };

  const eliminateCourse = async () => {
    const success = await deleteCourse(course?.id);
    if (!success) return false;
    return true;
  };

  const eliminateStudent = async (studentId) => {
    const success = await deleteStudentFromCourse(studentId, course?.id);
    if (!success) return false;
    return true;
  };

  useEffect(() => {
    const initCourse = () => {
      if (!state?.course) return;
      setCourse(state.course);
    };
    initCourse();
  }, [state]);

  useEffect(() => {
    const initCourseInfo = () => {
      if (!course) return;
      setCourseName(course.courseName ?? course.name ?? "");
      setCourseTeachers(course.teacherIds ?? []);
      setCourseLessons(course.lessonIds ?? []);
      setCourseNameError("");
    };
    initCourseInfo();
  }, [course]);

  useEffect(() => {
    const initialStudents = async () => {
      if (!course?.id) return;

      const studentIds = await getCourseStudents(course.id);
      if (!studentIds || studentIds.length === 0) {
        setCourseStudents([]);
        return;
      }

      const students = await Promise.all(studentIds.map((id) => getStudent(id)));
      setCourseStudents(students.filter(Boolean));
    };

    initialStudents();
  }, [course, isAddUsersOpen, removeModal, refresh, getCourseStudents, getStudent]);

  return (
    <div className="main-card">
      <div className="inner-card inner-card--stack">
        <div className="inner-card inner-card--row">
          <button
            className="btn"
            onClick={() => {
              navigate("/courses");
            }}
          >
            {t("return")}
          </button>
        </div>

        <div className="inner-card inner-card--stack">
          <label htmlFor="coursename">{t("courseName")}</label>
          <input
            id="coursename"
            value={courseName}
            onChange={(evt) => {
              setCourseName(evt.target.value);
              if (courseNameError) setCourseNameError("");
            }}
          />
          {courseNameError && (
            <p style={{ color: "var(--danger)" }}>{courseNameError}</p>
          )}
        </div>

        {course && (
          <div className="inner-card inner-card--row">
            <button
              className="btn"
              onClick={() => {
                setIsAddUsersOpen(true);
              }}
            >
              {t("addUsersToCourse")}
            </button>

            <button
              className="btn"
              onClick={() => {
                navigate("/courses/lessons", { state: { course } });
              }}
            >
              {t("manageLessons")}
            </button>

            <button
              className="btn btn--primary"
              onClick={async () => {
                const courseNameOk = courseName.trim().length > 0;
                setCourseNameError(courseNameOk ? "" : t("required"));
                if (!courseNameOk) return;
                const ok = await updateCourse();
                if (!ok) {
                  window.alert(t("updateFailed"));
                }
              }}
            >
              {t("updateCourse")}
            </button>

            <button
              className="btn btn--danger"
              onClick={async () => {
                const ok = await eliminateCourse();
                if (!ok) {
                  window.alert(t("deletionFailed"));
                  return;
                }
                navigate("/courses");
              }}
            >
              {t("endCourse")}
            </button>
          </div>
        )}

        {!course && (
          <button
            className="btn btn--primary"
            onClick={async () => {
              const courseNameOk = courseName.trim().length > 0;
              setCourseNameError(courseNameOk ? "" : t("required"));
              if (!courseNameOk) return;
              const ok = await createCourse();
              if (!ok) {
                window.alert(t("creationFailed"));
                return;
              }
              navigate("/courses");
            }}
          >
            {t("createCourse")}
          </button>
        )}

        <div className="inner-card inner-card--stack">
          <h2>{t("currentUsers")}</h2>

          <div className="inner-card inner-card--wrap">
            {courseStudents?.map((student) => (
              <button
                key={student.studentID}
                className="btn"
                onClick={() => {
                  setRemoveStudent(student);
                  setRemoveModal(true);
                }}
              >
                {student.firstName} {student.lastName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {removeModal && (
        <div className="main-card">
          <p>
            {t("removeUserFromCourse", {
              firstName: removeStudet.firstName,
              lastName: removeStudet.lastName,
            })}
          </p>
          <div className="inner-card inner-card--row">
            <button
              className="btn btn--danger"
              onClick={async () => {
                const ok = await eliminateStudent(removeStudet.studentID);
                if (!ok) {
                  window.alert(t("deletionFailed"));
                  return;
                }
                setRemoveModal(false);
                setRefresh((prev) => !prev);
              }}
            >
              {t("yes")}
            </button>
            <button className="btn" onClick={() => setRemoveModal(false)}>
              {t("no")}
            </button>
          </div>
        </div>
      )}

      {isAddUsersOpen && (
        <AddUserCourse
          setIsAddUserOpen={setIsAddUsersOpen}
          course={course}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default ManageCourses;
