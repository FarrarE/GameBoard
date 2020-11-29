import React from 'react';

function Draggable(props){
    let x;
    let y;
    
    function drag (event) {
        event.dataTransfer.setData('transfer', event.target.src);
    }

    function onTouch (event) {
        console.log("Grabbed", event)
    }

    function touchDrag (event){
        console.log("Dragging");
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }

    function drop (event) {
        let target = { src: null, x: null, y: null };
        target.src = event.target.src;
        target.x = x;
        target.y = y;
        props.dragHandler(target);
    }

    function noAllowDrop (event) {
        event.stopPropagation();
    }

    return (
        <div id={props.id}
            draggable="true"
            onDragStart={drag}
            onTouchStart={onTouch}
            onTouchEnd={drop}
            onTouchMove={touchDrag}
            onDragOver={noAllowDrop} >
            {props.children}
        </div>
    );
}

export default Draggable;