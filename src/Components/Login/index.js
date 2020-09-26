import React, { useState } from "react";
import './index.css';

function OptionTray(props)  {
    const [email, setEmail] = useState("example@website.com");
    const [password, setPassword] = useState("password");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  


  return (
    <div className="login-form"> 
        <div>
            Login
        </div>
        <div>
            <form onSubmit={(e) => {
              props.handleSubmit(email, password);
              e.preventDefault();
              }}>
                <input
                    autoFocus
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    />
                    <button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                    </button>
            </form>
            Dont have an account?
            <button onClick={props.signUp}>Sign up here</button>
            or
            <button onClick={props.authenticateLogin}>Test without signing up</button>
        </div>
    </div>
  );
}

export default OptionTray;