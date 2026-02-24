import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchData } from "../utils/fetchData";

const useTeacherData = () => {
  const { user } = useContext(UserContext);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchTeacher = async () => {
      try {
        const data = await fetchData(`/api/teacher/${user.id}`);
        setTeacher(data);
        console.log("Teacher data:", data);
      } catch (error) {
        console.log("Failed to fetch teacher:", error);
      }
    };

    fetchTeacher();
  }, [user]);

  return teacher;
};

export default useTeacherData;