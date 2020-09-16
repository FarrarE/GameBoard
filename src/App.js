import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import EditTray from './Components/EditTray';
import TokenDrawer from './Components/TokenDrawer';
import MapDrawer from './Components/MapDrawer';
import OptionTray from './Components/OptionTray';

function App(props) {
  const [TokenDrawerState, setTokenDrawerState] = useState("drawerClosed");
  const [MapDrawerState, setMapDrawerState] = useState("drawerClosed");
  const [optionTray, setOptionTray] = useState(false);
  const [gridScale, setGridScale] = useState(50);
  const [currentMap, setCurrentMap] = useState(null);
  const canvasRef = useRef(null);  

  useEffect(() => {

    // Initialize grid on canvas
    drawGrid();

  },[]);
  
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

    if(currentMap){
      drawGrid(parseInt(event.target.value), currentMap);
    }
    else 
      drawGrid(parseInt(event.target.value));
  }

  function drawGrid(gridScale = 50, map = null){


    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let width = document.body.clientWidth;;
    let height = document.body.clientHeight;
    let p = 0;
    canvas.width = width;
    canvas.height = height;
    
    for (let x = 0; x <= width; x += gridScale) {
        context.moveTo(0.5 + x, 0);
        context.lineTo(0.5 + x, height);
    }

    for (let x = 0; x <= height; x += gridScale) {
        context.moveTo(0, 0.5 + x );
        context.lineTo(width, 0.5 + x);
    }

    if(map){

      map.onload = function(){
        
        context.drawImage(map, 0, 0);
        context.strokeStyle = "black";
        context.stroke();
      }
      context.drawImage(map, 0, 0);
      context.strokeStyle = "black";
      context.stroke();
      
    }
    else {
      context.strokeStyle = "black";
      context.stroke();
    }

  }

  function clearcanvas(){

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, window.innerHeight, window.innerWidth);
    context.beginPath();
    canvas.width=canvas.width;
    canvas.height=canvas.height;
  }

  function uploadHandler(event){

    const imageFiles = event.target.files;
    const filesLength = imageFiles.length; 
    for(var i = 0; i < filesLength; i++) {
        let reader = new FileReader();
        let file = imageFiles[i];

        reader.onloadend = () => {
          
          let base_image = new Image();
          base_image.src = reader.result;
          base_image.width = "2000";
          setCurrentMap(base_image);
          drawGrid(gridScale, base_image);
        }

        reader.readAsDataURL(file);
    }
  }

  return (
    <div className="App">
      <EditTray toggleTokens={toggleTokens} toggleMaps={toggleMaps} toggleOptions={toggleOptionTray} close={closeAll} />
      {optionTray && <OptionTray scaleGrid={scaleGrid} />}
      <TokenDrawer state={TokenDrawerState}/>
      <MapDrawer state={MapDrawerState} getMap={uploadHandler}/>
      <canvas ref={canvasRef} className={"map-canvas"}/>
    </div>
  );
}

export default App;
