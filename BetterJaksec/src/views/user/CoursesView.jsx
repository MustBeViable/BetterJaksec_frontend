import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCourseHook from "../../hooks/CourseHook";

const CoursesView = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { getCourse } = useCourseHook();

  useEffect(() => {
    const renderCourses = async () => {
      const dbCourses = await getCourse();
      setCourses(dbCourses);
    };
    renderCourses();
  }, []);

  return (
    <div className="main-card">
      <div className="inner-card inner-card--stack">
        <div className="inner-card inner-card--row">
          <h1>Courses</h1>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Return
          </button>
        </div>

        <h2>List of courses:</h2>

        <div className="inner-card inner-card--stack">
          {courses?.map((course) => (
            <button
              key={course.id}
              className="btn"
              onClick={() => {
                navigate("/courses/manage", {
                  state: { course },
                });
              }}
            >
              {course.name}
            </button>
          ))}
        </div>

        <div className="inner-card inner-card--row">
          <button
            className="btn btn--primary"
            onClick={() => {
              navigate("/courses/manage");
            }}
          >
            Add new course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesView;