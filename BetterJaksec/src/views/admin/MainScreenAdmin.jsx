import React from "react";
import { useTranslation } from "react-i18next";

const MainScreenAdmin = () => {
  const { t } = useTranslation("common");

  return (
    <div className="inner-card inner-card--stack">
      <h1>{t("mainScreenTitle")}</h1>
    </div>
  );
};

export default MainScreenAdmin;
