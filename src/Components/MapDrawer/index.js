import React, { useState } from "react";
import { RiAddLine } from 'react-icons/ri';
import { RiDeleteBin7Line } from 'react-icons/ri';
import './styles/index.css';
import './styles/mode.css';

function MapDrawer(props) {
  const [selected, setSelected] = useState(null);
  const [className, setClassName] = useState("selected");

  function setFocus(event) {
    setSelected(parseInt(event.target.id[0]));
    props.changeMap(event);
    setClassName("selected");
  }

  function showOptions(event) {
    setSelected(parseInt(event.target.id[0]));

    if (className === "selected show-options")
      setClassName("selected");
    else
      setClassName("selected show-options");
  }

  function deleteHandler(key) {
    let mapList = props.maps;

    let newList = [];
    for (let i = 0; i < mapList.length; i++) {
      if (mapList[i].key !== key) {
        newList.push(mapList[i]);
        console.log(mapList[i].key, key)
      }
    }
    props.deleteMap(newList, key);
  }

  let drawerState = 'map-drawer';
  if (props.state === "drawerOpen") {
    drawerState = 'map-drawer open'
  }
  else {
    drawerState = 'map-drawer';
  }

  return (
    <div className={props.mode}>
      <div className={drawerState} >
        <div className="map-container">
          <div className="upload-form">
            <form action="/action_page.php" className="map-form">
              <label htmlFor="map-file-input" >
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
                    className={className.concat(' ', 'map')}
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
                <div className="delete-map option-btn" onClick={() => deleteHandler(map.key)} >
                  <RiDeleteBin7Line />
                </div>
              </div>
            ))
            :
            <p>Add a map. Switch maps by clicking on the thumbnails.</p>
          }
        </div>
      </div>
    </div>
  );
}

export default MapDrawer;