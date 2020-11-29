import React from 'react';
import { TiContacts } from 'react-icons/ti';
import { RiTreasureMapLine } from 'react-icons/ri';
import { BiCog } from 'react-icons/bi';
import { CgMinimizeAlt } from 'react-icons/cg';
import './index.css';
import './styles/mode.css';

function EditBar(props) {
    return (
        <div className={props.mode}>
            <div className="tray" >
                <div className="edit-icon" onClick={props.toggleTokens}>
                    <TiContacts />
                </div>
                <div className="edit-icon" onClick={props.toggleMaps}>
                    <RiTreasureMapLine />
                </div>
                <div className="edit-icon" onClick={props.close} >
                    <CgMinimizeAlt />
                </div>
                <div className="edit-icon" onClick={props.toggleOptions} >
                    <BiCog />
                </div>
            </div>
        </div>
    );
}

export default EditBar;