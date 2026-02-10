const CourseList = ({ courses }) => {
  return (
    <div style={{ border: "1px solid black", maxHeight: "100px", overflowY: "auto" }}>
      {courses.map((course, index) => (
        <div
          key={index}
          style={{ padding: "5px", borderBottom: "1px solid #ccc" }}
        >
          {course.name}
        </div>
      ))}
    </div>
  );
};

export default CourseList;