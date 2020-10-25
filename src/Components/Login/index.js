import React, { useState } from "react";
import './styles/darkmode.css';
import './styles/index.css';
import './styles/lightmode.css';

function OptionTray(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [mode, setMode] = useState(props.mode);

  function validateForm() {
    if (email && password)
      return email.length > 0 && password.length > 0;
  }

  return (
    <div className={mode}>
      <div className="login-page">
        <link rel="stylesheet" type="text/css" href="./styles/lightmode.css" />
        <div className={"ribbon ribbon-" + mode}>
          <div className={"title title-" + mode}>
            <h1 className={"h1-" + mode}>Battlemaps</h1>
            <p>Virtual Tabletop Toolset</p>
          </div>
          <div className="login-form">
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
              <div>
                <button className="login-button lightMode" disabled={!validateForm()} type="submit" tabIndex="3">
                  <span>
                    Login
              </span>
                </button>
              </div>

            </form>
            <div className="links">
              <span>Dont have an account?</span>
              <a onClick={props.signUp} tabIndex="1"><span> Sign up here</span></a>
              <span>or</span>
              <a onClick={props.runTest} tabIndex="2"><span>Try without signing up</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionTray;