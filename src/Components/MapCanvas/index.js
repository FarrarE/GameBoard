import React, { useState, useRef, useEffect } from 'react'
import './index.css';

const Canvas = props => {
    const [scale, setScale] = useState(1);
    const [canvasWidth, setCanvasWidth] = useState(0)
    const [canvasHeight, setCanvasHeight] = useState(0)



    useEffect(() => {
        
        // Initializes canvas

        

    }, [props.gridScale])

    

    return (
        <div>
            {props.gridScale}
            
        </div>
    )}
  
 export default Canvas