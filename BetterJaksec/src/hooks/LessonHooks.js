import { fetchData } from "../utils/fetchData";

const useLessonHook = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + "/lesson";

  /**
   * 
   * @param {*} lesson Includes instance of object with lessonName, lessonDate, courseID
   * @returns boolean
   */

  const postLesson = async (lesson) => {
    const body = {
      lessonName: lesson.lessonName,
      lessonDate: lesson.lessonDate,
      courseID: lesson.courseID,
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

  const getLesson = async (lessonID) => {
    const options = {
      method: "GET",
      body: JSON.stringify({ teacherID: lessonID }),
    };

    try {
      const lesson = await fetchData(`${baseUrl}/${lessonID}`, options);
      if (!lesson) return false;
      return lesson;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 
   * @param {*} lesson provide only that you want to change.
   * @returns boolean
   */

  const putLesson = async (lesson) => {
    const body = {};

    if (lesson.lessonName) body.lessonName = lesson.lessonName;
    if (lesson.lessonDate) body.lessonDate = lesson.lessonDate;
    if (lesson.courseID) body.courseID = lesson.courseID;

    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
        const put = await fetchData(`${baseUrl}/${lesson.lessonID}`, options)
        if (!put) return false;
        return true;
    } catch (error) {
        console.log(error)
    }

  };

  const deleteLesson = async (lessinID) => {

    const options = {
      method: 'DELETE',
    };

    try {
        const deleteDone = await fetchData(`${baseUrl}/${lessinID}`, options)
        if (!deleteDone) return false
        return true 
    } catch (error) {
        console.log(error)
    }
  };

  return { postLesson, getLesson, putLesson, deleteLesson };
};

export default useLessonHook;