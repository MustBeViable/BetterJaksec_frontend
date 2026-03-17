import React from "react";
import LoginForm from "../components/LoginForm";
import LanguageSelector from "../components/LanguageSwitcher.jsx";

const LogIn = () => {
  return (
    <div className="main-card">
      <LanguageSelector></LanguageSelector>
      <LoginForm />
    </div>
  );
};

export default LogIn;