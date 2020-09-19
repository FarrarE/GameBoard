import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { fabric } from "fabric";
import EditTray from './Components/EditTray';
import TokenDrawer from './Components/TokenDrawer';
import MapDrawer from './Components/MapDrawer';
import OptionTray from './Components/OptionTray';
import Droppable from "./Components/Droppable";

function App(props) {
  const [TokenDrawerState, setTokenDrawerState] = useState("drawerClosed");
  const [MapDrawerState, setMapDrawerState] = useState("drawerClosed");
  const [optionTray, setOptionTray] = useState(false);
  const [gridScale, setGridScale] = useState(50);
  const [mapList, setMapList] = useState([]);
  const [tokenList, setTokenList] = useState([]);
  const [currentMap, setCurrentMap] = useState(null);
  const [currentTokens, setCurrentTokens] = useState([]);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    
    // Initialize grid on canvas
    let c = new fabric.Canvas('c', { selection: false });
    setSnap(c, gridScale)
    setCanvas(c, gridScale);
    drawGrid(c, gridScale);
  },[]);

  function setSnap(canvas, scale){
    canvas.on('object:moving', function(options) { 
      console.log(scale)
      options.target.left = Math.round(options.target.left / gridScale) * gridScale;
      options.target.top = Math.round(options.target.top / gridScale) * gridScale
      options.target.setCoords();
    })
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
    setSnap(canvas, scale);
    setGridScale(scale);
    drawBackground(currentMap);
    drawGrid(canvas, scale);
  }

  function drawGrid(canvas, scale){
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    
    for (let i = 0; i < (width / scale); i++) {

      canvas.add(new fabric.Line([ i * scale, 0, i * scale, height], { stroke: '616161', selectable: false }));
      canvas.add(new fabric.Line([ 0, i * scale, width, i * scale], { stroke: '616161', selectable: false }));
    }

  }

  function drawBackground(image){
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;

    if(image){
      let left = (width / 2) - (image.width / 2);
      let top = (height / 2) - (image.height / 2);
      fabric.Image.fromURL(image.src, function(img) {
        let oImg = img.set({ left: left, top: top, selectable: false}).scale(1);
        canvas.setBackgroundImage(oImg);
        canvas.renderAll();
      });
    }
  }

  function drawToken(tokenImage, x, y){
    
    fabric.Image.fromURL(tokenImage.src, function(img) {
      let oImg = img.set({ left: x, top: y, });
      canvas.add(oImg)
    });

  }

  function changeMap(event){
    let newMap = mapList[event.target.id[0]]
    setCurrentMap(newMap);
    drawBackground(newMap)
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

      <EditTray toggleTokens={toggleTokens} toggleMaps={toggleMaps} toggleOptions={toggleOptionTray} close={closeAll} />
      {optionTray && <OptionTray scaleGrid={scaleGrid} />}
      <TokenDrawer state={TokenDrawerState} getToken={uploadToken} tokens={tokenList} />
      <MapDrawer state={MapDrawerState} getMap={uploadBackground} maps={mapList} changeMap={changeMap} />
        { <Droppable drop={drop} allowDrop={allowDrop}>
        <canvas id="c" width={document.body.clientWidth} height={document.body.clientHeight} />
        </Droppable> }
    </div>
  );
}

export default App;
