import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import EditTray from './Components/EditTray';
import TokenDrawer from './Components/TokenDrawer';


function App() {
  const [TokenDrawerState, setTokenDrawerState] = useState("drawerClosed");

  function drawerToggleClickHandler (){

    if(TokenDrawerState === "drawerClosed")
      setTokenDrawerState("drawerOpen")
    else 
      setTokenDrawerState("drawerClosed")
  }
  

  return (
    <div className="App">
      <EditTray toggle={drawerToggleClickHandler} />
      <TokenDrawer state={TokenDrawerState}/>
    </div>
  );
}

export default App;
