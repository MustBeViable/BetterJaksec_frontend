import { useEffect } from "react";

export default function useStudentAttendance(onStudentPresent) {
  useEffect(() => {
    const handler = (event) => {
      if (event?.detail) {
        onStudentPresent(event.detail);
      }
    };

    window.addEventListener("studentMarkedPresent", handler);

    return () => {
      window.removeEventListener("studentMarkedPresent", handler);
    };
  }, [onStudentPresent]);
}