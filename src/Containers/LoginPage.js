import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

function LoginPage(props) {
    const [mode, setMode] = useState(props.mode)
    const [view, setView] = useState(null);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        handleRender();
        setMode(props.mode);
    }, [props.mode]);

    // wrapper function for login authentication
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

    // wrapper function for login credentials
    async function loginHandler(email, password) {
        try {
            await Auth.signIn(email, password);
            authenticateLogin();
        } catch (e) {
            alert("Login error:" + e.message);
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

    // Toggles auth form visibility
    function authenticateLogin() {
        userHasAuthenticated(true);
    }

    // Lets user use application without authentication
    function runTest() {
        setView(null);
    }

    function confirmSignUp() {
        handleRender();
    }


    // 
    function handleRender() {
        if (isAuthenticated)
            return;

        let authenticated = checkForUser();
        if (authenticated) {
            setView(
                <Login
                    mode={mode}
                    toggleMode={props.toggleMode}
                    runTest={runTest}
                    authenticateLogin={authenticateLogin}
                    signUp={signUp} confirmSignUp={confirmSignUp}
                    handleSubmit={loginHandler}
                />);
        }
    }

    function signUp() {
        setView(<Signup
            mode={mode}
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