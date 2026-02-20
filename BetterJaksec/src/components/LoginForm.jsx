import React, { useState,useContext} from "react";
import { UserContext } from "../contexts/UserContext";


export default function LoginForm() {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


return(
    <form onSubmit={(e) => { e.preventDefault();
        handleLogin({ email: email, password: password });}}>
            
    <h2>Login</h2>
    <div id="loginEmail">
        <label htmlFor="loginEmail">Email</label>
        <input id="loginEmail"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
    </div>

    <div id="loginPassword">
        <label htmlFor="loginPassword">Password</label>
        <input id="loginPassword"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
    </div>

    <button id="loginButton" type="submit"> login</button>
    </form>

)}