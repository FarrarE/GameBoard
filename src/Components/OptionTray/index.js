import React, { useState, useEffect } from "react";
import { BsToggleOff } from 'react-icons/bs';
import { BsToggleOn } from 'react-icons/bs';

import './index.css';

function OptionTray(props)  {


  return (
    <div className="options"> 
        <div>
            Grid Size
        </div>
        <div>
            <input type="range" min="1" max="100" class="slider" />
        </div>
        <div>
            Mode
        </div>
        <div>
            <BsToggleOff />
        </div>
    </div>
  );
}

export default OptionTray;