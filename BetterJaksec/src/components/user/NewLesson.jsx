import React, { useEffect, useState } from "react";
import useLessonHook from "../../hooks/LessonHooks";
import useCourseHook from "../../hooks/CourseHook";

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

  const { postLesson, putLesson, deleteLesson } = useLessonHook();
  const { putCourse } = useCourseHook();

  useEffect(() => {
    const initComponent = () => {
      if (!selectedLesson) {
        setLessonName("");
        setLessonDate("");
        return;
      }
      setLessonName(selectedLesson.lessonName ?? selectedLesson.name ?? "");
      setLessonDate(selectedLesson.lessonDate ?? selectedLesson.date ?? "");
    };
    initComponent();
  }, [selectedLesson]);

  const removeLesson = async () => {
    const id = selectedLesson?.lessonID ?? selectedLesson?.id;
    if (!id) return false;

    const success = await deleteLesson(id);
    if (!success) return false;

    const newIds = (course?.lessonIds ?? []).filter((x) => x !== id);

    const lessonToCourse = {
      courseID: course.id,
      lessonIDs: newIds,
    };

    const successSync = await putCourse(lessonToCourse);
    if (!successSync) return false;

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

    const lessonToCourse = {
      courseID: course.id,
      lessonIDs: lessonList,
    };

    const successSync = await putCourse(lessonToCourse);
    if (!successSync) return false;

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
          onChange={(e) => setLessonName(e.target.value)}
        />
      </label>

      <label>
        Lesson date:
        <input
          type="date"
          value={lessonDate}
          onChange={(e) => setLessonDate(e.target.value)}
        />
      </label>

      <button
        onClick={async () => {
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
      )}

      <pre>{JSON.stringify({ lessonName, lessonDate }, null, 2)}</pre>
    </div>
  );
};

export default NewLesson;