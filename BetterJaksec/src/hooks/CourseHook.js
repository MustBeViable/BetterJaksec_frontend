import { fetchData } from "../utils/fetchData";

const useCourseHook = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + "/course";

  /**
   *
   * @param {*} course instance with courseName, lessonIds (list, can be empty), assignmentsIds (same as lessonid), teaherID cannot be null
   * @returns
   */

  const postCourse = async (course) => {
    const body = {
      courseName: course.courseName,
      lessonIds: course.lessonIds ?? [],
      assignmentIds: course.assignmentIds ?? [],
      teacherIds: course.teacherIds,
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
   * @param {*} courseID leave empty if you want all courses
   * @returns
   */

  const getCourse = async (courseID) => {
    if (!courseID) {
      try {
        const courseList = await fetchData(`${baseUrl}/all`, { method: "GET" });
        if (!courseList) return false;
        return courseList;
      } catch (error) {
        console.log(error);
      }
    }
    const options = {
      method: "GET",
    };

    try {
      const course = await fetchData(`${baseUrl}/${courseID}`, options);
      if (!course) return false;
      return course;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {*} course provide info that you are willing to change
   * @returns
   */

  const putCourse = async (course) => {
    const body = {};

    if (course.courseName) body.courseName = course.courseName;
    if (course.lessonIds) body.lessonIds = course.lessonIds;
    if (course.assignmentIds) body.assignmentIds = course.assignmentIds;
    if (course.teacherIds) body.teacherIds = course.teacherIds;

    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      const put = await fetchData(`${baseUrl}/${course.courseID}`, options);
      if (!put) return false;
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (courseID) => {
    const options = {
      method: "DELETE",
    };

    try {
      const deleteDone = await fetchData(`${baseUrl}/${courseID}`, options);
      if (!deleteDone) return false;
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return { postCourse, getCourse, putCourse, deleteCourse };
};

export default useCourseHook;
