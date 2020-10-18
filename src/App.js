import React, { useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";
import EditTray from './Components/EditTray';
import TokenDrawer from './Components/TokenDrawer';
import MapDrawer from './Components/MapDrawer';
import OptionTray from './Components/OptionTray';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Canvas from "./Components/Canvas";
import s3Upload from "./libs/s3Bucket";
import s3Get from './libs/s3Get';
import postFiles from './libs/postFiles';
import getFiles from './libs/getFiles';
import updateFile from './libs/updateFile';
import './App.css';
import config from './config';

function App(props) {
  // List of game states
  const [gameList, setGameList] = useState(null);

  // Current game state
  const [gameState, SetGameState] = useState({gameId:null, mapKeys:[],tokenKeys:[]});

  // User interface variables
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
    checkForUser();
    loadDB();
  }, [isAuthenticated]);

  // State object function. Returns an object with the correct attributes to match schema for backend.
  function boardState(maps,tokens){
    const state = {
        content: {
            maps:maps,
            tokens:tokens
        }
    }
    return state;
}

  // Backend file upload functions

  async function loadDB() {
    if(!isAuthenticated || isTest)
      return;
    try {
      // getFiles is a lib function that queries backend for content
      const games = await getFiles();

      if(games[0]){
        // Stores information
        setGameList(games);

        // parses out that information into state
        gameState.gameId = games[0].gameid;
        gameState.mapKeys = games[0].content.maps;
        gameState.tokenKeys = games[0].content.tokens

        // Fetches assets from backend and populates local data structures
        for(let i = 0; i < gameState.mapKeys.length;++i){
          let file = await s3Get(gameState.mapKeys[i]);
          let img = new Image();
          img.src = file;
  
          let newMap = {
            img: img,
            key: gameState.mapKeys[i]
          }
    
          setMapList(mapList => [...mapList, newMap]);
        }

        for(let i = 0; i < gameState.tokenKeys.length;++i){
          let file = await s3Get(gameState.tokenKeys[i]);
          let img = new Image();
          img.src = file;
          
          let newToken = {
            img: img,
            key: gameState.tokenKeys[i]
          }
    
          setTokenList(tokenList => [...tokenList, newToken]);
        }
      }
    } catch (e) {
    }
  }


  // User authentication functions

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
    }
    catch (e) {
      console.log(e)
    }
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    setTokenList([]);
    setMapList([]);
    setCurrentMap(null);
    setGridScale(50);
    setMapScale(1);
    setIsTest(false);
    closeAll();
  }

  function signUp() {
    setSigningUp(true);
  }

  function confirmSignUp() {
    setSigningUp(false);
  }

  function authenticateLogin() {
    userHasAuthenticated(true);
  }

  function runTest() {
    userHasAuthenticated(true);
    setIsTest(true);
  }

  // User interface functions
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


  // Canvas variable functions
  function changeMap(event) {
    let newMap = mapList[event.target.id[0]]
    setCurrentMap(newMap.img);
  }

  function scaleMap(event) {
    let scale = event.target.value / 50;
    setMapScale(scale);
  }

  function scaleGrid(event) {
    let scale = parseInt(event.target.value);
    setGridScale(scale);
  }


  // Fetch file from user functions
  async function uploadBackground(event) {

    const imageFiles = event.target.files;

    let reader = new FileReader();
    let file = imageFiles[0];

    // checkMapSize fails if file is too large 
    if (!checkMapSize(file))
      return;

    let img = new Image();
    reader.onloadend = () => { img.src = reader.result; }

    if (!currentMap) {
      setCurrentMap(img);
    }


    let fileKey;
    let gameId;

    let newMap = {
      img: img,
      key: fileKey
    }

    if(!gameList[0]){
      try {
        fileKey = await s3Upload(file, file.type, "map");
        gameId = await postFiles(boardState(gameState.mapKeys, gameState.tokenKeys));
        gameState.gameId = gameId.gameid;
        gameState.mapKeys = [fileKey]
      } catch (e) {
        alert(e);
      }
    }else{

      try{
        fileKey = await s3Upload(file, file.type, "map");
        let list = gameState.mapKeys;
        gameState.mapKeys =  [...list, fileKey];
        await updateFile(boardState(gameState.mapKeys, gameState.tokenKeys), gameState.gameId);
      }catch(e){
        alert(e);
      }
    }


    setMapList(mapList => [...mapList, newMap]);

    reader.readAsDataURL(file);

  }

  async function uploadTokenHandler(event) {

    const imageFiles = event.target.files;

    let reader = new FileReader();
    let file = imageFiles[0];

    // checkTokenSize fails if file is too large 
    if (!checkTokenSize(file))
      return;

    let img = new Image();
    reader.onloadend = () => {img.src = reader.result;}

    let fileKey;
    let gameId;

    let newToken = {
      img: img,
      key: fileKey
    }

    if(!gameList[0]){
      try {
        fileKey = await s3Upload(file, file.type, "token");
        gameId = await postFiles(boardState(gameState.mapKeys, gameState.tokenKeys));
        gameState.gameId = gameId.gameid;
        gameState.tokenKeys = [fileKey]
      } catch (e) {
        alert(e);
      }
    }else{

      try{
        fileKey = await s3Upload(file, file.type, "token");
        let list = gameState.tokenKeys;
        gameState.tokenKeys =  [...list, fileKey];
        await updateFile(boardState(gameState.mapKeys, gameState.tokenKeys), gameState.gameId);
      }catch(e){
        alert(e);
      }
    }

    setTokenList(tokenList => [...tokenList, newToken]);
    reader.readAsDataURL(file);
  }

  function checkMapSize(file) {
    if (file && file.size > config.MAX_MAP_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_MAP_SIZE / 1000000
        } MB.`
      );
      return 0;
    }
    return 1;
  }

  function checkTokenSize(file) {
    if (file && file.size > config.MAX_TOKEN_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_TOKEN_SIZE / 8000
        } kb.`
      );
      return 0;
    }
    return 1;
  }

  return (
    <div className="App">

      {signingUp && <Signup userHasAuthenticated={userHasAuthenticated} confirmSignUp={confirmSignUp} />}
      {!isAuthenticated ?
        <Login runTest={runTest} authenticateLogin={authenticateLogin} signUp={signUp} confirmSignUp={confirmSignUp} handleSubmit={loginHandler} />
        :
        <Canvas gridScale={gridScale} currentMap={currentMap} mapScale={mapScale} />
      }

      {optionTray && <OptionTray scaleGrid={scaleGrid} scaleMap={scaleMap} handleLogout={handleLogout} />}
      <EditTray toggleTokens={toggleTokenTray} toggleMaps={toggleMaps} toggleOptions={toggleOptionTray} close={closeAll} />
      <TokenDrawer state={TokenDrawerState} getToken={uploadTokenHandler} tokens={tokenList} />
      <MapDrawer state={MapDrawerState} getMap={uploadBackground} maps={mapList} changeMap={changeMap} />
    </div>
  );
}

export default App;
