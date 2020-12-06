import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import { MdDragHandle } from 'react-icons/md';
import MenuBar from '../MenuBar';
import './styles/index.css';
import './styles/mode.css'

function TokenInfo(props) {
    const [display, setDisplay] = useState("none");
    const [name, setName] = useState("");
    const [hpMax, setHpMax] = useState("");
    const [hpMin, setHpMin] = useState("");


    useEffect(() => {
        if (props.selected) {
            setDisplay("display");
            setName(props.selected.name);
            setHpMax(props.selected.hp.max);
            setHpMin(props.selected.hp.min);
        } else setDisplay("none");

    }, [props.selected]);

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handlehpChange(event) {
        let target = event.target.id;

        if (target === "hpMax")
            setHpMax(event.target.value);
        else
            setHpMin(event.target.value);
    }

    function handleSave() {
        let info = props.selected;
        info.name = name;
        info.hp = { max: hpMax, min: hpMin };
        props.updateTokenInfo(info);
    }

    return (
        <div className={props.mode + " " + display}>
            <Draggable handle=".handle">
                <div className="token-information">
                    <div className="handle">
                        <MenuBar setSelectedToken={props.setSelectedToken} toggleLock={props.toggleLock} type="tokenInfo" />
                    </div>
                    <div>
                        <input className="name-label" type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="binary-tracker">
                        <div>
                            <input
                                type="number"
                                id="hpMin"
                                value={hpMin}
                                onChange={handlehpChange}
                            />
                        </div>
                        <span>/</span>
                        <div>
                            <input
                                type="number"
                                id="hpMax"
                                value={hpMax}
                                onChange={handlehpChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="info-button" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </Draggable>
        </div>
    );
}

export default TokenInfo;