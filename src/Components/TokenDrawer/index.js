import React from 'react';
import { AiOutlineExpand } from 'react-icons/ai';
import './index.css';

function TokenDrawer(props) {
    let drawerState = 'token-drawer';
    if(props.state === "drawerDocked"){
        drawerState = 'token-drawer docked'
    }
    else {
        drawerState = 'token-drawer';
    }

  return (
    <div className={drawerState} > 
    tokens will be able to be added here and dragged onto the
      <div className="token-options">
      </div>
    </div>
  );
}

export default TokenDrawer;