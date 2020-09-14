import React from 'react';
import './index.css';

function MapDrawer(props) {
    let drawerState = 'map-drawer';
    if(props.state === "drawerOpen"){
        drawerState = 'map-drawer open'
    }
    else {
        drawerState = 'map-drawer';
    }

  return (
    <div className={drawerState} > 
    Maps will go here.
    </div>
  );
}

export default MapDrawer;