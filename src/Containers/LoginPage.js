import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

function LoginPage(props) {
    const [mode, setMode] = useState(null);
    const [view, setView] = useState(null);

    const [signingUp, setSigningUp] = useState(false);
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isTest, setIsTest] = useState(false);

    useEffect(() => {
        handleRender();
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
            return true;
        }
        catch (e) {
            console.log(e)
            return false;
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
        setView(<Signup
            mode={mode}
            userHasAuthenticated={userHasAuthenticated}
            confirmSignUp={confirmSignUp}
        />);
    }

    function confirmSignUp() {
        setSigningUp(false);
        handleRender();
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

    function toggleModeHandler() {

    }

    function handleRender() {
        if (isAuthenticated)
            return;

        let authenticated = checkForUser();
        if (authenticated) {
            setView(
                < Login
                    mode={mode}
                    toggleMode={toggleModeHandler}
                    runTest={runTest}
                    authenticateLogin={authenticateLogin}
                    signUp={signUp} confirmSignUp={confirmSignUp}
                    handleSubmit={loginHandler}
                />);
        }
    }

    return (
        <div >
            {view}
        </div>
    );
}

export default LoginPage;