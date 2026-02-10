import React, { useMemo, useState } from "react";

const AddUserCourse = ({setIsAddUserOpen}) => {
  const dummyStudents = [
    { studentID: 1, firstName: "Anna", lastName: "Korhonen" },
    { studentID: 2, firstName: "Mikko", lastName: "Virtanen" },
    { studentID: 3, firstName: "Laura", lastName: "Mäkinen" },
    { studentID: 4, firstName: "Jussi", lastName: "Lahtinen" },
    { studentID: 5, firstName: "Emma", lastName: "Salonen" },
  ];

  const studentsWithGrade = useMemo(
    () =>
      dummyStudents.map((s, idx) => ({
        ...s,
        gradeLevel: `grade level${(idx % 3) + 1}`,
      })),
    []
  );

  // tää o filteröintii varten, muokataa/poistetaa tarvittaes
  const gradeOptions = ["all", "grade level1", "grade level2", "grade level3"];

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("all");
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const toggleStudent = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleStudents = useMemo(() => {
    const studentQuery = search.trim().toLowerCase();

    const filteredStudents = studentsWithGrade.filter((s) => {
        //tänne maholliset filteröinti haut ja "return matchesSearch && matcherFilter"
        // -> silloin palauttaa true jos molemmat ehdot käy
      const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
      const matchesSearch = studentQuery === "" ? true : fullName.includes(studentQuery);
      return matchesSearch;
    });

    const selected = [];
    const unselected = [];

    for (const student of filteredStudents) {
      if (selectedIds.has(student.studentID)) selected.push(student);
      else unselected.push(student);
    }

    // Järjestää eka valitut ja sitten ei valitut.
    return [...selected, ...unselected];
  }, [studentsWithGrade, grade, search, selectedIds]);

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#000000" }}>
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
          {visibleStudents.map((s) => {
            const isSelected = selectedIds.has(s.studentID);
            return (
              <button
                key={s.studentID}
                id={String(s.studentID)}
                type="button"
                onClick={() => toggleStudent(s.studentID)}
                style={{
                  background: isSelected ? "#7bdc9a" : "#e0e0e0",
                  color: "#030000"
                }}
              >
                {s.firstName} {s.lastName}
              </button>
            );
          })}
          <button onClick={()=> {
            //set api call request here
            setIsAddUserOpen(false);
          }} >Save</button>
          <button onClick={()=> {
            setIsAddUserOpen(false);
          }}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default AddUserCourse;
