import React, { useState } from "react";
import './index.css';

function OptionTray(props)  {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
  
    function validateForm() {
      if(email && password)
        return email.length > 0 && password.length > 0;
    }
  


  return (
    <div className="login-page"> 
        <div className="title">
            <h1>Battlemaps</h1>
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
                  <button block bsSize="large" disabled={!validateForm()} type="submit">
                  Login
                  </button>
            </form>
            <div>
            Dont have an account?
            <button onClick={props.signUp}>Sign up here</button>
            or
            <button onClick={props.runTest}>Test without signing up</button>
            </div>

        </div>
    </div>
  );
}

export default OptionTray;