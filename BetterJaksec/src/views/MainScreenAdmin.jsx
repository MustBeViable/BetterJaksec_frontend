import React from "react";
import { Link, Outlet } from "react-router-dom";

const MainScreenAdmin = () => {
  return (
    <>
      <h1>Main screen</h1>

      <nav>
        <Link to="/profile_page">Profile</Link>
        <button>Log out</button>
      </nav>

      <div>
        <Link to="users">Manage users</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainScreenAdmin;
