import React, { useEffect, useState } from "react";
import useLessonHook from "../../hooks/LessonHooks";
import { useNavigate } from "react-router-dom";

const NewLesson = ({
  course,
  setCourse,
  setIsAddLessonOpen,
  selectedLesson,
  setSelectedLesson,
  onUpdated,
  onCreated,
  onDeleted,
}) => {
  const [lessonName, setLessonName] = useState("");
  const [lessonDate, setLessonDate] = useState("");

  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");

  const navigate = useNavigate();
  const { postLesson, putLesson, deleteLesson } = useLessonHook();

  useEffect(() => {
    const initComponent = () => {
      if (!selectedLesson) {
        setLessonName("");
        setLessonDate("");
        setNameError("");
        setDateError("");
        return;
      }
      setLessonName(selectedLesson.lessonName ?? selectedLesson.name ?? "");
      setLessonDate(selectedLesson.lessonDate ?? selectedLesson.date ?? "");
      setNameError("");
      setDateError("");
    };
    initComponent();
  }, [selectedLesson]);

  const removeLesson = async () => {
    const id = selectedLesson?.lessonID ?? selectedLesson?.id;
    if (!id) return false;

    const success = await deleteLesson(id);
    if (!success) return false;

    const newIds = (course?.lessonIds ?? []).filter((x) => x !== id);

    setCourse((prev) => ({ ...prev, lessonIds: newIds }));
    onDeleted?.(id);
    return true;
  };

  const updateLesson = async () => {
    const id = selectedLesson?.lessonID ?? selectedLesson?.id;
    if (!id) return false;

    const lessonObject = {
      lessonId: id,
      lessonName: lessonName,
      lessonDate: lessonDate,
    };

    const updatedLesson = await putLesson(lessonObject);
    if (!updatedLesson) return false;

    onUpdated?.();
    return true;
  };

  const newLesson = async () => {
    if (!course?.id) return false;

    if (selectedLesson) {
      return updateLesson();
    }

    const lessonObject = {
      lessonName: lessonName,
      lessonDate: lessonDate,
      courseID: course.id,
    };

    const createdLesson = await postLesson(lessonObject);
    if (!createdLesson) return false;

    const createdId = createdLesson.id ?? createdLesson.lessonID;

    const lessonList = [...(course.lessonIds ?? []), createdId];

    setCourse((prev) => ({ ...prev, lessonIds: lessonList }));
    onCreated?.(createdId);
    return true;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        color: "#040000",
      }}
    >
      <h2>New lesson</h2>

      <label>
        Lesson name:
        <input
          type="text"
          value={lessonName}
          onChange={(e) => {
            setLessonName(e.target.value);
            if (nameError) setNameError("");
          }}
        />
        {nameError && (
          <span style={{ color: "red", marginLeft: "8px" }}>{nameError}</span>
        )}
      </label>

      <label>
        Lesson date:
        <input
          type="date"
          value={lessonDate}
          onChange={(e) => {
            setLessonDate(e.target.value);
            if (dateError) setDateError("");
          }}
        />
        {dateError && (
          <span style={{ color: "red", marginLeft: "8px" }}>{dateError}</span>
        )}
      </label>

      <button
        onClick={async () => {
          const nameOk = lessonName.trim().length > 0;
          const dateOk = lessonDate.trim().length > 0;

          setNameError(nameOk ? "" : "Required");
          setDateError(dateOk ? "" : "Required");

          if (!nameOk || !dateOk) return;

          const ok = await newLesson();
          if (!ok) {
            window.alert("Request failed");
            return;
          }
          setIsAddLessonOpen(false);
          setSelectedLesson(null);
        }}
      >
        Save
      </button>

      <button
        onClick={() => {
          setIsAddLessonOpen(false);
          setSelectedLesson(null);
        }}
      >
        Cancel
      </button>

      {selectedLesson && (
        <div>
          <button
            onClick={async () => {
              const ok = await removeLesson();
              if (!ok) {
                window.alert("Deletion failed");
                return;
              }
              setIsAddLessonOpen(false);
              setSelectedLesson(null);
            }}
          >
            Delete lesson
          </button>
          <button
            onClick={() => {
              setIsAddLessonOpen(false);
              setSelectedLesson(null);
              navigate("/attendance_view", {
                state: {
                  lessonId: selectedLesson.lessonID,
                  courseId: course.id,
                  course: course,
                },
              });
            }}
          >
            Start lesson tracking
          </button>
        </div>
      )}
    </div>
  );
};

export default NewLesson;