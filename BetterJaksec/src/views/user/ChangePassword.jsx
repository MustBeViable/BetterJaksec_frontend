import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/AuthHooks";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { getUserByToken } = useUser();

  const { putStudent } = useStudentHook();
  const { putTeacher } = useTeacherHook();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCancel = () => {
    navigate("/profile_page");
  };

  const handleConfirm = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const user = await getUserByToken();
      const role = user.role.toLowerCase();

      if (role === "student") {
        await putStudent({ studentID: user.studentID, password });
      } else if (role === "teacher") {
        await putTeacher({ teacherID: user.teacherID, password });
      }

      navigate("/profile_page");
    } catch (err) {
      console.log(err);
      setError("Failed to change password. Try again.");
    }
  };

  return (
    <div className="main-card">
      <div className="inner-card inner-card--stack">
        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <div className="inner-card inner-card--row">
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>

          <button className="btn btn--primary" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;