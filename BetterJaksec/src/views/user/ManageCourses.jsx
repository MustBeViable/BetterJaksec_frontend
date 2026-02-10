import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddUserCourse from "../../components/user/AddUserCourse";

const ManageCourses = () => {
  const dummyUsers = [
    { studentID: 1, firstName: "Anna", lastName: "Korhonen" },
    { studentID: 2, firstName: "Mikko", lastName: "Virtanen" },
    { studentID: 3, firstName: "Laura", lastName: "Mäkinen" },
    { studentID: 4, firstName: "Jussi", lastName: "Lahtinen" },
    { studentID: 5, firstName: "Emma", lastName: "Salonen" },
  ];
  const navigate = useNavigate();
  const { state } = useLocation();
  const course = state?.course;
  const [courseName, setCourseName] = useState(course?.name ?? "");
  const [isAddUsersOpen, setIsAddUsersOpen] = useState(false);

  /* 
  Tänne viel CRUD metodit + useEffect tarvittaes
  */

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{course?.name ? course.name : "New course:"}</h1>
        <button
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

          <button onClick={() => setIsAddUsersOpen(true)}>
            Add users to the course
          </button>
          {course && <button>End course</button>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Current users:</h2>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {dummyUsers.map((u) => (
              <button key={u.studentID} id={u.studentID}>
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
            backgroundColor: "rbga(0,0,0,0.5)"
          }}
          onClick={() => setIsAddUsersOpen(false)}
        >
          <div
            style={{ background: "#fff", padding: "16px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <AddUserCourse setIsAddUserOpen={setIsAddUsersOpen} onClose={() => setIsAddUsersOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
