import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { AdminContext } from "../../contexts/AdminContext";

const AdminView = () => {
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
        <Link className="btn" to="/admin">
          Main
        </Link>
        <Link className="btn" to="/admin/profile">
          Profile
        </Link>
        <Link className="btn" to="/admin/users">
          Manage users
        </Link>
        <Link className="btn" to="/admin/admin_attendance_tracking">
          Attendance tracking view
        </Link>
        <button
          className="btn btn--danger"
          onClick={() => {
            handleLogout();
          }}
        >
          Log out
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminView;
