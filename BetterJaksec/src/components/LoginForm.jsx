import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function LoginForm() {
  const { handleLogin } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();

    const result = await handleLogin({ email, password });

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <form className="main-card" onSubmit={submitLogin}>
      <h2>Login</h2>

      <div className="inner-card inner-card--stack">
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Password</label>
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
        Login
      </button>
    </form>
  );
}