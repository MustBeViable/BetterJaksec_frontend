import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCourseHook from "../../hooks/CourseHook";

const CoursesView = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { getCourse } = useCourseHook();

  useEffect(() => {
    const renderCourses = async () => {
      const dbCourses = await getCourse();
      setCourses(dbCourses);
    };
    renderCourses();
  }, []);

  return (
    <div className="main-card">
      <div className="inner-card inner-card--stack">
        <div className="inner-card inner-card--row">
          <h1>{t("courses")}</h1>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            {t("return")}
          </button>
        </div>

        <h2>{t("listOfCourses")}</h2>

        <div className="inner-card inner-card--stack">
          {courses?.map((course) => (
            <button
              key={course.id}
              className="btn"
              onClick={() => {
                navigate("/courses/manage", {
                  state: { course },
                });
              }}
            >
              {course.name}
            </button>
          ))}
        </div>

        <div className="inner-card inner-card--row">
          <button
            className="btn btn--primary"
            onClick={() => {
              navigate("/courses/manage");
            }}
          >
            {t("addNewCourse")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesView;
