import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/AuthHooks";

const ProfilePage = () => {
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByToken();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "40px",
          marginLeft: "40px",
          marginRight: "40px",
        }}
      >
        {/* LEFT: profile info */}
        <div
          style={{
            color: "#070202",
            display: "flex",
            flexDirection: "column",
            fontSize: "1.6rem",
            paddingRight: "200px",
            paddingBottom: "200px",
          }}
        >
          <h2>Profile</h2>

          <div
            style={{
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              paddingBottom: "20px",
            }}
          >
            <div>Email: {user.email}</div>
            <div>Name: {user.firstName}</div>
            <div>Last Name: {user.lastName}</div>
          </div>

          <button
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/change-password")}
          >
            Change password
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;