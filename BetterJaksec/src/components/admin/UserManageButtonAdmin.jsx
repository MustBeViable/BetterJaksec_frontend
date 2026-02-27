import React from "react";

const UserManageButtonAdmin = ({ user, setSelectedUser }) => {
  return (
    <button
      className="btn"
      onClick={() => {
        setSelectedUser(user);
      }}
    >
      {user.firstName} {user.lastName}
    </button>
  );
};

export default UserManageButtonAdmin;