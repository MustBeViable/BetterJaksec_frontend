import { fetchData } from "../utils/fetchData";

const baseUrl = "/api/student/grade";

const useStudentCourse = () => {
 
  const createGrade = async ({ studentId, courseId, grade }) => {
    return await fetchData(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, courseId, grade }),
    });
  };

  const getGrade = async (gradeId) => {
    return await fetchData(`${baseUrl}/${gradeId}`);
  };

  const putGrade = async (gradeId, { studentId, courseId, grade }) => {
    return await fetchData(`${baseUrl}/${gradeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, courseId, grade }),
    });
  };

  return { createGrade, getGrade, putGrade };
};

export default useStudentCourse;