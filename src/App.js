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
  const [map, setMap] = useState(false);
  const canvasRef = useRef(null);  

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawCanvas(canvas, context);
    setMap(true);

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

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    clearcanvas(canvas, context);
    drawCanvas(canvas, context, parseInt(event.target.value));
  }

  function drawCanvas(canvas, context, gridScale = 50){
    let width = document.body.clientWidth;;
    let height = document.body.clientHeight;
    let p = 0;
    let scale = 1;

    canvas.width = width;
    canvas.height = height;

    //let base_image = new Image();
    //base_image.src = map;
   
      context.scale(scale, scale);
      //context.drawImage(base_image, 0, 0, base_image.width, base_image.height, 0, 0, canvas.width, canvas.height);
      
      for (let x = 0; x <= width; x += gridScale) {
          context.moveTo(0.5 + x + p, p);
          context.lineTo(0.5 + x + p, height + p);
      }

      for (let x = 0; x <= height; x += gridScale) {
          context.moveTo(p, 0.5 + x );
          context.lineTo(width + p, 0.5 + x + p);
      }

      context.strokeStyle = "black";
      context.stroke();
  }

  function clearcanvas(canvas, context){
    context.clearRect(0, 0, window.innerHeight, window.innerWidth);
    context.beginPath();
    canvas.width=canvas.width;
    canvas.height=canvas.height;
  }

  return (
    <div className="App">
      <EditTray toggleTokens={toggleTokens} toggleMaps={toggleMaps} toggleOptions={toggleOptionTray} close={closeAll} />
      {optionTray && <OptionTray scaleGrid={scaleGrid} />}
      <TokenDrawer state={TokenDrawerState}/>
      <MapDrawer state={MapDrawerState} />
      <canvas ref={canvasRef} className={"map-canvas"}/>
    </div>
  );
}

export default App;
