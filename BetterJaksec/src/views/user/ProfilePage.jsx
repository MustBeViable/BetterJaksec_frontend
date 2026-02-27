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
      <div className="inner-card inner-card--stack">
        <div className="inner-card inner-card--stack">
          <h2>Profile</h2>
          {(user?.role === "student" || user?.role === "teacher") && (
            <button
              className="btn"
              onClick={() => {
                navigate("/");
              }}
            >
              Return
            </button>
          )}
          <div className="inner-card inner-card--stack">
            <p>Email: {user.email}</p>
            <p>Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
          </div>

          <button
            className="btn btn--primary"
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