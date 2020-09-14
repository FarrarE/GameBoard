import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { FiMove } from 'react-icons/fi';
import { GiSelect } from 'react-icons/gi';
import { TiContacts } from 'react-icons/ti';
import './index.css';

function EditBar(props) {
  return (
    <div className="tray"> 
        <div>
            <FaPaintBrush />
        </div>
        <div>
            <GiSelect />
        </div>
        <div>
            <FiMove />
        </div>

        <div>
            <TiContacts onClick={props.toggle}/>
        </div>
    </div>
  );
}

export default EditBar;