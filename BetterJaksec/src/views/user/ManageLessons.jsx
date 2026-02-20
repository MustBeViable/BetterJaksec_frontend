import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewLesson from "../../components/user/NewLesson";
import useLessonHook from "../../hooks/LessonHooks";

const ManageLessons = () => {
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
      ids.map(async (id) => {
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
    if (!state?.course) return;
    setCourse(state.course);
  }, [state]);

  useEffect(() => {
    if (!course) return;
    refreshLessons(course);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id, refreshKey]);

  return (
    <div
      style={{
        padding: "24px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "#e0e0e0",
          padding: "32px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
            color: "#070000",
          }}
        >
          <h1>Manage lessons</h1>
          <button
            type="button"
            onClick={() =>
              navigate("/courses/manage", {
                state: { course },
              })
            }
          >
            Return
          </button>
        </div>

        <div style={{ display: "flex", gap: "32px" }}>
          <div style={{ flex: 1 }}>
            <button
              type="button"
              onClick={() => {
                setSelectedLesson(null);
                setIsAddLessonOpen(true);
              }}
            >
              Add lesson
            </button>
          </div>

          <div
            style={{
              flex: 1,
              background: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <h2>Lessons:</h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {lessonList?.map((lesson) => (
                <button
                  key={lesson.lessonID ?? lesson.id}
                  type="button"
                  style={{
                    background: "#d9d9d9",
                    padding: "12px",
                    textAlign: "left",
                  }}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setIsAddLessonOpen(true);
                  }}
                >
                  {lesson.lessonName ?? lesson.name}
                </button>
              ))}

              {lessonList.length === 0 && <div>No lessons</div>}
            </div>
          </div>
        </div>
      </div>

      {isAddLessonOpen && (
        <div
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
            style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <NewLesson
              course={course}
              setCourse={setCourse}
              setIsAddLessonOpen={setIsAddLessonOpen}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              onUpdated={() => setRefreshKey((k) => k + 1)}
              onCreated={() => setRefreshKey((k) => k + 1)}
              onDeleted={() => setRefreshKey((k) => k + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLessons;
