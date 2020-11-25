import React, { useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";

import LoginPage from './Containers/LoginPage';
import MapPage from './Containers/MapPage';

// css and constants
import './App.css';
import testToken1 from './Data/tokens/dax.jpg';
import testToken2 from './Data/tokens/pop.jpg';

function App(props) {
  const [mode, setMode] = useState(defaultMode());
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTest, setIsTest] = useState(false);

  // preloaded assets for user testing
  const testState = {
    tokens: [testToken1, testToken2]
  }

  useEffect(() => {
  }, []);

  // Checks if user has set mode previously by checking local storage
  function defaultMode() {
    let stored = localStorage.getItem('mode');
    if (stored === null)
      return "light-mode"
    else return stored;
  }

  // Saves mode to local storage and toggles between the two modes
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
    } catch (e) { console.log(e) }
    setIsTest(false);
    setLoggedIn(false);
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
