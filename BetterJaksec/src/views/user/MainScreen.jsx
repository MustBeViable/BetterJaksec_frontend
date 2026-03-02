import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const MainScreen = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useContext(UserContext);

  return (
    <div className="main-card">
      <h1>MainScreen</h1>
      <div className="inner-card inner-card--wrap">
        <button
          className="btn"
          onClick={() => navigate("/profile_page")}
        >
          Profile
        </button>

        {user?.role === "student" && (
          <button
            className="btn"
            onClick={() => navigate("/attendance_tracking")}
          >
            Courses and attendance stats
          </button>
        )}

        {user?.role === "teacher" && (
          <>
            <button
              className="btn"
              onClick={() => navigate("/courses")}
            >
              Courses
            </button>
            <button
              className="btn"
              onClick={() => navigate("/admin_attendance_tracking")}
            >
              Attendance Stats
            </button>
          </>
        )}

        <button
          className="btn btn--danger"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default MainScreen