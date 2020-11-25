import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import Login from "../Components/Login";
import Signup from "../Components/Signup";

function LoginPage(props) {
    const [view, setView] = useState(null);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        defaultView();
    }, [props.mode]);

    // wrapper function for login authentication
    async function checkForUser() {
        try {
            let session = await Auth.currentSession();
            authenticateLogin();
            return true;
        }
        catch (e) {
            console.log(e)
            return false;
        }
    }

    // wrapper function for login credentials
    async function loginHandler(email, password) {
        try {
            await Auth.signIn(email, password);
            authenticateLogin();
            return true;
        } catch (e) {
            alert("Login error:" + e.message);
            return false;
        }
    }

    // Toggles auth form visibility
    function authenticateLogin() {
        userHasAuthenticated(true);
        setView(null);
        props.setLoggedIn(true);
    }

    // Lets user use application without authentication
    function runTest() {
        setView(null);
        props.setIsTest(true);
    }

    function confirmSignUp() {
        defaultView();
    }

    // Sets the home view for the page component
    function defaultView() {
        if(!checkForUser())
            return;

        setView(
            <Login
                mode={props.mode}
                toggleMode={props.toggleMode}
                runTest={runTest}
                authenticateLogin={authenticateLogin}
                signUp={signUp} confirmSignUp={confirmSignUp}
                handleSubmit={loginHandler}
            />);
    }

    // Sets view to signUp component
    function signUp() {
        setView(<Signup
            mode={props.mode}
            userHasAuthenticated={userHasAuthenticated}
            confirmSignUp={confirmSignUp}
        />);
    }

    return (
        <div >
            {view}
        </div>
    );
}

export default LoginPage;