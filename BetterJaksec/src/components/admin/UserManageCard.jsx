import React, { useEffect, useState } from "react";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const UserManageCard = ({ user, setSelectedUser, setChange }) => {
  const [role, setRole] = useState(user.isAdmin ? "admin" : "teacher");
  const { deleteStudent } = useStudentHook();
  const { putTeacher, deleteTeacher } = useTeacherHook();

  useEffect(() => {
    const roleInit = () => {
      if (!user.teacherID) return;
      setRole(user.admin ? "admin" : "teacher");
      console.log(user);
    };
    roleInit();
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
    if (user.teacherID) {
      const success = deleteTeacher(user.teacherID);
      if (!success) return false;
      return true;
    }
    if (user.studentID) {
      const success = deleteStudent(user.studentID);
      if (!success) return false;
      return true;
    }
    window.alert("not a student or teacher");
    return false;
  };

  return (
    <div>
      <h1>UserManageCard</h1>

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
            <td>Name: </td>
            <td>
              {user.firstName} {user.lastName}
            </td>
          </tr>

          {user.teacherID && (
            <>
              <tr>
                <td>Change role: </td>
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
            </>
          )}

          {user.studentID && (
            <tr>
              <td>Role: </td>
              <td>Student</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ display: "flex", margin: "10px" }}>
        <button onClick={() => setSelectedUser(null)}>return</button>

        <button
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
          onClick={() => {
            const ok = deleteUser();
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
