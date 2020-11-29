import React, { useEffect, } from "react";
import Draggable from 'react-draggable';
import ToggleMode from '../ToggleMode';
import { MdDragHandle } from 'react-icons/md';

import './styles/index.css';
import './styles/mode.css'

function OptionTray(props) {

    useEffect(()=>{
        if(props.state)
            document.getElementById("optionTray").style.display = 'block';
        else document.getElementById("optionTray").style.display = 'none';
    }, [props.state]);

    return (
        <div className={props.mode} id="optionTray" >
            <Draggable handle=".handle">
                <div className="options">
                    <div>
                        <MdDragHandle className="drag-icon handle" />
                    </div>
                    <div>
                        Grid Size
                    </div>
                    <div>
                        <input type="range" min="10" max="100" className="slider" onInput={props.scaleGrid.bind(this)} />
                    </div>
                    <div>
                        Map Size
                    </div>
                    <div>
                        <input type="range" min="10" max="100" className="slider" onInput={props.scaleMap.bind(this)} />
                    </div>
                    <div>
                        <ToggleMode check={props.mode === "dark-mode" ? true : false} toggleMode={props.toggleMode} mode={props.mode} />
                    </div>
                    <div>
                        <div className="logout-button" onClick={props.handleLogout.bind(this)}><span>Log Out</span></div>
                    </div>
                </div>
            </Draggable>
        </div>
    );
}

export default OptionTray;