import React, { useState, useEffect } from "react";
import ToggleMode from '../ToggleMode';
import './styles/darkmode.css';
import './styles/index.css';
import './styles/lightmode.css';

function OptionTray(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [mode, setMode] = useState(props.mode);

  useEffect(() => {
    setMode(props.mode);
  }, [props.mode]);

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
            <h1 className={"h1-" + mode}>
              <span>
                Battlemap Arena
              </span>
            </h1>
            <p>Virtual Tabletop Toolset</p>
          </div>
          <div className="login-form">
            <form
              onSubmit={(e) => {
                props.handleSubmit(email, password);
                e.preventDefault();
              }}>
              <div className="login-form-content">
                <div>
                  <input
                    autoFocus
                    autocomplete="off"
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                  />
                </div>
                <div>
                  <button className="login-button lightMode" disabled={!validateForm()} type="submit" tabIndex="3">
                    <span>
                      Login
                  </span>
                  </button>
                </div>
              </div>
            </form>
            <div className="links">
              <span>Dont have an account?</span>
              <button onClick={props.signUp} tabIndex="1">Sign up here</button>
              <span>or</span>
              <button onClick={props.runTest} tabIndex="2">Try without signing up</button>
            </div>
          </div>
        </div>
      </div >
      <div id="login-toggle" className={props.mode}>
        <ToggleMode check={props.mode === "dark-mode" ? true : false} toggleMode={props.toggleMode} mode={props.mode} />
      </div>
    </div >
  );
}

export default OptionTray;