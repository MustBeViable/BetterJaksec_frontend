import React, { useEffect, useState } from "react";

const UserManageCard = ({ user, setSelectedUser }) => {
  const [role, setRole] = useState(user.role);
  const [saveUser, setSaveUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    setRole(user.role);
  }, [user]);

  useEffect(() => {
    if (!saveUser) return;
    const modifyUserRole = async () => {
        console.log(role);
      //add api call here
    };
    modifyUserRole();
  }, [saveUser]);

  useEffect(()=> {
    if (!deleteUser) return;
    const removeUser = async (user) => {
        //add api call here
    };
    removeUser();
  }, [deleteUser])

  //If needed add logic to change user's name etc.
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
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>Name: </td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Role: </td>
            <td>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ display: "flex", margin: "10px" }}>
        <button
          onClick={() => {
            setSelectedUser(null);
          }}
        >
          return
        </button>
        <button
          onClick={() => {
            setSaveUser(true);
            setSelectedUser(null);
          }}
        >
          Save
        </button>
        <button onClick={() => {
            setDeleteUser(true);
            setSelectedUser(null);
        }}>Delete user</button>
      </div>
    </div>
  );
};

export default UserManageCard;
