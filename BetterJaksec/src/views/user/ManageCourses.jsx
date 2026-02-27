import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddUserCourse from "../../components/user/AddUserCourse";
import useStudentHooks from "../../hooks/StudentHooks";
import useCourseHooks from "../../hooks/CourseHook";
import useStudentCourse from "../../hooks/StudentCourseHook";
import { UserContext } from "../../contexts/UserContext";

const ManageCourses = () => {
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

      const students = await Promise.all(
        studentIds.map((id) => getStudent(id)),
      );
      setCourseStudents(students.filter(Boolean));
    };

    initialStudents();
  }, [course, isAddUsersOpen, removeModal, refresh]);

  return (
    <div className="main-card inner-card--stack">
      <div className="inner-card inner-card--row">
        <h1>{course?.name ? course.name : "New course:"}</h1>
        <button
          className="btn"
          type="button"
          onClick={() => {
            navigate("/courses", {
              state: null,
            });
          }}
        >
          Return
        </button>
      </div>

      <div className="inner-card inner-card--row">
        <div className="inner-card inner-card--stack">
          <div className="inner-card inner-card--stack">
            <label htmlFor="courseName">Course name:</label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                if (courseNameError) setCourseNameError("");
              }}
            />
            {courseNameError && <p style={{ color: "var(--danger)" }}>{courseNameError}</p>}
          </div>

          {course && (
            <>
              <button className="btn" type="button" onClick={() => setIsAddUsersOpen(true)}>
                Add users to the course
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => {
                  navigate("/courses/manage/manage_lessons", {
                    state: { course },
                  });
                }}
              >
                Manage lessons
              </button>

              <button
                className="btn btn--primary"
                type="button"
                onClick={async () => {
                  const nameOk = courseName.trim().length > 0;
                  setCourseNameError(nameOk ? "" : "Required");
                  if (!nameOk) return;

                  const ok = await updateCourse();
                  if (!ok) window.alert("Update failed");
                  else {
                    navigate("/courses");
                  }
                }}
              >
                Update course
              </button>

              <button
                className="btn btn--danger"
                type="button"
                onClick={async () => {
                  const ok = await eliminateCourse();
                  if (!ok) window.alert("Deletion failed");
                  else {
                    navigate("/courses");
                  }
                }}
              >
                End course
              </button>
            </>
          )}

          {!course && (
            <button
              className="btn btn--primary"
              type="button"
              onClick={async () => {
                const nameOk = courseName.trim().length > 0;
                setCourseNameError(nameOk ? "" : "Required");
                if (!nameOk) return;

                const ok = await createCourse();
                if (!ok) window.alert("Creation failed");
                else {
                  navigate("/courses");
                }
              }}
            >
              Create course
            </button>
          )}
        </div>

        <div className="inner-card inner-card--stack">
          <h2>Current users:</h2>
          <div className="inner-card inner-card--wrap">
            {courseStudents?.map((student) => (
              <button
                className="btn"
                type="button"
                key={student.studentID}
                id={student.studentID}
                onClick={() => {
                  setRemoveModal(true);
                  setRemoveStudent(student);
                }}
              >
                {student.firstName} {student.lastName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isAddUsersOpen && (
        <div
          className="inner-card"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setIsAddUsersOpen(false)}
        >
          <div
            className="inner-card"
            onClick={(e) => e.stopPropagation()}
          >
            <AddUserCourse
              setIsAddUserOpen={setIsAddUsersOpen}
              course={state?.course}
              onClose={() => setIsAddUsersOpen(false)}
              setRefresh={setRefresh}
            />
          </div>
        </div>
      )}

      {removeModal && (
        <div className="inner-card inner-card--stack">
          <h3>
            Do you want to remove user {removeStudet.firstName}{" "}
            {removeStudet.lastName} from the course?
          </h3>
          <div className="inner-card inner-card--row">
            <button
              className="btn btn--danger"
              onClick={async () => {
                const ok = await eliminateStudent(removeStudet.studentID);
                if (!ok) window.alert("sum ting wong");
                if (ok) {
                  setRemoveStudent(null);
                  setRemoveModal(false);
                }
              }}
            >
              Yes
            </button>
            <button
              className="btn"
              onClick={() => {
                setRemoveModal(false);
                setRemoveStudent(null);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;