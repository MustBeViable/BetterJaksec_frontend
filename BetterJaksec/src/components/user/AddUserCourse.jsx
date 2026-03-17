import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useStudentHook from "../../hooks/StudentHooks";
import useStudentCourse from "../../hooks/StudentCourseHook";

const AddUserCourse = ({ setIsAddUserOpen, course, setRefresh }) => {
  const { t } = useTranslation("common");
  const gradeOptions = ["all", "grade level1", "grade level2", "grade level3"];

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [submit, setSubmit] = useState(false);
  const [grade, setGrade] = useState("all");
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [studentList, setStudentList] = useState([]);
  const [visibleStudentList, setVisibleStudentList] = useState([]);
  const [alreadyInCourse, setAlreadyInCourse] = useState([]);
  const { getStudent } = useStudentHook();
  const { createGrade } = useStudentCourse();

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

  const handleStudentUpdate = async () => {
    const newIds = [...selectedIds].filter((id) => !alreadyInCourse.has(id));

    if (newIds.length === 0) return true;

    const requests = newIds.map((studentId) => {
      const body = {
        studentId,
        courseId: course.id,
        grade: 0,
      };
      return createGrade(body);
    });

    const results = await Promise.all(requests);
    return results.every(Boolean);
  };

  useEffect(() => {
    const loadingState = () => {
      if (submit) setLoading(t("loading"));
      if (!submit) setLoading("");
    };
    loadingState();
  }, [submit, t]);

  useEffect(() => {
    const sortStudentList = () => {
      setVisibleStudentList((prev) => {
        const next = [...prev];
        next.sort((a, b) => {
          const aSelected = selectedIds?.has(a.studentID);
          const bSelected = selectedIds?.has(b.studentID);
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
      const alreadyInCourseSet = new Set(
        students
          .filter(
            (student) =>
              Array.isArray(student.grades) &&
              student.grades.some((g) => g.courseId === course.id),
          )
          .map((student) => student.studentID),
      );
      setSelectedIds(alreadyInCourseSet);
      setAlreadyInCourse(alreadyInCourseSet);
    };
    initialStudents();
  }, []);

  return (
    <div className="main-card">
      <div className="inner-card inner-card--stack">
        <h2>{t("searchUsers")}</h2>

        <div className="inner-card inner-card--row">
          <input
            type="text"
            value={search}
            placeholder={t("search")}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            {gradeOptions?.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "all" ? t("allGradeLevels") : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="inner-card inner-card--wrap">
          {visibleStudentList?.map((s) => {
            const isSelected = selectedIds.has(s.studentID);
            return (
              <button
                key={s.studentID}
                id={String(s.studentID)}
                type="button"
                onClick={() => toggleStudent(s.studentID)}
                className={isSelected ? "btn--selected" : "btn"}
              >
                {s.firstName} {s.lastName}
              </button>
            );
          })}
          <p>{loading}</p>
          <button
            className="btn btn--primary"
            onClick={async () => {
              setSubmit(true);
              const ok = await handleStudentUpdate();
              if (!ok) {
                window.alert(t("addUserCourseFailed"));
                return;
              } else {
                setSubmit(false);
                setRefresh((prev) => !prev);
                setIsAddUserOpen(false);
              }
            }}
          >
            {t("save")}
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAddUserOpen(false);
            }}
          >
            {t("return")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserCourse;
