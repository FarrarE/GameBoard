import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

function LoginPage(props) {
    const [mode, setMode] = useState(null);
    const [signingUp, setSigningUp] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isTest, setIsTest] = useState(false);

    useEffect(() => {
        checkForUser();
    }, []);

    async function loginHandler(email, password) {

        try {
            await Auth.signIn(email, password);
            authenticateLogin();
        } catch (e) {
            alert("Login error:" + e.message);
        }
    }

    async function checkForUser() {
        try {
            await Auth.currentSession();
            authenticateLogin();
        }
        catch (e) {
            console.log(e)
        }
    }

    async function handleLogout() {
        await Auth.signOut();

        /*
        userHasAuthenticated(false);
        setTokenList([]);
        setMapList([]);
        setCurrentMap(null);
        setGridScale(50);
        setMapScale(1);
        setIsTest(false);
        closeAll();
        */
    }

    // Toggles signUp form visibility
    function signUp() {
        setSigningUp(true);
    }

    function confirmSignUp() {
        setSigningUp(false);
    }

    // Toggles auth form visibility
    function authenticateLogin() {
        userHasAuthenticated(true);
    }

    // test state handler.
    function runTest() {
        userHasAuthenticated(true);
        setIsTest(true);
    }

    function toggleModeHandler(){

    }

    return (
        <div >
            <Login
                mode={mode}
                toggleMode={toggleModeHandler}
                runTest={runTest}
                authenticateLogin={authenticateLogin}
                signUp={signUp} confirmSignUp={confirmSignUp}
                handleSubmit={loginHandler}
            />
            <Signup
                mode={mode}
                userHasAuthenticated={userHasAuthenticated}
                confirmSignUp={confirmSignUp}
            />
        </div>
    );
}

export default LoginPage;