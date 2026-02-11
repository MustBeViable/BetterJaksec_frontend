import React from "react";
import { Link} from "react-router-dom";

const ProfilePage = () => {

  return (
    <>
      <div style={{ display: "flex", alignItems:"flex-start", justifyContent: "space-between" ,gap:"40px",marginLeft:"40px",marginRight:"40px"}}>
  
  {/* LEFT: profile info (vertical) */}
  <div style={{color: "#070202", display: "flex", flexDirection: "column", fontSize: "1.6rem", paddingRight: "200px",paddingBottom:"200px"}}>
    <h2>Profile</h2>
      <div style={{ 
        background: "#f5f5f5", 
        padding: "15px", 
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",paddingBottom:"20px"
          }}>
       <div>Email</div>
       <div>Name: Jukka-olli67</div>       
       <div>LastName</div>
        </div>
        <button style={{ 
        marginTop: "20px",}}
        >Change password</button>
  </div>

  {/* RIGHT: navigation */}
  <div style={{ display: "flex",gap:"3px",paddingTop:"45px" }}>
    <Link to="/">Return</Link>
   
  </div>

</div>
    </>
  );
};

export default ProfilePage;