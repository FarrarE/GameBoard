import React from "react";
import { BsPlusSquare } from 'react-icons/bs';
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

      <form action="/action_page.php" className="map-form">
        <label for="file-input">
          <BsPlusSquare  />
        </label>
        <input id="file-input" type="file" onChange={props.getMap}/>
      </form>

      <div className="map-container">
      <div>
      {props.maps[0] && props.maps.map(map =>(<img src={map.src} alt="Girl in a jacket" width="200" height="150" />))} 
      </div>
      </div>

    </div>
  );
}

export default MapDrawer;