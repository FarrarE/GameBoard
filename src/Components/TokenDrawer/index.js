import React, { useState } from "react";
import { BsPlusSquare } from 'react-icons/bs';
import Draggable from "../Draggable";
import Droppable from "../Droppable";
import * as Constants from '../../constants';
import './index.css';

function TokenDrawer(props) {
  const [selected, setSelected] = useState(null);
  const [className, setClassName] = useState("show-options");

  function showOptions(event) {
    setSelected(parseInt(event.target.id[0]));
  }

  function hideOptions(event) {
    setSelected(null);
  }

  let drawerState = 'token-drawer';
  if (props.state === "drawerDocked") {
    drawerState = 'token-drawer docked'
  }
  else {
    drawerState = 'token-drawer';
  }

  return (
    <div className={drawerState} >
      <div className="token-container">
        <div className="upload-form-token">
          <form action="/action_page.php" className="token-form">
            <label for="token-file-input" >
              <div className="add-icon-token">
                  <BsPlusSquare />
              </div>
            </label>
            <input id="token-input" type="file" onChange={props.getToken} />
          </form>
        </div>
        <div className="token-container">
          {props.tokens[0] ? props.tokens.map((token, index) => (
            <div className="token-img">
              <Droppable id={index + "droppable"} >
                <Draggable id={index + "token"} >
                  <div className="token-thumbnails">
                    {(selected === index) ?
                      <img
                        className={className + " " + "token"}
                        alt="..."
                        id={index + "token"}
                        draggable="true" src={token.img.src}
                        onDoubleClick={showOptions}
                        onClick={hideOptions}
                      />
                      :
                      <img
                        className="token"
                        alt="..."
                        id={index + "token"}
                        draggable="true" src={token.img.src}
                        onDoubleClick={showOptions}
                        onClick={hideOptions}
                      />
                    }
                    <img className="delete-token" src={Constants.DELETE_ICON} onClick={() => props.deleteToken(token.key)} />
                  </div>
                </Draggable>
              </Droppable>
            </div>
          ))
            :
            <p>Add a token. Drag and drop the token onto the grid. Scale token to grid by double clicking the token.</p>
          }
        </div>
      </div>

    </div>
  );
}

export default TokenDrawer;