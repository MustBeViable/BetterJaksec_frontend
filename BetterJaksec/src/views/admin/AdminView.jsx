import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { AdminContext } from "../../contexts/AdminContext";

const AdminView = () => {
  const { handleLogout } = useContext(UserContext);
  const { checkPermission } = useContext(AdminContext);

  
  useEffect(() => {
    const init = () => {
      checkPermission();
    }
    init()
  }, [])
  return (
    <>
    {/* Joko oma profiili adminille tai sit näin miten nyt reitittää */}
      <nav style={{margin: "10px"}}>
        <Link to="/admin" style={{margin: "10px"}}>Main</Link>
        <Link to="/admin/profile" style={{margin: "10px"}}>Profile</Link>
        <Link to="/admin/users" style={{margin: "10px"}}>Manage users</Link>
        <button style={{margin: "10px"}} onClick={()=> {handleLogout()}}>Log out</button>
      </nav>
      <Outlet />
    </>
  );
};

export default AdminView;
