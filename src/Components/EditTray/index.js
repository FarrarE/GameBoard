import React from 'react';
import { MdLayers } from 'react-icons/md';
import { FaPaintBrush } from 'react-icons/fa';
import { FaDrawPolygon} from 'react-icons/fa';
import { FiMove } from 'react-icons/fi';
import { GiSelect } from 'react-icons/gi';
import { TiContacts } from 'react-icons/ti';
import { RiTreasureMapLine } from 'react-icons/ri';
import { BiCog } from 'react-icons/bi';
import { CgMinimizeAlt } from 'react-icons/cg';
import { CgColorBucket } from 'react-icons/cg';
import './index.css';

function EditBar(props) {
  return (
    <div className="tray"> 
        <div>
            <MdLayers className="edit-icon"/>
        </div>
        <div>
            <FaPaintBrush className="edit-icon"/>
        </div>
        <div>
            <CgColorBucket className="edit-icon"/>
        </div>
        <div>
            <FaDrawPolygon className="edit-icon"/>
        </div>
        <div>
            <GiSelect className="edit-icon"/>
        </div>
        <div>
            <FiMove className="edit-icon"/>
        </div>

        <div>
            <TiContacts onClick={props.toggleTokens} className="edit-icon"/>
        </div>

        <div>
            <RiTreasureMapLine  onClick={props.toggleMaps} className="edit-icon"/>
        </div>
        <div>
            <CgMinimizeAlt onClick={props.close} className="edit-icon"/>
        </div>
        <div>
            <BiCog onClick={props.toggleOptions} className="edit-icon"/>
        </div>
    </div>
  );
}

export default EditBar;