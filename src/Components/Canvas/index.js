import React, { useState, useEffect } from "react";
import Droppable from "../Droppable";
import { fabric } from "fabric";
import * as Constants from "../../constants";


function Canvas(props) {
    const [canvas, setCanvas] = useState(null);
    const [oldMap, setOldMap] = useState(null);
    const [oldMapScale, setOldMapScale] = useState(null);
    const [oldGridScale, setOldGridScale] = useState(null);


    useEffect(() => {
        onLoad();
    }, [props.currentMap, props.gridScale, props.mapScale]);

    // Canvas initialization
    function onLoad() {
        if (!canvas) {
            let newCanvas = new fabric.Canvas('canvas', { selection: false });

            if (props.mode === "dark-mode") {
                newCanvas.backgroundColor = "#525959";
            }

            setCanvas(newCanvas);
            setSnap(newCanvas, props.gridScale)
            drawGrid(newCanvas, props.gridScale);
            drawBackground(props.currentMap);
            setDelete();

            setOldGridScale(props.gridScale);
            setOldMapScale(props.mapScale);
            setOldMap(props.currentMap);
        } else {

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
    function drawGrid(canvas, scale) {
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;
        let gridColor;

        var objects = canvas.getObjects('line');
        for (let i in objects) {
            canvas.remove(objects[i]);
        }

        for (let i = 0; i < (height / scale); i++) {
            canvas.add(new fabric.Line([0, i * scale, width, i * scale], { stroke: "grey", selectable: false }));
        }
        for (let i = 0; i < (width / scale); i++) {
            canvas.add(new fabric.Line([i * scale, 0, i * scale, height], { stroke: "grey", selectable: false }));
        }
    }

    // Rescales grid on canvas, legacy code needs refactoring
    function scaleGrid(event) {

        let scale = parseInt(event.target.value);
        let objects = canvas.getObjects('line');

        for (let i in objects) {
            canvas.remove(objects[i]);
        }
        setSnap(canvas, scale);
        drawBackground(props.currentMap);
        drawGrid(canvas, scale);
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
    function setSnap(canvas, scale) {

        // Clears canvas events so events don't stack on rerender
        canvas.off()

        canvas.on('object:moving', function (options) {
            options.target.left = Math.round(options.target.left / scale) * scale;
            options.target.top = Math.round(options.target.top / scale) * scale;
            options.target.setCoords();
        })

        canvas.on('mouse:dblclick', function (options) {
            const active = canvas.getActiveObject()
            if (!active)
                return;

            active.scaleToWidth(scale);
            active.scaleToHeight(scale);
            canvas.renderAll();
        })
    }

    // Sets onScroll handler to zoom on canvas, legacy code needs refactoring
    function setOnScroll(canvas) {
        let x = document.body.clientWidth / 2;
        let y = document.body.clientHeight / 2;

        canvas.on('mouse:wheel', function (opt) {
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

        let x = event.clientX;
        let y = event.clientY;
        let tokenInfo = {
            src: tokenImage,
            x: x,
            y: y,
        }
        drawToken(tokenImage, x, y);
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    return (
        <Droppable drop={drop} allowDrop={allowDrop}>
            <canvas id="canvas" width={document.body.clientWidth} height={document.body.clientHeight} />
        </Droppable>
    );
}

export default Canvas;