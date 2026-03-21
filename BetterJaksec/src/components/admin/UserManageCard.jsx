import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatInteger } from "../../i18n/format";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const UserManageCard = ({ user, setSelectedUser, setChange }) => {
  const { t, i18n } = useTranslation("common");
  const [role, setRole] = useState(user.isAdmin ? "admin" : "teacher");
  const { deleteStudent } = useStudentHook();
  const { putTeacher, deleteTeacher } = useTeacherHook();

  useEffect(() => {
    const init = () => {
      if (!user.teacherID) return;
      setRole(user.isAdmin ? "admin" : "teacher");
    };
    init();
  }, [user.teacherID, user.isAdmin]);

  const modifyUserRole = async () => {
    const teacherPut = {
      teacherID: user.teacherID,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: role === "admin",
    };
    return await putTeacher(teacherPut);
  };

  const deleteUser = async () => {
    if (user.teacherID) return deleteTeacher(user.teacherID);
    if (user.studentID) return deleteStudent(user.studentID);
    window.alert(t("notStudentOrTeacher"));
    return false;
  };

  return (
    <div className="inner-card inner-card--stack">
      <h1>{t("userManageCard")}</h1>

      <div className="inner-card">
        <table>
          <thead>
            <tr>
              <th>{t("userInfo")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("id")}</td>
              <td>
                {user.studentID ?? user.teacherID
                  ? formatInteger(Number(user.studentID ?? user.teacherID), i18n.language)
                  : ""}
              </td>
            </tr>
            <tr>
              <td>{t("name")}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
            </tr>

            {user.teacherID && (
              <tr>
                <td>{t("changeRole")}</td>
                <td>
                  <select
                    id="role-select"
                    value={role}
                    onChange={(evt) => setRole(evt.target.value)}
                  >
                    <option value="admin">{t("admin")}</option>
                    <option value="teacher">{t("teacher")}</option>
                  </select>
                </td>
              </tr>
            )}

            {user.studentID && (
              <tr>
                <td>{t("role")}</td>
                <td>{t("student")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="inner-card inner-card--row">
        <button className="btn" onClick={() => setSelectedUser(null)}>
          {t("return")}
        </button>

        <button
          className="btn btn--primary"
          onClick={async () => {
            const ok = await modifyUserRole();
            if (!ok) window.alert(t("didNotUpdate"));
            setChange(true);
            setSelectedUser(null);
          }}
        >
          {t("save")}
        </button>

        <button
          className="btn btn--danger"
          onClick={async () => {
            const ok = await deleteUser();
            if (!ok) window.alert(t("deletionDidNotSucceed"));
            else {
              setChange(true);
              setSelectedUser(null);
            }
          }}
        >
          {t("deleteUser")}
        </button>
      </div>
    </div>
  );
};

export default UserManageCard;