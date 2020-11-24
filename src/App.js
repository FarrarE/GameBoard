import React, { useState, useEffect, useRef } from "react";

import LoginPage from './Containers/LoginPage';



// css and constants
import './App.css';
import * as Constants from './constants';
import testToken1 from './Data/tokens/dax.jpg';
import testToken2 from './Data/tokens/pop.jpg';

function App(props) {
  const [mode, setMode] = useState(null);
  useEffect(() => {
  }, []);

  function defaultMode(stored) {
    if (stored === null)
      return "light-mode"
    else return stored;
  }


  return (
    <div className="App">
      <LoginPage
        mode={mode}
      />

    </div>
  );
}

export default App;
