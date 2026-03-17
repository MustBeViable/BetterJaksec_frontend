import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const NewUser = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [newEmailChange, setNewEmailChange] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const schoolEmail = "school.com";

  const { postStudent } = useStudentHook();
  const { postTeacher } = useTeacherHook();

  const handlePost = async () => {
    if (role === "student") {
      return await postStudent({ firstName, lastName, email });
    }
    return await postTeacher({
      firstName,
      lastName,
      email,
      isAdmin: role === "admin",
    });
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    const firstOk = firstName.trim().length > 0;
    const lastOk = lastName.trim().length > 0;
    const emailOk = email.trim().length > 0;

    setFirstNameError(firstOk ? "" : t("required"));
    setLastNameError(lastOk ? "" : t("required"));
    setEmailError(emailOk ? "" : t("required"));

    if (!firstOk || !lastOk || !emailOk) return;

    const ok = await handlePost();
    if (ok) navigate("/admin/users");
  };

  useEffect(() => {
    const generateEmail = () => {
      if (firstName.trim() === "") return;
      if (lastName.trim() === "") return;
      const nextEmail = `${firstName}.${lastName}@${schoolEmail}`;
      setEmail(nextEmail);
    };
    generateEmail();
  }, [firstName, lastName, newEmailChange]);

  return (
    <div className="main-card">
      <h1>{t("newUser")}</h1>

      <form onSubmit={onSubmit} className="inner-card inner-card--stack">
        <div className="inner-card inner-card--stack">
          <label htmlFor="newUserFirstName">{t("firstName")}</label>
          <input
            type="text"
            id="newUserFirstName"
            value={firstName}
            onChange={(evt) => {
              setFirstName(evt.target.value);
              if (firstNameError) setFirstNameError("");
            }}
          />
          {firstNameError && (
            <p style={{ color: "var(--danger)" }}>{firstNameError}</p>
          )}

          <label htmlFor="newUserLastName">{t("lastName")}</label>
          <input
            type="text"
            id="newUserLastName"
            value={lastName}
            onChange={(evt) => {
              setLastName(evt.target.value);
              if (lastNameError) setLastNameError("");
            }}
          />
          {lastNameError && (
            <p style={{ color: "var(--danger)" }}>{lastNameError}</p>
          )}

          <label htmlFor="role">{t("selectRole")}</label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="teacher">{t("teacher")}</option>
            <option value="student">{t("student")}</option>
            <option value="admin">{t("admin")}</option>
          </select>

          <label htmlFor="newUserEmail">{t("generatedEmail")}</label>
          <input
            type="email"
            id="newUserEmail"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
              setNewEmailChange((prev) => !prev);
              if (emailError) setEmailError("");
            }}
          />
          {emailError && <p style={{ color: "var(--danger)" }}>{emailError}</p>}
        </div>

        <div className="inner-card inner-card--row">
          <button className="btn btn--primary" type="submit">
            {t("addUser")}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => navigate("/admin/users")}
          >
            {t("return")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
