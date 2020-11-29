import React, { useState, useEffect } from "react";
import Droppable from "../Droppable";
import { fabric } from "fabric";
import { MdFilterCenterFocus } from 'react-icons/md';
import './index.css';
import * as Constants from "../../constants";


function Canvas(props) {
    const [canvas, setCanvas] = useState(null);
    const [oldMap, setOldMap] = useState(null);
    const [oldMapScale, setOldMapScale] = useState(null);
    const [oldGridScale, setOldGridScale] = useState(null);


    useEffect(() => {
        onLoad();

        touchDrop();
        window.addEventListener('contextmenu', function (e) {
            // do something here... 
            e.preventDefault();
        }, false);

    }, [props.currentMap, props.gridScale, props.mapScale, props.mode, props.toDrop]);

    // Canvas initialization
    function onLoad() {


        if (!canvas) {
            let newCanvas = new fabric.Canvas('canvas', {
                selection: false,
                // height: height,
                // width: width,
                fireRightClick: true,
                //fireMiddleClick: true, 
            });

            if (props.mode === "dark-mode")
                newCanvas.backgroundColor = "#525959";

            setCanvas(newCanvas);
            setSnap(newCanvas, props.gridScale)
            drawGrid(newCanvas, props.gridScale);
            drawBackground(props.currentMap);
            setDelete();

            setOldGridScale(props.gridScale);
            setOldMapScale(props.mapScale);
            setOldMap(props.currentMap);
        } else {
            if (props.mode === "dark-mode") {
                canvas.backgroundColor = "#525959";
                canvas.renderAll()
            }
            else {
                canvas.backgroundColor = "white";
                canvas.renderAll()
            }

            if (props.gridScale !== oldGridScale) {
                setSnap(canvas, props.gridScale)
                drawGrid(canvas, props.gridScale);
                setOldGridScale(props.gridScale);
            }
            if (props.currentMap !== oldMap | props.mapScale !== oldMapScale) {
                drawBackground(props.currentMap);
                setOldMap(props.currentMap);
                setOldMapScale(props.mapScale)
            }
        }
    }

    // Renders token to canvas at set coordinates
    function drawToken(tokenImage, x, y) {

        fabric.Image.fromURL(tokenImage.src, function (img) {
            let background = img.set({ left: x, top: y });
            background.scaleToWidth(props.gridScale);
            background.scaleToHeight(props.gridScale);
            canvas.add(background)
        });

    }

    // Renders grid lines to canvas
    function drawGrid(canvas, scale, xOffset = 0, yOffset = 0) {
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;

        let objects = canvas.getObjects('line');
        for (let i in objects) {
            canvas.remove(objects[i]);
        }

        let widthScale = Math.floor(height / scale) + 3;
        let heightScale = Math.floor(width / scale) + 3;
        let start = -1 * scale;

        for (let i = 0; i < widthScale; i++) {
            canvas.add(new fabric.Line([
                (start + xOffset),
                (i * scale) + start + yOffset,
                (width - start) + xOffset,
                (i * scale) + start + yOffset],
                { stroke: "grey", selectable: false }));
        }
        for (let i = 0; i < heightScale; i++) {
            canvas.add(new fabric.Line([
                (i * scale) + start + xOffset,
                (start + yOffset),
                (i * scale) + start + xOffset,
                (height - start) + yOffset],
                { stroke: "grey", selectable: false }));
        }

    }


    // Renders background to canvas
    function drawBackground(image) {
        if (!image)
            return;

        let scale = props.mapScale;
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;

        if (image) {
            let left = (width / 2) - ((image.width / 2) * scale);
            let top = (height / 2) - ((image.height / 2) * scale);

            fabric.Image.fromURL(image.src, function (img) {
                let background = img.set({ left: left, top: top, selectable: false }).scale(scale);
                canvas.setBackgroundImage(background);
                canvas.renderAll();
            });
        }
    }


    // Sets the grid snap points for tokens
    function setSnap(canvas, scale, offsetX = 0, offsetY = 0) {

        // Clears canvas events so events don't stack on rerender
        canvas.off()
        canvas.on('object:moving', function (event) {

            if (offsetX === 0 && offsetY === 0) {
                event.target.left = (Math.round(event.target.left / scale) * scale);
                event.target.top = (Math.round(event.target.top / scale) * scale);
            } else {
                event.target.left = (Math.round(event.target.left / scale) * scale) + (offsetX % scale);
                event.target.top = (Math.round(event.target.top / scale) * scale) + (offsetY % scale);
            }

            event.target.setCoords();
        })

        canvas.on('mouse:down', function (event) {
            const active = canvas.getActiveObject()
            if (active)
                return;

            let evt = event.e;
            if (evt.altKey === true) {
                this.isDragging = true;
                this.selection = false;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
            }

            if (event.button !== 3)
                return;

            let e = event.e;
            this.isDragging = true;
            this.selection = false;
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        });

        canvas.on('mouse:move', function (event) {
            if (this.isDragging) {

                let e = event.e;
                if (e.altKey === true) {
                    let x = e.clientX - this.lastPosX;
                    let y = e.clientY - this.lastPosY;

                    if (x >= 20) {
                        x = 20;
                    }
                    if (x <= -20) {
                        x = -20;
                    }

                    if (y >= 20) {
                        y = 20;
                    }
                    if (y <= -20) {
                        y = -20;
                    }

                    console.log(x + " " + y)
                    setSnap(this, props.gridScale, x, y);
                    drawGrid(this, props.gridScale, x, y);
                    return;
                }

                let vpt = this.viewportTransform;
                vpt[4] += e.clientX - this.lastPosX;
                vpt[5] += e.clientY - this.lastPosY;
                this.requestRenderAll();
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
            }
        });
        canvas.on('mouse:up', function (event) {
            if (this.isDragging) {

                this.setViewportTransform(this.viewportTransform);
                this.isDragging = false;
                this.selection = true;
                document.getElementById("center").style.display = "block";
            }
        });

        // zooms in and out of canvas
        canvas.on('mouse:wheel', function (event) {
            let delta = event.e.deltaY;
            let zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.5) zoom = 0.5;
            canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
            event.e.preventDefault();
            event.e.stopPropagation();
            document.getElementById("center").style.display = "block";
        });
    }

    function recenterCanvas() {

        let zoom = canvas.getZoom();
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;
        let x = (height / 2) - ((canvas.getHeight() / 2) * zoom);
        let y = (width / 2) - ((canvas.getWidth() / 2) * zoom);
        canvas.viewportTransform[4] = y;
        canvas.viewportTransform[5] = x;
        canvas.requestRenderAll();
        canvas.lastPosX = x;
        canvas.lastPosY = y;
        document.getElementById("center").style.display = "none";
    }

    // Renders the delete icon from svg source.
    function renderIcon() {
        let deleteIcon = Constants.DELETE_ICON;

        let deleteImg = document.createElement('img');
        deleteImg.src = deleteIcon;


        return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
            let size = this.cornerSize;
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
            ctx.restore();
        }
    }

    // Places the delete icon to the corner of each token.
    function setDelete() {
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

    // Onclick handler for delete icon. Removes selected object.
    function deleteObject(eventData, target) {
        let canvas = target.canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
    }


    // Droppable functions

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('transfer');

        let tokenImage = new Image();
        tokenImage.src = data;

        console.log(props.gridScale)
        let x = event.clientX;
        let y = event.clientY;
        drawToken(tokenImage, x, y);
    }

    function touchDrop() {
        if (props.toDrop === null)
            return;

        let tokenImage = new Image();
        tokenImage.src = props.toDrop.src;

        let x = props.toDrop.x;
        let y = props.toDrop.y;
        drawToken(tokenImage, x, y);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    return (
        <Droppable drop={drop} allowDrop={allowDrop}>
            <div id="center" onClick={recenterCanvas}><MdFilterCenterFocus /></div>
            <canvas id="canvas" width={document.body.clientWidth} height={document.body.clientHeight} />
        </Droppable>
    );
}

export default Canvas;