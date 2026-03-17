import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../contexts/UserContext";
import { AdminContext } from "../../contexts/AdminContext";
import LanguageSelector from "../../components/LanguageSwitcher.jsx";

const AdminView = () => {
  const { t } = useTranslation("common");
  const { handleLogout } = useContext(UserContext);
  const { checkPermission } = useContext(AdminContext);

  useEffect(() => {
    const init = () => {
      checkPermission();
    };
    init();
  }, []);
  return (
    <div className="main-card">
      <nav className="inner-card inner-card--wrap">
        <LanguageSelector></LanguageSelector>
        <Link className="btn" to="/admin">
          {t("main")}
        </Link>
        <Link className="btn" to="/admin/profile">
          {t("profile")}
        </Link>
        <Link className="btn" to="/admin/users">
          {t("manageUsers")}
        </Link>
        <Link className="btn" to="/admin/admin_attendance_tracking">
          {t("attendanceTrackingView")}
        </Link>
        <button
          className="btn btn--danger"
          onClick={() => {
            handleLogout();
          }}
        >
          {t("logOut")}
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminView;
