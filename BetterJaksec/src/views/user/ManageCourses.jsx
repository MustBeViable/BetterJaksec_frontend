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
    //Jos tätä checkiä ei oo vite app kaatuu kun sitä ei ole (esim uusi kurssi tms)
    // DO NOT DELETE THIS CHECK!!
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{course?.name ? course.name : "New course:"}</h1>
        <button
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

      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <label htmlFor="courseName">Course name:</label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <button type="button" onClick={() => setIsAddUsersOpen(true)}>
            Add users to the course
          </button>
          {course && (
            <>
              <button
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
                type="button"
                onClick={() => {
                  const ok = updateCourse();
                  if (!ok) window.alert("Update failed");
                  else {
                    navigate("/courses");
                  }
                }}
              >
                Update course
              </button>
              <button
                type="button"
                onClick={() => {
                  const ok = eliminateCourse();
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
              type="button"
              onClick={() => {
                const ok = createCourse();
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Current users:</h2>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {courseStudents?.map((student) => (
              <button
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

      {/* Add new user modal: */}

      {isAddUsersOpen && (
        <div
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
            style={{ background: "#fff", padding: "16px" }}
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

      {/* Remove modal: */}

      {removeModal && (
        <div>
          <h3>
            Do you want to remove user {removeStudet.firstName}{" "}
            {removeStudet.lastName} from the course?
          </h3>
          <button
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
            onClick={() => {
              setRemoveModal(false);
              setRemoveStudent(null);
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
