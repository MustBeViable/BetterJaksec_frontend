import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/AuthHooks";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const ChangePasswordPage = () => {
  const { t } = useTranslation("common");
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
      setError(t("passwordsDoNotMatch"));
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
      setError(t("failedToChangePassword"));
    }
  };

  if (loading) return <div>{t("loading")}</div>;

  return (
    <div className="main-card">
      <div className="inner-card inner-card--stack">
        <h2>{t("changePassword")}</h2>

        <input
          type="password"
          placeholder={t("newPassword")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("confirmNewPassword")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <div className="inner-card inner-card--row">
          <button className="btn" onClick={handleCancel}>
            {t("cancel")}
          </button>
          <button className="btn btn--primary" onClick={handleConfirm}>
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
