import React, { useState } from "react";
import './styles/index.css';
import lightMode from "./styles/lightmode";
import darkMode from "./styles/darkmode";

function OptionTray(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [mode, setMode] = useState(darkMode);

  function validateForm() {
    if (email && password)
      return email.length > 0 && password.length > 0;
  }

  return (
    <div className="login-page" style={mode.loginPage}>
      <link rel="stylesheet" type="text/css" href="./styles/lightmode.css" />
      <div className="ribbon" style={mode.ribbon}>
        <div className="title">
          <h1 style={mode.h1}>Battlemaps</h1>
          <p style={mode.subTitle}>Virtual Tabletop Toolset</p>
        </div>
        <div className="login-form" style={mode.loginForm}>
          <form
            onSubmit={(e) => {
              props.handleSubmit(email, password);
              e.preventDefault();
            }}>
            <input
              autoFocus
              type="email"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
            <button className="login-button lightMode" disabled={!validateForm()} type="submit" tabIndex="3">
              <span>
                Login
              </span>
            </button>
          </form>
            <div className="links">
              <span>Dont have an account?</span>
              <a onClick={props.signUp} tabIndex="1"><span> Sign up here</span></a>
              <span>or</span>
              <a onClick={props.runTest} tabIndex="2"><span>Try without signing up</span></a>
            </div>
        </div>
        </div>
        <label class="switch">
            <input type="checkbox" />
              <span class="slider round"></span>
          </label>
      </div>
  );
}

export default OptionTray;