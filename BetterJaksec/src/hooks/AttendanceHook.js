import { fetchData } from "../utils/fetchData";

const useAttendanceHook = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + "/student";

//Create attendance
  const postAttendance = async (studentId, attendance) => {
    const body = {
      present: attendance.present,
      lessonId: attendance.lessonId,
      lessonDate: attendance.lessonDate,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      return await fetchData(
        `${baseUrl}/${studentId}/attendance`,
        options
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

    //get single attendance

  const getAttendance = async (studentId, attendanceId) => {
    try {
      return await fetchData(
        `${baseUrl}/${studentId}/attendance/${attendanceId}`,
        { method: "GET" }
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //Update attendance

  const putAttendance = async (studentId, attendanceId, updates) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updates),
    };

    try {
      return await fetchData(
        `${baseUrl}/${studentId}/attendance/${attendanceId}`,
        options
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { postAttendance, getAttendance, putAttendance };
};

export default useAttendanceHook;