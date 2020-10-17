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
        <label for="file-input" >
          <div className="add-icon">
            <BsPlusSquare  />
          </div>
        </label>
        <input id="file-input" type="file" onChange={props.getMap}/>
      </form>
      <div className="map-container">
        {props.maps[0] ?  
          props.maps.map((map, index) =>(<img src={map.img.src} alt="..." id={index +"map"} width="100" height="50" onClick={props.changeMap} />))
         : 
          <p>Add a map. Switch maps by clicking on the thumbnails.</p>
        }
      </div>
    </div>
  );
}

export default MapDrawer;