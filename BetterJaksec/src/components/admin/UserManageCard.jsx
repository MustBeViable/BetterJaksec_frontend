import React, { useEffect, useState } from "react";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const UserManageCard = ({ user, setSelectedUser, setChange }) => {
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
    window.alert("not a student or teacher");
    return false;
  };

  return (
    <div className="inner-card inner-card--stack">
      <h1>UserManageCard</h1>

      <div className="inner-card">
        <table>
          <thead>
            <tr>
              <th>User info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{user.studentID ?? user.teacherID}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
            </tr>

            {user.teacherID && (
              <tr>
                <td>Change role:</td>
                <td>
                  <select
                    id="role-select"
                    value={role}
                    onChange={(evt) => setRole(evt.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </td>
              </tr>
            )}

            {user.studentID && (
              <tr>
                <td>Role:</td>
                <td>Student</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="inner-card inner-card--row">
        <button className="btn" onClick={() => setSelectedUser(null)}>
          Return
        </button>

        <button
          className="btn btn--primary"
          onClick={async () => {
            const ok = await modifyUserRole();
            if (!ok) window.alert("Did not update");
            setChange(true);
            setSelectedUser(null);
          }}
        >
          Save
        </button>

        <button
          className="btn btn--danger"
          onClick={async () => {
            const ok = await deleteUser();
            if (!ok) window.alert("Deletion did not succeed");
            else {
              setChange(true);
              setSelectedUser(null);
            }
          }}
        >
          Delete user
        </button>
      </div>
    </div>
  );
};

export default UserManageCard;