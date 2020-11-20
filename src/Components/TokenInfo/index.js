import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import { MdDragHandle } from 'react-icons/md';
import './index.css';
import './styles/mode.css'

function TokenInfo(props) {
    const [display, setDisplay] = useState("none");
    const [name, setName] = useState("");
    useEffect(() =>{
        if(props.display){
            setDisplay(props.display);
            setName(props.display);
        }
            
    },[]);
    
    return (
        <div className={props.mode + " " + display}>
            <Draggable handle=".handle">
                <div className="token-information">
                    <div>
                        <MdDragHandle className="drag-icon handle" />
                    </div>
                    <input type="text" placeholder="Name" value={name}/>
                    <button>Save</button>
                </div>
            </Draggable>
        </div>
    );
}

export default TokenInfo;