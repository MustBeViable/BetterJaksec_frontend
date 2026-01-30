import React from "react";
import { Outlet, Link } from "react-router-dom";

const MainScreen = () => {

  return (
    <>
    <h1>Main screen</h1>
      <nav>
        <ul>
          <li>
            <Link to="/profile_page">Profile</Link>
          </li>
          <li>
            <button>Log out</button>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainScreen;
