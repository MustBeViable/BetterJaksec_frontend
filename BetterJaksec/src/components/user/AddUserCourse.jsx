import React, { useEffect, useState } from "react";
import useStudentHook from "../../hooks/StudentHooks";

const AddUserCourse = ({ setIsAddUserOpen }) => {
  const gradeOptions = ["all", "grade level1", "grade level2", "grade level3"];

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("all");
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [studentList, setStudentList] = useState([]);
  const [visibleStudentList, setVisibleStudentList] = useState([]);
  const { getStudent } = useStudentHook();

  const toggleStudent = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filterStudents = (studentQuery) => {
    setVisibleStudentList(
      studentList.filter((s) => {
        const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
        const matchesSearch =
          studentQuery === "" ? true : fullName.includes(studentQuery);
        return matchesSearch;
      }),
    );
  };

  useEffect(() => {
    const sortStudentList = () => {
      setVisibleStudentList((prev) => {
        const next = [...prev];
        next.sort((a, b) => {
          const aSelected = selectedIds.has(a.studentID);
          const bSelected = selectedIds.has(b.studentID);
          if (aSelected !== bSelected) return aSelected ? -1 : 1;
          return `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`,
          );
        });
        return next;
      });
    };
    sortStudentList();
  }, [selectedIds]);

  useEffect(() => {
    const handleFilter = () => {
      filterStudents(search);
    };
    handleFilter();
  }, [search]);

  useEffect(() => {
    const initialStudents = async () => {
      const students = await getStudent();
      if (!students) return;
      setStudentList(students);
      setVisibleStudentList(students);
    };
    initialStudents();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "#000000",
        }}
      >
        <h2>Search users:</h2>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            {gradeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "all" ? "All grade levels" : opt}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignContent: "flex-start",
          }}
        >
          {visibleStudentList.map((s) => {
            const isSelected = selectedIds.has(s.studentID);
            return (
              <button
                key={s.studentID}
                id={String(s.studentID)}
                type="button"
                onClick={() => toggleStudent(s.studentID)}
                style={{
                  background: isSelected ? "#7bdc9a" : "#e0e0e0",
                  color: "#030000",
                }}
              >
                {s.firstName} {s.lastName}
              </button>
            );
          })}
          <button
            onClick={() => {
              //set api call request here
              setIsAddUserOpen(false);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsAddUserOpen(false);
            }}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserCourse;
