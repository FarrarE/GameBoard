import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import { MdDragHandle } from 'react-icons/md';
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
        info.hp = {max:hpMax,min:hpMin};
        props.updateTokenInfo(info);
    }

    return (
        <div className={props.mode + " " + display}>
            <Draggable handle=".handle">
                <div className="token-information">
                    <div>
                        <MdDragHandle className="drag-icon handle" />
                    </div>
                    <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                    <div className="binary-tracker">
                        <input
                            type="number"
                            id="hpMin"
                            value={hpMin}
                            onChange={handlehpChange}
                        />
                        <span> / </span>
                        <input
                            type="number"
                            id="hpMax"
                            value={hpMax}
                            onChange={handlehpChange}
                        />
                    </div>

                    <button className="info-button" onClick={handleSave}>Save</button>
                </div>
            </Draggable>
        </div>
    );
}

export default TokenInfo;