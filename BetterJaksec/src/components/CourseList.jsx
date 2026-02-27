const CourseList = ({ courses }) => {
  return (
    <div className="inner-card inner-card--stack">
      {courses.map((course, index) => (
        <div key={index} className="inner-card">
          {course.name}
        </div>
      ))}
    </div>
  );
};

export default CourseList;