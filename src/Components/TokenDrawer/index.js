import React, { useState, useEffect } from "react";
import { RiAddLine } from 'react-icons/ri';
import { RiContactsLine } from 'react-icons/ri';
import { RiDeleteBin7Line } from 'react-icons/ri';
import Draggable from "../Draggable";
import Droppable from "../Droppable";
import './styles/index.css';
import './styles/mode.css';

function TokenDrawer(props) {
  const [selected, setSelected] = useState(null);
  const [className, setClassName] = useState("show-options");
  const [visibleList, setVisibleList] = useState([]);

  useEffect(() => {
    setVisibleList(props.tokens);
  }, [props.tokens]);

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

  function handleSearch(event) {
    if (event.target.value === "") {
      setVisibleList(props.tokens);
      return;
    }

    let size = visibleList.length;
    let newList = [];

    for (let i = 0; i < size; ++i) {
      if (visibleList[i].name.toLowerCase().includes(event.target.value.toLowerCase()))
        newList.push(visibleList[i])
    }

    setVisibleList(newList);
    console.log(newList)
  }

  return (
    <div className={props.mode}>
      <div className={drawerState}>
        <div className="searchbar">
          <input type="text" placeholder="Search.." onChange={handleSearch}></input>
        </div>
        <div className="token-container">
          <div className="upload-form-token">
            <form action="/action_page.php" className="token-form">
              <label htmlFor="token-input" >
                <div className="add-icon-token">
                  <RiAddLine />
                </div>
              </label>
              <input id="token-input" type="file" onChange={props.getToken} />
            </form>
          </div>
          {visibleList[0] ? visibleList.map((token, index) => (
            <div className="token-img">
              <Droppable id={index + "droppable"} >
                <Draggable id={index + "token"}
                  dragHandler={props.dragHandler}
                >
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
                    <div className="token-options">
                      <div className="delete-token option-btn" onClick={() => props.deleteToken(token.key)}>
                        <RiDeleteBin7Line />
                      </div>
                      <div className="info-token option-btn" onClick={() => props.tokenInformation(token.key)}>
                        <RiContactsLine />
                      </div>
                    </div>
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