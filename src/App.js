import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { API, Auth } from "aws-amplify";
import EditTray from './Components/EditTray';
import TokenDrawer from './Components/TokenDrawer';
import MapDrawer from './Components/MapDrawer';
import OptionTray from './Components/OptionTray';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Canvas from "./Components/Canvas";

function App(props) {
  const [TokenDrawerState, setTokenDrawerState] = useState("drawerClosed");
  const [MapDrawerState, setMapDrawerState] = useState("drawerClosed");
  const [optionTray, setOptionTray] = useState(false);

  // Canvas state variables
  const [mapList, setMapList] = useState([]);
  const [tokenList, setTokenList] = useState([]);
  const [currentMap, setCurrentMap] = useState(null);
  const [mapScale, setMapScale] = useState(1);
  const [gridScale, setGridScale] = useState(50);

  // User authentication variables
  const [signingUp, setSigningUp] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isTest, setIsTest] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

  }

  async function loginHandler(email, password) {

    try {
      await Auth.signIn(email, password);
      authenticateLogin();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleUploadState() {

    let content = {
      maps: mapList,
      Tokens: tokenList
    }

    try {
      await uploadFiles({ content });
      alert("Files Uploaded");
    } catch (e) {
      alert(e.message);
    }
  }

  function uploadFiles(boardState) {
    return API.post("gameboard", "/gameboard", {
      body: "test"
    });
  }

  function signUp() {
    setSigningUp(true);
  }

  function confirmSignUp() {
    setSigningUp(false);
  }

  function authenticateLogin() {
    onLoad();
    userHasAuthenticated(true);
  }

  function runTest() {
    userHasAuthenticated(true);
    setIsTest(true);
  }

  function toggleOptionTray() {
    setOptionTray(!optionTray);
  }

  function closeAll() {
    setOptionTray(false);
    setTokenDrawerState("drawerClosed");
    setMapDrawerState("drawerClosed");
  }

  function toggleTokenTray() {

    if (MapDrawerState === "drawerOpen")
      toggleMaps();

    if (TokenDrawerState === "drawerClosed")
      setTokenDrawerState("drawerDocked")
    else
      setTokenDrawerState("drawerClosed")
  }

  function toggleMaps() {

    if (TokenDrawerState === "drawerDocked")
      toggleTokenTray();

    if (MapDrawerState === "drawerClosed")
      setMapDrawerState("drawerOpen")
    else
      setMapDrawerState("drawerClosed")
  }

  function changeMap(event) {
    let newMap = mapList[event.target.id[0]]
    setCurrentMap(newMap);
  }

  function scaleMap(event) {
    let scale = event.target.value / 50;
    setMapScale(scale);
  }

    function scaleGrid(event) {
    let scale = parseInt(event.target.value);
    setGridScale(scale);
  }

  function uploadBackground(event) {

    const imageFiles = event.target.files;
    const filesLength = imageFiles.length;

    for (let i = 0; i < filesLength; i++) {
      let reader = new FileReader();
      let file = imageFiles[i];

      reader.onloadend = () => {

        let img = new Image();
        img.src = reader.result;

        if (!currentMap) {
          img.onload = function () { setCurrentMap(img) };
        }
        setMapList(mapList => [...mapList, img]);
      }
      reader.readAsDataURL(file);
    }
  }

  function uploadTokenHandler(event) {

    const imageFiles = event.target.files;
    const filesLength = imageFiles.length;

    for (let i = 0; i < filesLength; i++) {
      let reader = new FileReader();
      let file = imageFiles[i];

      reader.onloadend = () => {

        let img = new Image();
        img.src = reader.result;

        setTokenList(mapList => [...mapList, img]);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="App">
      {signingUp && <Signup userHasAuthenticated={userHasAuthenticated} confirmSignUp={confirmSignUp} />}
      {!isAuthenticated ?
        <Login runTest={runTest} authenticateLogin={authenticateLogin} signUp={signUp} confirmSignUp={confirmSignUp} handleSubmit={loginHandler} />
        :
        <Canvas gridScale={gridScale} currentMap={currentMap} mapScale={mapScale} />
      }

      {optionTray && <OptionTray scaleGrid={scaleGrid} scaleMap={scaleMap} />}
      <EditTray toggleTokens={toggleTokenTray} toggleMaps={toggleMaps} toggleOptions={toggleOptionTray} close={closeAll} />
      <TokenDrawer state={TokenDrawerState} getToken={uploadTokenHandler} tokens={tokenList} />
      <MapDrawer state={MapDrawerState} getMap={uploadBackground} maps={mapList} changeMap={changeMap} />
    </div>
  );
}

export default App;
