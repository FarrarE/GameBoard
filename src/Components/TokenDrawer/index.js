import React, { useRef } from "react";
import { BsPlusSquare } from 'react-icons/bs';
import Draggable from "../Draggable";
import Droppable from "../Droppable";
import './index.css';

function TokenDrawer(props) {
  const dragUrl = React.useRef();
    let drawerState = 'token-drawer';
    if(props.state === "drawerDocked"){
        drawerState = 'token-drawer docked'
    }
    else {
        drawerState = 'token-drawer';
    }

  return (
    <div className={drawerState} > 
      <form action="/action_page.php" className="token-form">
        <label for="token-input" >
          <div className="add-icon">
          <BsPlusSquare  />
          </div>
        </label>
        <input id="token-input" type="file" onChange={props.getToken}/>
      </form>
      <div className="token-container">
        {props.tokens[0] && props.tokens.map((token, index) =>(
          <Droppable id={index+"droppable"} >
            <Draggable id={index +"token"}  >
            <img 
            draggable src={token.src} 
            width="100" height="100" 
          />
        </Draggable>
          </Droppable>

        ))} 
      </div>
    </div>
  );
}

export default TokenDrawer;