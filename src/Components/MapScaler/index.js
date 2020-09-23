import React from "react";
import './index.css';

function MapScaler(props)  {

  return (
    <div className="resize"> 

        <div>
            <input type="range" min="10" max="100" class="slider" onInput={props.scaleMap.bind(this)}/>
        </div>
    </div>
  );
}

export default MapScaler;