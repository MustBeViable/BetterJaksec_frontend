import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/AuthHooks";

const ProfilePage = () => {
  const { t } = useTranslation("common");
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

  if (!user) return <div>{t("loading")}</div>;

  return (
    <div className="main-card inner-card--stack">
      <div className="inner-card inner-card--row">
        <h1>{t("profile")}</h1>
        {(user?.role === "student" || user?.role === "teacher") && (
          <button
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            {t("return")}
          </button>
        )}
      </div>

      <div className="inner-card inner-card--stack">
        <div className="inner-card inner-card--stack">
          <p>{t("email")}: {user.email}</p>
          <p>{t("name")}: {user.firstName}</p>
          <p>{t("lastNameLabel")}: {user.lastName}</p>
        </div>

        <button
          className="btn btn--primary"
          onClick={() => navigate("/change-password")}
        >
          {t("changePasswordButton")}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
