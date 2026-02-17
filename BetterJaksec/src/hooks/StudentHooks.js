import { fetchData } from "../utils/fetchData";

const useStudentHook = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + "/student";
  const postStudent = async (student) => {
    const body = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      password: "secretpassword",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const post = await fetchData(baseUrl, options);
      if (!post) return false;
      return true;
    } catch (error) {
      console.log(error);
    }
  };

/**
 * 
 * @param {} studentID leave empty if you want al
 * @returns 
 */

  const getStudent = async (studentID) => {
    if (!studentID) {
      try {
        const studentList = await fetchData(`${baseUrl}/all`, {
          method: "GET",
        });
        if (!studentList) return false;
        return studentList;
      } catch (error) {
        console.log(error);
      }
    }

    const options = {
      method: "GET",
      body: JSON.stringify({ studentID: studentID }),
    };

    try {
      const student = await fetchData(`${baseUrl}/${studentID}`, options);
      if (!student) return false;
      return student;
    } catch (error) {
      console.log(error);
    }
  };

  const putStudent = async (student) => {
    const body = {};

    if (student.firstName) body.firstName = student.firstName;
    if (student.lastName) body.lastName = student.lastName;
    if (student.password) body.password = student.password;

    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const put = await fetchData(`${baseUrl}/${student.studentID}`, options);
      if (!put) return false;
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (studentID) => {
    const options = {
      method: "DELETE",
    };

    try {
      const deleteDone = await fetchData(`${baseUrl}/${studentID}`, options);
      if (!deleteDone) return false;
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return { postStudent, getStudent, putStudent, deleteStudent };
};

export default useStudentHook;
