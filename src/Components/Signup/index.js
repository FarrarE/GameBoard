import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./index.css";

export default function Signup(props) {

  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Need to find a loading animation or make one
  const [userName, setUserName] = useState(null);
  const [pass, setPass] = useState(null);
  const [passConfirm, setPassConfirm] = useState(null);
  const [code, setCode] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (pass !== passConfirm) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: userName,
        password: pass,
      });

      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message)
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(userName, code);
      await Auth.signIn(userName, pass);
      props.confirmSignUp();
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <label>Confirmation Code</label>
        <input
          autoFocus
          type="tel"
          onChange={(event) => setCode(event.target.value)}
        />
        <button>Submit</button>
        <h1>Please check your email for the code.</h1>
      </form>
    );
  }

  function renderForm() {
    return (
      <div className="ribbon">
        <div className="signup-card">
          <form onSubmit={handleSubmit} className="signup-form">
            <label>Email</label>
            <input
              autoFocus
              type="email"
              onChange={(event) => setUserName(event.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(event) => setPass(event.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              onChange={(event) => setPassConfirm(event.target.value)}
            />
            <div>
              <button type="button" onClick={props.confirmSignUp}>Back</button>
              <span> </span>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}