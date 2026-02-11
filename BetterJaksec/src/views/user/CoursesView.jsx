import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CoursesView = () => {
  // Dummy data: teacher's courses
  const testCourses = [
    { id: 1, name: "Course1" },
    { id: 2, name: "Course2" },
    { id: 3, name: "Course3" },
    { id: 4, name: "Course4" },
  ];
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const renderCourses = () => {
      //api call
      setCourses(testCourses);
    };
    renderCourses();
  }, [courses]);

  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h1>Courses</h1>
          <button onClick={()=> {navigate("/")}}>Return</button>
        </div>

        <h2>List of courses:</h2>

        <div
          style={{
            background: "#f5f5f5",
            padding: "20px",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {courses.map((course) => (
            <button
              key={course.id}
              style={{
                color: "#000000ff",
                background: "#e0e0e0",
                padding: "12px",
                textAlign: "left",
                borderRadius: "4px",
                margin: "2px",
              }}
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

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
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
