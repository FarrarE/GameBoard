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
      <form action="/action_page.php">
        <label for="img">Select image:</label>
        <input type="file" id="img" name="img" accept="image/*" onChange={props.getMap}/>
      </form>
      <h1>Maps</h1>
      <div className="map-container">
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
        <div className="map-thumbnail"></div>
      </div>

    </div>
  );
}

export default MapDrawer;