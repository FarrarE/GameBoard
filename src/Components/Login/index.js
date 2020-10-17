import React, { useState } from "react";
import './index.css';

function OptionTray(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function validateForm() {
    if (email && password)
      return email.length > 0 && password.length > 0;
  }



  return (
    <div className="login-page">
      <div className="ribbon">
        <div className="title">
          <h1>Battlemaps</h1>
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
            <button className="login-button" block bsSize="large" disabled={!validateForm()} type="submit">
              <span>
              Login
              </span>
            </button>
          </form>
          <div>
            Dont have an account?
            <button onClick={props.signUp}><span>Sign up here</span></button>
             <span> or </span>
            <button onClick={props.runTest}><span>Try without signing up</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionTray;