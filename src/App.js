import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { fabric } from "fabric";
import EditTray from './Components/EditTray';
import TokenDrawer from './Components/TokenDrawer';
import MapDrawer from './Components/MapDrawer';
import OptionTray from './Components/OptionTray';
import Droppable from "./Components/Droppable";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App(props) {
  const [TokenDrawerState, setTokenDrawerState] = useState("drawerClosed");
  const [MapDrawerState, setMapDrawerState] = useState("drawerClosed");
  const [optionTray, setOptionTray] = useState(false);
  const [gridScale, setGridScale] = useState(50);
  const [mapList, setMapList] = useState([]);
  const [mapScale, setMapScale] = useState(1);
  const [tokenList, setTokenList] = useState([]);
  const [currentMap, setCurrentMap] = useState(null);
  const [currentTokens, setCurrentTokens] = useState([]);
  const [canvas, setCanvas] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  

  useEffect(() => {
    
    // Initialize grid on canvas
    let c = new fabric.Canvas('c', { selection: false });
    setSnap(c, gridScale)
    setCanvas(c, gridScale);
    drawGrid(c, gridScale);
    setOnScroll(c);
    
  },[]);

  function setSnap(canvas, scale){
    canvas.on('object:moving', function(options) { 
      options.target.left = Math.round(options.target.left / scale) * scale;
      options.target.top = Math.round(options.target.top / scale) * scale
      options.target.setCoords();
    })

    canvas.on('mouse:dblclick', function(options) { 
      canvas.getActiveObject().scaleToWidth(scale);
      canvas.getActiveObject().scaleToHeight(scale);
      canvas.renderAll();
    })
  }

  function setOnScroll(canvas){
    let x = document.body.clientWidth / 2;
    let y = document.body.clientHeight / 2;

    canvas.on('mouse:wheel', function(opt) {

      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.5) zoom = 0.5;
      canvas.zoomToPoint({ x: x, y: y }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    })
  }

  function signUp(){
    setSigningUp(true);
  }

  function confirmSignUp(){
    setSigningUp(false);
  }

  function authenticateLogin(){
    userHasAuthenticated(true)
  }

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

  function scaleGrid(event){

    let scale = parseInt(event.target.value);

    let objects = canvas.getObjects('line');
    
    for (let i in objects) {
        canvas.remove(objects[i]);
    }
    canvas.off()
    setOnScroll(canvas);
    setSnap(canvas, scale);
    setGridScale(scale);
    drawBackground(currentMap);
    drawGrid(canvas, scale);
  }

  function drawGrid(canvas, scale){
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    
    for (let i = 0; i < (height / scale); i++) {
      canvas.add(new fabric.Line([ 0, i * scale, width, i * scale], { stroke: '616161', selectable: false }));
    }
    for (let i = 0; i < (width / scale); i++) {
      canvas.add(new fabric.Line([ i * scale, 0, i * scale, height], { stroke: '616161', selectable: false }));
    }

  }

  function drawBackground(image, scale = mapScale){
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;

    if(image){
      let left = (width / 2) - ((image.width / 2) * scale);
      let top = (height / 2) - ((image.height / 2) * scale);

      fabric.Image.fromURL(image.src, function(img) {
        let oImg = img.set({ left: left, top: top, selectable: false}).scale(scale);
        canvas.setBackgroundImage(oImg);
        canvas.renderAll();
      });
    }
  }

  function drawToken(tokenImage, x, y){
    
    fabric.Image.fromURL(tokenImage.src, function(img) {
      let oImg = img.set({ left: x, top: y });
      oImg.scaleToWidth(gridScale);
      oImg.scaleToHeight(gridScale);
      canvas.add(oImg)
    });

  }

  function changeMap(event){
    let newMap = mapList[event.target.id[0]]
    setCurrentMap(newMap);
    drawBackground(newMap)
  }
  
  function scaleMap(event){

    let scale = event.target.value / 50;

    drawBackground(currentMap, scale);
    setMapScale(scale);
  }

  function uploadBackground(event){

    const imageFiles = event.target.files;
    const filesLength = imageFiles.length; 
    for(let i = 0; i < filesLength; i++) {
        let reader = new FileReader();
        let file = imageFiles[i];

        reader.onloadend = () => {
          
          let base_image = new Image();
          base_image.src = reader.result;

          if(!currentMap){

            setCurrentMap(base_image);
            base_image.onload = function() {
                drawBackground(base_image);
              };
          }
          setMapList(mapList => [...mapList, base_image]);
        }
        reader.readAsDataURL(file);
    }
  }

  function uploadToken(event){

    const imageFiles = event.target.files;
    const filesLength = imageFiles.length; 

    for(let i = 0; i < filesLength; i++) {
        let reader = new FileReader();
        let file = imageFiles[i];

        reader.onloadend = () => {
          
          let base_image = new Image();
          base_image.src = reader.result;          
          setTokenList(mapList => [...mapList, base_image]);
        }
        reader.readAsDataURL(file);
    }
  }



  function drop(event){
    event.preventDefault();
    const data = event.dataTransfer.getData('transfer');

    let tokenImage = new Image();
    tokenImage.src = data;

    let x = event.clientX;
    let y = event.clientY;
    let tokenInfo = {
      src: tokenImage,
      x: x,
      y: y,
    }

    setCurrentTokens(currentTokens => [...currentTokens, tokenInfo]);
    drawToken(tokenImage, x, y);
  }

  function allowDrop(event){
      event.preventDefault();
  }

  {}
  return (
    <div className="App">
      {signingUp && <Signup userHasAuthenticated={userHasAuthenticated} confirmSignUp={confirmSignUp} />}
      {!isAuthenticated && <Login authenticateLogin={authenticateLogin} signUp={signUp} confirmSignUp={confirmSignUp} />}
      {optionTray && <OptionTray scaleGrid={scaleGrid} scaleMap={scaleMap} />}

      <EditTray toggleTokens={toggleTokens} toggleMaps={toggleMaps} toggleOptions={toggleOptionTray} close={closeAll} />
      <TokenDrawer state={TokenDrawerState} getToken={uploadToken} tokens={tokenList} />
      <MapDrawer state={MapDrawerState} getMap={uploadBackground} maps={mapList} changeMap={changeMap} />
      <Droppable drop={drop} allowDrop={allowDrop}>
        <canvas id="c" width={document.body.clientWidth} height={document.body.clientHeight} />
      </Droppable>
    </div>
  );
}

export default App;