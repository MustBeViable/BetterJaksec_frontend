import { fetchData } from "../utils/fetchData";

const useTeacherHook = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + "/teacher";

  /**
   * 
   * @param {*} teacher is teacher instance with, firstname, lastname, email and boolean isAdmin
   * @returns 
   */

  const postTeacher = async (teacher) => {
    const body = {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      password: "secretpassword",
      isAdmin: teacher.isAdmin,
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

  const getTeacher = async (teacherID) => {
    const options = {
      method: "GET",
      body: JSON.stringify({ teacherID: teacherID }),
    };

    try {
      const teacher = await fetchData(`${baseUrl}/${teacherID}`, options);
      if (!teacher) return false;
      return teacher;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 
   * @param {*} teacher Provide only the info that is wanted to change
   * @returns 
   */

  const putTeacher = async (teacher) => {
    const body = {};

    if (teacher.firstName) body.firstName = teacher.firstName;
    if (teacher.lastName) body.lastName = teacher.lastName;
    if (teacher.password) body.password = teacher.password;
    body.isAdmin = teacher.isAdmin

    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
        const put = await fetchData(`${baseUrl}/${teacher.teacherID}`, options)
        if (!put) return false;
        return true;
    } catch (error) {
        console.log(error)
    }

  };

  const deleteTeacher = async (teacherID) => {

    const options = {
      method: 'DELETE',
    };

    try {
        const deleteDone = await fetchData(`${baseUrl}/${teacherID}`, options)
        if (!deleteDone) return false
        return true 
    } catch (error) {
        console.log(error)
    }
  };

  return { postTeacher, getTeacher, putTeacher, deleteTeacher };
};

export default useTeacherHook;