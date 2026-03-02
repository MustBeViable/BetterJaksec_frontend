import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/AuthHooks";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { getUserByToken } = useUser();
  const { putStudent } = useStudentHook();
  const { putTeacher } = useTeacherHook();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByToken();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleCancel = () => {
    if (user?.role?.toLowerCase() === "admin") {
      navigate("/admin/profile");
    } else {
      navigate("/profile_page");
    }
  };

  const handleConfirm = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const role = user.role.toLowerCase();
      const updateData = {
        email: user.email,
        password,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      if (role === "student") {
        await putStudent({ studentID: user.id, ...updateData });
      } else if (role === "teacher" || role === "admin") {
        await putTeacher({ teacherID: user.id, ...updateData });
      } else {
        console.log("Unhandled role:", role);
      }

      if (role === "admin") {
        navigate("/admin/profile");
      } else {
        navigate("/profile_page");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Failed to change password. Try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

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