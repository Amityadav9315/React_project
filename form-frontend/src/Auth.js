import React, { useState } from "react";
import axios from "axios";

function Auth({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signup = () => {
    axios.post("http://localhost:8080/api/auth/signup", { username, password })
      .then(res => setMessage(res.data))
      .catch(() => setMessage("Error occurred"));
  };

  const login = () => {
    axios.post("http://localhost:8080/api/auth/login", { username, password })
      .then(res => {
        setMessage(res.data);
        if (res.data === "Login successful!") {
          onLogin();
        }
      })
      .catch(() => setMessage("Error occurred"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login / Signup</h1>
      <input 
        type="text" placeholder="Username"
        value={username} onChange={e => setUsername(e.target.value)}
      /><br /><br />
      <input 
        type="password" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)}
      /><br /><br />
      
      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
      
      <p>{message}</p>
    </div>
  );
}

export default Auth;
