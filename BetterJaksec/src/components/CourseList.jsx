import React from "react";

const CourseList = ({ courses, onSelect, selectedCourse }) => {
  return (
    <div className="inner-card inner-card--stack">
      {courses.map((course) => {
        const isSelected = selectedCourse?.id === course.id;

        return (
          <div
            key={course.id}
            className="inner-card"
            onClick={() => onSelect(isSelected ? null : course)}
            style={{
              cursor: "pointer",
              backgroundColor: isSelected ? "#2c354a" : "inherit"}}
          >
            {course.name}
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;