import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminView = () => {
  return (
    <>
    {/* Joko oma profiili adminille tai sit näin miten nyt reitittää */}
      <nav style={{margin: "10px"}}>
        <Link to="/" style={{margin: "10px"}}>Takas user paikkaa</Link>
        <Link to="/admin" style={{margin: "10px"}}>Main</Link>
        <Link to="/admin/profile" style={{margin: "10px"}}>Profile</Link>
        <Link to="/admin/users" style={{margin: "10px"}}>Manage users</Link>
        <button style={{margin: "10px"}}>Log out</button>
      </nav>
      <Outlet />
    </>
  );
};

export default AdminView;
