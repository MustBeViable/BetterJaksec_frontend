import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Link, Outlet } from "react-router-dom";
import AttendanceTrackingView from "./AttendanceTrackingView";

const MainScreen = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useContext(UserContext);

  return (
    <div>
      <h1>MainScreen</h1>
      <div>
        <button
          onClick={() => {
            navigate("/profile_page");
          }}
        >
          Profile
        </button>

        {user?.role === "student" && (
          <>
            <button>Courses user (ei mitään vielä) </button>
            <button
              onClick={() => {
                navigate("/admin_attendance_tracking");
              }}
            >
              Attendance stats
            </button>
          </>
        )}
        {user?.role === "teacher" && (
          <button
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </button>
        )}
        <button
          onClick={() => {
            handleLogout();
          }}
        >
          log out
        </button>
      </div>
      {user?.role === "student" && (
        <AttendanceTrackingView />
      )}
    </div>
  );
};

export default MainScreen;
