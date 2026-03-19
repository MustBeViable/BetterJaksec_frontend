import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewLesson from "../../components/user/NewLesson";
import useLessonHook from "../../hooks/LessonHooks";
import LanguageSelector from "../../components/LanguageSwitcher";

const ManageLessons = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { state } = useLocation();

  const [course, setCourse] = useState();
  const [lessonList, setLessonList] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState();
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const { getLesson } = useLessonHook();

  const refreshLessons = async (c = course) => {
    const ids = c?.lessonIds ?? [];
    if (ids.length === 0) {
      setLessonList([]);
      return;
    }

    const lessons = await Promise.all(
      ids?.map(async (id) => {
        try {
          const res = await getLesson(id);
          return res ?? null;
        } catch {
          return null;
        }
      }),
    );

    setLessonList(lessons.filter(Boolean));
  };

  useEffect(() => {
    const initCourse = () => {
      if (!state?.course) return;
      setCourse(state.course);
    };
    initCourse();
  }, [state]);

  useEffect(() => {
    const refreshPage = () => {
      if (!course) return;
      refreshLessons(course);
    };
    refreshPage();
  }, [course?.id, refreshKey]);

  return (
    <div className="main-card">
      <div className="inner-card inner-card--stack">
        <div className="inner-card inner-card--row">
          <h1>{t("manageLessons")}</h1>
          <LanguageSelector></LanguageSelector>
          <button
            className="btn"
            type="button"
            onClick={() =>
              navigate("/courses/manage", {
                state: { course },
              })
            }
          >
            {t("return")}
          </button>
        </div>

        <div className="inner-card inner-card--row">
          <div className="inner-card" style={{ flex: 1 }}>
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => {
                setSelectedLesson(null);
                setIsAddLessonOpen(true);
              }}
            >
              {t("addLesson")}
            </button>
          </div>

          <div className="inner-card inner-card--stack" style={{ flex: 1 }}>
            <h2>{t("lessons")}</h2>

            <div className="inner-card inner-card--stack">
              {lessonList?.map((lesson) => (
                <button
                  key={lesson.lessonID ?? lesson.id}
                  type="button"
                  className="btn"
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setIsAddLessonOpen(true);
                  }}
                >
                  {lesson.lessonName ?? lesson.name}
                </button>
              ))}

              {lessonList.length === 0 && <div>{t("noLessons")}</div>}
            </div>
          </div>
        </div>
      </div>

      {isAddLessonOpen && (
        <div
          className="inner-card"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setIsAddLessonOpen(false);
            setSelectedLesson(null);
          }}
        >
          <div
            className="inner-card"
            style={{ background: "#fff", padding: "24px", borderRadius: "12px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <NewLesson
              course={course}
              setCourse={setCourse}
              setIsAddLessonOpen={setIsAddLessonOpen}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              onCreated={() => setRefreshKey((prev) => prev + 1)}
              onUpdated={() => setRefreshKey((prev) => prev + 1)}
              onDeleted={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLessons;
