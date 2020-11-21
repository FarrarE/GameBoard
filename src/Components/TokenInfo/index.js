import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import { MdDragHandle } from 'react-icons/md';
import './index.css';
import './styles/mode.css'

function TokenInfo(props) {
    const [display, setDisplay] = useState("none");
    const [name, setName] = useState("");
    useEffect(() =>{
        if(props.selected){
            setDisplay("display");
            setName(props.selected.name);
        } else setDisplay("none");
            
    },[props.selected]);

    function handleChange(event){
        setName(event.target.value)
    }
    
    function handleSave(){
        let info = props.selected;
        info.name = name;
        alert("saved")
    }

    return (
        <div className={props.mode + " " + display}>
            <Draggable handle=".handle">
                <div className="token-information">
                    <div>
                        <MdDragHandle className="drag-icon handle" />
                    </div>
                    <input type="text" placeholder="Name" value={name} onChange={handleChange}/>
                    <button className="info-button" onClick={handleSave} >Save</button>
                </div>
            </Draggable>
        </div>
    );
}

export default TokenInfo;