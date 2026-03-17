import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../contexts/UserContext";
import LanguageSelector from "../../components/LanguageSwitcher.jsx";

const MainScreen = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { handleLogout, user } = useContext(UserContext);

  return (
    <div className="main-card">
      <LanguageSelector></LanguageSelector>
      <h1>{t("mainScreen")}</h1>
      <div className="inner-card inner-card--wrap">
        <button className="btn" onClick={() => navigate("/profile_page")}>
          {t("profile")}
        </button>

        {user?.role === "student" && (
          <>
            <button
              className="btn"
              onClick={() => navigate("/attendance_tracking")}
            >
              {t("coursesAndAttendanceStats")}
            </button>

            <button className="btn" onClick={() => navigate("/readqr")}>
              {t("readQr")}
            </button>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <button className="btn" onClick={() => navigate("/courses")}>
              {t("courses")}
            </button>
            <button
              className="btn"
              onClick={() => navigate("/admin_attendance_tracking")}
            >
              {t("attendanceStats")}
            </button>
          </>
        )}

        <button className="btn btn--danger" onClick={handleLogout}>
          {t("logOut")}
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
