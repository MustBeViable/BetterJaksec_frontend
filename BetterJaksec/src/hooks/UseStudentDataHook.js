import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchData } from "../utils/fetchData";

const useStudentData = () => {
  const { user } = useContext(UserContext);
  const [student, setStudent] = useState(null);
  useEffect(() => {

    if (!user) return;
    const fetchStudent = async () => {
      try {

        const data = await fetchData(`/api/student/${user.id}`);
        setStudent(data);
        console.log(data)
                console.log("data")




      } catch (error) {
        console.log("Failed to fetch student:", error);
      }
    };

    fetchStudent();
  }, [user]);

console.log(student)

  return student;
};

export default useStudentData;