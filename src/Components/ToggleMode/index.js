import React from 'react';
import './index.css';

function ToggleMode(props) {
    return (
        <div className={props.mode}>
            <div id="mode-container">
                <label>Dark Mode</label>
                <div>
                    <label class="switch">
                        <input onClick={props.toggleMode} type="checkbox" checked={props.check}/>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default ToggleMode;