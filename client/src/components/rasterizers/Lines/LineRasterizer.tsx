import React, { useState, useEffect } from 'react';

import Canvas from "../Canvas.tsx";
import LineField from "./LineField.tsx";
import { Pixel } from "../Pixel.tsx";
import { Line } from "../Line.tsx";
import LineTest from './LineTest.tsx';
import axios from "axios";

const LineRasterizer: React.FC = () => {

    const canvasSize = { x: 640, y: 480 };

    // lines should draw a triangle
    // const [lineArr, setLineArr] = useState<Line[]>([
    //     new Line(
    //         new Pixel(0, 120, 1), 
    //         new Pixel(-160, -120, 0)
    //     ),
    //     new Line(
    //         new Pixel(-160, -120, 0), 
    //         new Pixel(160, -120, 0.5)
    //     ),
    //     new Line(
    //         new Pixel(160, -120, 0.5), 
    //         new Pixel(0, 120, 1)
    //     )
    // ]);
    
    const [lineArr, setLineArr] = useState({});

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


    // const handleChangeLine = (
    //     index: number, 
    //     point: 0 | 1, 
    //     property: 'x' | 'y' | 'h' | 'color', 
    //     value: string | number
    // ): void => {
    //     const updatedLines: Line[] = [...lineArr];
    //     updatedLines.map((line, i) => {
    //         if (i === index) {
    //             line.updatePoint(point, property, value);
    //         }
    //     });
    //     setLineArr(updatedLines);
    // };

    // const handleAddLine = (): void => {
    //     // initialize new pixel and line objects
    //     const newLine = new Line(new Pixel(0, 0), new Pixel(0, 0));
    //     // insert into existing array
    //     setLineArr((prevLineArr) => [...prevLineArr, newLine]);
    // }

    // return (
    //     <div className="LineRasterizer">
    //         <div className="CanvasContainer">
    //             <Canvas
    //                 modelArr={lineArr}
    //                 width={canvasSize.x}
    //                 height={canvasSize.y}
    //             />
    //         </div>
    //         <div className="LineFieldContainer">
    //             {lineArr.map((item: Line, index: number) => (
    //                 <LineField
    //                     key={index}
    //                     lineIndex={index}
    //                     line={item}
    //                     handleChangeLine={handleChangeLine}
    //                 />
    //             ))}
    //             <button 
    //                 className="AddLineBtn"
    //                 type="button" 
    //                 onClick={handleAddLine}
    //             >
    //                 Add Line
    //             </button>
    //         </div>
    //     </div>
    // );
    
    return (
        <div>
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