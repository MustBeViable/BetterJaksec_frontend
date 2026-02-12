import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceView = ({ course }) => {
  //** TODO: add apicalls for getting students and posting their attendance to the menu
  //   Also make this maybe a component or look at admin page how to provide props here*/
  const dummyUsers = [
    { studentID: 1, firstName: "Anna", lastName: "Korhonen" },
    { studentID: 2, firstName: "Mikko", lastName: "Virtanen" },
    { studentID: 3, firstName: "Laura", lastName: "Mäkinen" },
    { studentID: 4, firstName: "Jussi", lastName: "Lahtinen" },
    { studentID: 5, firstName: "Emma", lastName: "Salonen" },
  ];

  const navigate = useNavigate();

  const [unmarkedStudent, setUnmarkedStudent] = useState([]);
  const [presentStudent, setPresentStudent] = useState([]);

  const absentToPresent = (student) => {
    setPresentStudent((prev) => [...prev, student]);

    setUnmarkedStudent((prev) =>
      prev.filter((s) => s.studentID !== student.studentID),
    );
  };

  const presentToAbsent = (student) => {
    setUnmarkedStudent((prev) => [...prev, student]);

    setPresentStudent((prev) =>
      prev.filter((s) => s.studentID !== student.studentID),
    );
  };

  useEffect(() => {
    const updateStudentList = () => {};
  }, [presentStudent, unmarkedStudent]);

  //initial effect
  useEffect(() => {
    const initialStudents = () => {
      // API call here to get course students, can be fetched by course.courseID for example.
      setUnmarkedStudent(dummyUsers);
    };
    initialStudents();
  }, []);

  return (
    <>
      <h1>{course ? course.name : "Placeholder name"}</h1>
      <img src="/images/qr_code.svg" alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Present student:</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {presentStudent.map((student) => (
            <button
              key={student.studentID}
              id={student.studentID}
              onClick={() => {
                presentToAbsent(student);
              }}
            >
              {student.firstName} {student.lastName}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Current users:</h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {unmarkedStudent.map((student) => (
            <button
              key={student.studentID}
              id={student.studentID}
              onClick={() => {
                absentToPresent(student);
              }}
            >
              {student.firstName} {student.lastName}
            </button>
          ))}
        </div>
      </div>
      <button onClick={()=> {navigate("/")}}>Return</button>
    </>
  );
};

export default AttendanceView;
