import React from 'react';
import './index.css';

function TokenDrawer(props) {
    let drawerState = 'token-drawer';
    if(props.state === "drawerOpen"){
        drawerState = 'token-drawer open'
    }
    else {
        drawerState = 'token-drawer';
    }

  return (
    <div className={drawerState} > 
    I'm a drawer
    </div>
  );
}

export default TokenDrawer;