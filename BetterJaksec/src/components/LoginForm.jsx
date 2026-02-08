import React, { useState //,useContext
 } from "react";
//import { UserContext } from "../contexts/UserContext";


export default function LoginForm() {
  //  const { handleLogin } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


return(
    <form onSubmit={(e) => { e.preventDefault();
    //handleLogin
    console.log(username, password);
}}>
    <h2>Login</h2>
    <div id="loginUsername">
        <label htmlFor="loginUsername">Username</label>
        <input id="loginUsername"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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