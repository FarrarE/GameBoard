import React, { useState, useEffect, useRef } from "react";

import LoginPage from './Containers/LoginPage';

// css and constants
import './App.css';
import testToken1 from './Data/tokens/dax.jpg';
import testToken2 from './Data/tokens/pop.jpg';

function App(props) {
  const [mode, setMode] = useState(defaultMode(localStorage.getItem('mode')));
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

  return (
    <div className="App">
      <LoginPage
        mode={mode}
        toggleMode={toggleMode}
      />
    </div>
  );
}

export default App;
