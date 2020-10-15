import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { API, Auth } from "aws-amplify";
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
  const [isTest, setIsTest] = useState(false);

  

  useEffect(() => {
    
    let c = new fabric.Canvas('c', { selection: false });
    setSnap(c, gridScale)
    setCanvas(c, gridScale);
    drawGrid(c, gridScale);
    //setOnScroll(c);
    setDelete();
    onLoad();
  },[]);

  // Backend functions

  async function onLoad() {
    try {
      await Auth.currentSession();
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
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

  //  Frontend functions

  function setDelete(){
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon(),
      cornerSize: 24
    });
  }

  function deleteObject(eventData, target){

    let canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();

  }

  function renderIcon() {
    let deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    
    let deleteImg = document.createElement('img');
    deleteImg.src = deleteIcon;

   
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        let size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(deleteImg, -size/2, -size/2, size, size);
        ctx.restore();
      }
    

  }

  function setSnap(canvas, scale){
    canvas.on('object:moving', function(options) { 
      options.target.left = Math.round(options.target.left / scale) * scale;
      options.target.top = Math.round(options.target.top / scale) * scale;
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
    onLoad();
    userHasAuthenticated(true);
  }

  function runTest(){
    userHasAuthenticated(true);
    setIsTest(true);
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
          
          let img = new Image();
          img.src = reader.result;

          if(!currentMap){

            setCurrentMap(img);
            img.onload = function() {
                drawBackground(img);
              };
          }
          setMapList(mapList => [...mapList, img]);
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
          
          let img = new Image();
          img.src = reader.result;  

          setTokenList(mapList => [...mapList, img]);
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

  return (
    <div className="App">
      {signingUp && <Signup userHasAuthenticated={userHasAuthenticated} confirmSignUp={confirmSignUp} />}
      {!isAuthenticated && <Login runTest={runTest} authenticateLogin={authenticateLogin} signUp={signUp} confirmSignUp={confirmSignUp} handleSubmit={loginHandler}/>}
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
