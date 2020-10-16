import React from "react";
import { RiLogoutBoxRLine } from 'react-icons/ri';

import './index.css';

function OptionTray(props) {

    return (
        <div className="options">
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
    );
}

export default OptionTray;