import React, { useState } from "react";
import { RiAddLine } from 'react-icons/ri';
import './index.css';
import * as Constants from '../../constants';

function MapDrawer(props) {
  const [selected, setSelected] = useState(null);
  const [className, setClassName] = useState("selected");

  function setFocus(event) {
    setSelected(parseInt(event.target.id[0]));
    props.changeMap(event);

    if (className === "selected show-options")
      setClassName("selected");
  }

  function showOptions(event) {
    setSelected(parseInt(event.target.id[0]));

    if (className === "selected show-options")
      setClassName("selected");
    else
      setClassName("selected show-options");
  }

  let drawerState = 'map-drawer';
  if (props.state === "drawerOpen") {
    drawerState = 'map-drawer open'
  }
  else {
    drawerState = 'map-drawer';
  }

  return (

    <div className={drawerState} >
      <div className="map-container">
        <div className="upload-form">
          <form action="/action_page.php" className="map-form">
            <label className="map-file-input" >
              <div className="add-icon">
                <RiAddLine />
              </div>
            </label>
            <input id="map-file-input" type="file" onChange={props.getMap} />
          </form>
        </div>
        {props.maps[0] ?
          props.maps.map((map, index) => (
            <div className="map-thumbnails">
              {(selected === index) ?
                <img
                  className={className + " " + "map"}
                  src={map.img.src}
                  alt="..."
                  id={index + "m"}
                  onClick={setFocus}
                  onDoubleClick={showOptions}
                />
                :
                <img
                  className={"map"}
                  src={map.img.src}
                  alt="..."
                  id={index + "map"}
                  onClick={setFocus}
                  onDoubleClick={showOptions}
                />
              }
              <img className="delete-map" src={Constants.DELETE_ICON} onClick={() => props.deleteMap(map.key)} />
            </div>
          ))
          :
          <p>Add a map. Switch maps by clicking on the thumbnails.</p>
        }
      </div>
    </div>
  );
}

export default MapDrawer;