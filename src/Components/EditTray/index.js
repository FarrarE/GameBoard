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
            <div className="tray">
                <div className="edit-icon">
                    <TiContacts onClick={props.toggleTokens} />
                </div>

                <div className="edit-icon">
                    <RiTreasureMapLine onClick={props.toggleMaps} />
                </div>
                <div className="edit-icon">
                    <CgMinimizeAlt onClick={props.close} />
                </div>
                <div className="edit-icon">
                    <BiCog onClick={props.toggleOptions} />
                </div>
            </div>
        </div>
    );
}

export default EditBar;