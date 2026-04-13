import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLessonHook from "../../hooks/LessonHooks";
import LocalizedDatePicker from "../LocalizedDatePicker";

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
  const { t, i18n } = useTranslation("common"); 
  const [lessonName, setLessonName] = useState("");
  const [lessonDate, setLessonDate] = useState("");

  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");

  const navigate = useNavigate();
  const { postLesson, putLesson, deleteLesson } = useLessonHook();

  const localeMap = {
    en: "en_US",
    fi: "fi_FI",
    de: "de_DE",
    ja: "ja_JP",
    zh: "zh_CN",
    fa: "fa_IR",
  };

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
      locale: localeMap[i18n.language] ?? "en_US",
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
    <div className="inner-card inner-card--stack">
      <h1>{t("newLesson")}</h1>

      <label>
        <p>{t("lessonName")}</p>
        <input
          type="text"
          value={lessonName}
          onChange={(e) => {
            setLessonName(e.target.value);
            if (nameError) setNameError("");
          }}
        />
        {nameError && <p style={{ color: "var(--danger)" }}>{nameError}</p>}
      </label>

      <label>
        <p>{t("lessonDate")}</p>
        <LocalizedDatePicker
          value={lessonDate}
          onChange={(newDate) => {
            setLessonDate(newDate);
            if (dateError) setDateError("");
          }}
        />
        {dateError && <p style={{ color: "var(--danger)" }}>{dateError}</p>}
      </label>

      <button
        className="btn btn--primary"
        onClick={async () => {
          const nameOk = lessonName.trim().length > 0;
          const dateOk = lessonDate.trim().length > 0;

          setNameError(nameOk ? "" : t("required"));
          setDateError(dateOk ? "" : t("required"));

          if (!nameOk || !dateOk) return;

          const ok = await newLesson();
          if (!ok) {
            window.alert(t("requestFailed"));
            return;
          }
          setIsAddLessonOpen(false);
          setSelectedLesson(null);
        }}
      >
        {t("save")}
      </button>

      <button
        className="btn"
        onClick={() => {
          setIsAddLessonOpen(false);
          setSelectedLesson(null);
        }}
      >
        {t("cancel")}
      </button>

      {selectedLesson && (
        <div className="inner-card inner-card--row">
          <button
            className="btn btn--danger"
            onClick={async () => {
              const ok = await removeLesson();
              if (!ok) {
                window.alert(t("deletionFailed"));
                return;
              }
              setIsAddLessonOpen(false);
              setSelectedLesson(null);
            }}
          >
            {t("deleteLesson")}
          </button>
          <button
            className="btn"
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
            {t("startLessonTracking")}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewLesson;