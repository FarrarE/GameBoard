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
  const [mapList, setMapList] = useState([]);
  const [currentMap, setCurrentMap] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
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

    let scale = parseInt(event.target.value);

    if(currentMap){
      drawGrid(scale, currentMap);
    }
    else 
      drawGrid(scale);

    setGridScale(scale);
  }

  function drawGrid(gridScale = 50, map = null){

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if(width == null || height == null){
      setWidth(document.body.clientWidth);
      setHeight(document.body.clientHeight);
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
    }else{
      canvas.width = width;
      canvas.height = height
    }

    let w = canvas.width;
    let h = canvas.height;

    for (let x = 0; x <= w; x += gridScale) {
        context.moveTo(0.5 + x, 0);
        context.lineTo(0.5 + x, h);
    }

    for (let x = 0; x <= h; x += gridScale) {
        context.moveTo(0, 0.5 + x );
        context.lineTo(w, 0.5 + x);
    }

    if(map){

      map.onload = function(){
        context.drawImage(map, 0, 0, w, h);
        context.strokeStyle = "black";
        context.stroke();
      }
      context.drawImage(map, 0, 0, w, h);
      context.strokeStyle = "black";
      context.stroke();
      
    }
    else {
      context.strokeStyle = "black";
      context.stroke();
    }
  }

  function changeMap(event){
    alert(event.target.id[0])
    setCurrentMap(mapList[event.target.id[0]]);
    drawGrid(gridScale, mapList[event.target.id[0]]);
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

          if(!currentMap)
            setCurrentMap(base_image);

          setMapList(mapList => [...mapList, base_image]);
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
      <MapDrawer state={MapDrawerState} getMap={uploadHandler} maps={mapList} changeMap={changeMap} />
      <canvas ref={canvasRef} className={"map-canvas"}/>
    </div>
  );
}

export default App;
