import React, { useState, useEffect, } from "react";
import Draggable from 'react-draggable';
import { MdDragHandle } from 'react-icons/md';

import './index.css';

function OptionTray(props) {
    const [element, setElement] = useState(null);
    const [pos1, setPos1] = useState(0);
    const [pos2, setPos2] = useState(0);
    const [pos3, setPos3] = useState(0);
    const [pos4, setPos4] = useState(0);
    const [update, setUpdate] = useState(null);

    return (
        <Draggable handle=".handle">
            <div className="options">
                <div>
                    <MdDragHandle className="drag-icon handle" />
                </div>
                <div>
                    Grid Size
            </div>
                <div>
                    <input type="range" min="10" max="100" class="slider" onInput={props.scaleGrid.bind(this)} />
                </div>
                <div>
                    Map Size
            </div>
                <div>
                    <input type="range" min="10" max="100" class="slider" onInput={props.scaleMap.bind(this)} />
                </div>
                <div>
                    <div className="logout-button" onClick={props.handleLogout.bind(this)}><span>Log Out</span></div>
                </div>
            </div>
        </Draggable>
    );
}

export default OptionTray;