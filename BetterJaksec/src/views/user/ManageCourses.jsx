import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddUserCourse from "../../components/user/AddUserCourse";
import useStudentHooks from "../../hooks/StudentHooks";
import useCourseHooks from "../../hooks/CourseHook";

const ManageCourses = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [course, setCourse] = useState(null);
  const [courseStudents, setCourseStudents] = useState();
  const [courseName, setCourseName] = useState("");
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [courseLessons, setCourseLessons] = useState([]);
  const [isAddUsersOpen, setIsAddUsersOpen] = useState(false);
  const { getStudent } = useStudentHooks();
  const { postCourse, putCourse, deleteCourse } = useCourseHooks();

  const createCourse = async () => {
    const newCourse = {
      courseName: courseName,
      teacherIDs: courseTeachers,
    };
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
    if (courseLessons.length > 0) updatedCourse.lessonIDs = courseLessons;
    if (courseTeachers.length > 0) updatedCourse.teacherIDs = courseTeachers;

    const success = await putCourse(updatedCourse);
    if (!success) return false;
    return true;
  };

  const eliminateCourse = async () => {
    console.log(course);
    const success = await deleteCourse(course?.id);
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
      const students = await getStudent();
      if (students) {
        setCourseStudents(students);
      } else {
        window.alert("No users");
      }
    };
    initialStudents();
  }, []);

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
            {courseStudents?.map((u) => (
              <button type="button" key={u.studentID} id={u.studentID}>
                {u.firstName} {u.lastName}
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
            backgroundColor: "rbga(0,0,0,0.5)",
          }}
          onClick={() => setIsAddUsersOpen(false)}
        >
          <div
            style={{ background: "#fff", padding: "16px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <AddUserCourse
              setIsAddUserOpen={setIsAddUsersOpen}
              onClose={() => setIsAddUsersOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
