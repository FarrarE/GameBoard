import React, { useState } from "react";

import './index.css';

function OptionTray(props)  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
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
        </div>
        {/* <div>
            Mode
        </div>
        <div>
            <BsToggleOff />
        </div> */}
    </div>
  );
}

export default OptionTray;