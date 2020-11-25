import React, { useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";

import LoginPage from './Containers/LoginPage';
import MapPage from './Containers/MapPage';

// css and constants
import './App.css';
import testToken1 from './Data/tokens/dax.jpg';
import testToken2 from './Data/tokens/pop.jpg';

function App(props) {
  const [mode, setMode] = useState(defaultMode(localStorage.getItem('mode')));
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTest, setIsTest] = useState(false);

  // preloaded assets for user testing
  const testState = {
    tokens: [testToken1, testToken2]
  }

  useEffect(() => {
  }, []);

  function defaultMode(stored) {
    if (stored === null)
      return "light-mode"
    else return stored;
  }

  function toggleMode() {
    if (mode === "light-mode") {
      setMode("dark-mode")
      localStorage.setItem('mode', 'dark-mode');
    } else {
      setMode("light-mode")
      localStorage.setItem('mode', 'light-mode');
    }
  }

  async function handleLogout() {
    try {
      await Auth.signOut();
    } catch { console.log("No user") }
    setIsTest(false);
    setLoggedIn(false);
    /*
    userHasAuthenticated(false);
    setTokenList([]);
    setMapList([]);
    setCurrentMap(null);
    setGridScale(50);
    setMapScale(1);
    closeAll();
    */
  }

  return (
    <div className="App">
      {(loggedIn || isTest) ?
        <MapPage
          mode={mode}
          isTest={isTest}
          toggleMode={toggleMode}
          testState={testState}
          handleLogout={handleLogout}
        />
        :
        <LoginPage
          mode={mode}
          toggleMode={toggleMode}
          setIsTest={setIsTest}
          setLoggedIn={setLoggedIn}
        />
      }
    </div>
  );
}

export default App;
