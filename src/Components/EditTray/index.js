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
        <div className="edit-icon">
            <MdLayers />
        </div>
        <div className="edit-icon">
            <FaPaintBrush />
        </div>
        <div className="edit-icon">
            <CgColorBucket />
        </div>
        <div className="edit-icon">
            <FaDrawPolygon />
        </div>
        <div className="edit-icon">
            <GiSelect />
        </div>
        <div className="edit-icon"> 
            <FiMove />
        </div>

        <div className="edit-bar">

        </div>

        <div className="edit-icon">
            <TiContacts onClick={props.toggleTokens} />
        </div>

        <div className="edit-icon">
            <RiTreasureMapLine  onClick={props.toggleMaps} />
        </div>
        <div className="edit-icon">
            <CgMinimizeAlt onClick={props.close} />
        </div>
        <div className="edit-icon">
            <BiCog onClick={props.toggleOptions} />
        </div>
    </div>
  );
}

export default EditBar;