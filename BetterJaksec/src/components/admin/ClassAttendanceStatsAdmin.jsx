import React from "react";
import { useTranslation } from "react-i18next";
import { formatPercent } from "../../i18n/format";

const ClassAttendanceStatsAdmin = ({ students, totalClasses }) => {
  const { t, i18n } = useTranslation("common");
  const lang = i18n.language;

  let totalAttended = 0;

  students.forEach((student) => {
    totalAttended += student.attendedClasses;
  });

  const averageAttendance =
    students.length > 0 && totalClasses > 0
      ? (totalAttended / (students.length * totalClasses)) * 100
      : 0;

  return (
    <div className="inner-card inner-card--row" style={{ width: "100%", flex: 1 }}>
      
      <div
        className="inner-card inner-card--stack"
        style={{ overflowY: "auto", flex: 1 }}
      >
        {students.map((student, index) => {
          const percentage =
            totalClasses > 0
              ? (student.attendedClasses / totalClasses) * 100
              : 0;

          return (
            <div key={index} className="inner-card">
              {student.name} — {formatPercent(percentage, lang)}
            </div>
          );
        })}
      </div>

      <div className="inner-card">
        <p>
          {t("average")} {formatPercent(averageAttendance, lang)}
        </p>
      </div>

    </div>
  );
};

export default ClassAttendanceStatsAdmin;