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
  <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
    <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "6px", width: "320px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2 style={{ textAlign: "center" }}>Change Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", fontSize: "1rem" }}
      />

      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ padding: "10px", fontSize: "1rem" }}
      />

      {error && (
        <div style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button
          onClick={handleCancel}
          style={{ flex: 1, padding: "10px", cursor: "pointer" }}
        >
          Cancel
        </button>

        <button
          onClick={handleConfirm}
          style={{ flex: 1, padding: "10px", cursor: "pointer", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);
};

export default ChangePasswordPage;