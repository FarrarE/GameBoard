import React, { useState } from "react";
import { Auth } from "aws-amplify";
import './index.css';

function OptionTray(props)  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
    
      try {
        await Auth.signIn(email, password);
        alert("Logged in");
        props.authenticateLogin();
      } catch (e) {
        alert(e.message);
      }
    }

  return (
    <div className="login-form"> 
        <div>
            Login
        </div>
        <div>
            <form onSubmit={handleSubmit}>
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
        </div>
    </div>
  );
}

export default OptionTray;