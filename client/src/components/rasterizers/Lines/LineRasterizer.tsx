import React, { useState, useEffect } from 'react';

import Canvas from "../Canvas.tsx";
import LineField from "./LineField.tsx";

import axios from "axios";

interface Line {
    _id: string;
    type: 'line';
    vertices: {
      x: number;
      y: number;
      h: number;
    }[];
    color: number[];
    updatedAt: string;
}

const LineRasterizer: React.FC = () => {

    const canvasSize = { x: 640, y: 480 };

    const [lineArr, setLineArr] = useState<Line[]>([]);

    // run after every re-render
    useEffect(() => {
        axios
            .get("http://localhost:8082/api/canvasElements")
            .then((res) => {
                setLineArr(res.data);
            })
            .catch((err) => {
                console.log("Error from LineRasterizer");
            })
    }, [])

    // TO-DO: update handleChangeLine

    // TO-DO: update handleAddLine
    
    return (
        <div>
             <div className="CanvasContainer">
                <Canvas
                    modelArr={lineArr}
                    width={canvasSize.x}
                    height={canvasSize.y}
                />
            </div>
             <div className="LineFieldContainer">
                {Object.keys(lineArr).map((key, index) => {
                    return (
                        <LineField 
                            key={index}
                            lineIndex={index}
                            line={lineArr[key]}
                        />
                    )
                })}
                <button 
                    className="AddLineBtn"
                    type="button" 
                >
                    Add Line
                </button>
            </div>
        </div>
    )
};

export default LineRasterizer;