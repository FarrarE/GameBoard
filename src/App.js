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
  const [isTest, setIsTest] = useState(false);

  // preloaded assets for user testing
  const testState = {
    tokens: [testToken1, testToken2]
  }

  useEffect(() => {
  }, []);

  function defaultMode(stored) {
    console.log(stored)
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

  return (
    <div className="App">
      <LoginPage
        mode={mode}
        toggleMode={toggleMode}
      />
      <MapPage
        mode={mode}
        isTest={isTest}
        toggleMode={toggleMode}
        testState={testState}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default App;
