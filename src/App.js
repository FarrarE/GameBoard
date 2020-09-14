import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import EditTray from './Components/EditTray';
import TokenDrawer from './Components/TokenDrawer';
import MapDrawer from './Components/MapDrawer';
import OptionTray from './Components/OptionTray';


function App() {
  const [TokenDrawerState, setTokenDrawerState] = useState("drawerClosed");
  const [MapDrawerState, setMapDrawerState] = useState("drawerClosed");
  const [optionTray, setOptionTray] = useState(false);
  
  useEffect(() => {


  },optionTray);
  
  function toggleOptionTray(){
    setOptionTray(!optionTray);
  }

  function closeAll(){
    setOptionTray(false);
    setTokenDrawerState("drawerClosed");
    setMapDrawerState("drawerClosed");
  }

  function toggleTokens(){

    if(MapDrawerState === "drawerOpen")
      toggleMaps();

    if(TokenDrawerState === "drawerClosed")
      setTokenDrawerState("drawerDocked")
    else 
      setTokenDrawerState("drawerClosed")
  }

  function toggleMaps(){

    if(TokenDrawerState === "drawerDocked")
      toggleTokens();

    if(MapDrawerState === "drawerClosed")
      setMapDrawerState("drawerOpen")
    else 
      setMapDrawerState("drawerClosed")

  }
  
  

  return (
    <div className="App">
      <EditTray toggleTokens={toggleTokens} toggleMaps={toggleMaps} toggleOptions={toggleOptionTray} close={closeAll} />
      {optionTray && <OptionTray />}
      <TokenDrawer state={TokenDrawerState}/>
      <MapDrawer state={MapDrawerState} />
    </div>
  );
}

export default App;
