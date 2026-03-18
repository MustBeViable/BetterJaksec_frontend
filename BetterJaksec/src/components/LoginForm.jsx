import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";


export default function LoginForm() {
  const { t } = useTranslation("common");

  const { handleLogin } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();

    const result = await handleLogin({ email, password });

    if (!result.success) {
      if (result.message === "Login failed") setError(t("loginFailed"));
      if (result.message === "Invalid email or password") setError(t("wrongCredentials"));
    }
  };

  return (
    <form className="main-card" onSubmit={submitLogin}>
      <h2>{t("login")}</h2>

      <div className="inner-card inner-card--stack">
        <label htmlFor="email">{t("email")}</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="inner-card inner-card--stack">
        <label htmlFor="password">{t("password")}</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </div>

      {error && (
        <div style={{ color: "var(--danger)", marginTop: "10px" }}>
          {error}
        </div>
      )}

      <button className="btn btn--primary" type="submit">
        {t("login")}
      </button>
    </form>
  );
}