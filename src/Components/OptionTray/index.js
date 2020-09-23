import React from "react";

import './index.css';

function OptionTray(props)  {

  return (
    <div className="options"> 
        <div>
            Grid Size
        </div>
        <div>
            <input type="range" min="10" max="100" class="slider" onInput={props.scaleGrid.bind(this)}/>
        </div>
        <div>
            Map Size
        </div>
        <div>
            <input type="range" min="10" max="100" class="slider" onInput={props.scaleMap.bind(this)}/>
        </div>
    </div>
  );
}

export default OptionTray;