import React, { useState } from 'react';

import Canvas from "../Canvas.tsx";
import LineField from "./LineField.tsx";
import { Pixel } from "../Pixel.tsx";
import { Line } from "../Line.tsx";
import LineTest from './LineTest.tsx';

const LineRasterizer: React.FC = () => {

    const canvasSize = { x: 640, y: 480 };

    // lines should draw a triangle
    const [lineArr, setLineArr] = useState<Line[]>([
        new Line(
            new Pixel(0, 120), 
            new Pixel(-160, -120)
        ),
        new Line(
            new Pixel(-160, -120), 
            new Pixel(160, -120)
        ),
        new Line(
            new Pixel(160, -120), 
            new Pixel(0, 120)
        )
    ]);

    const handleChangeLine = (
        index: number, 
        point: number, 
        property: 'x' | 'y' | 'h' | 'color', 
        value: string | number
    ): void => {
        // return new array to re-render
        setLineArr((prevLineArr) => {
            const updatedLines = prevLineArr.map((line, i) => {
                if (i === index) {
                    return line.updatePoint(point, property, value);
                } else {
                    return line;
                }
            });
            return updatedLines;
        });
    };

    const handleAddLine = (): void => {
        // initialize new pixel and line objects
        const newLine = new Line(new Pixel(0, 0), new Pixel(0, 0));
        // insert into existing array
        setLineArr((prevLineArr) => [...prevLineArr, newLine]);
    }

    for (let i = 0; i < lineArr.length; i ++) {
        console.log(`lineArr Line ${i}`);
        console.log(`(x0: ${lineArr[i].p0.x}, y0: ${lineArr[i].p0.y}, color0: [${lineArr[i].p0.color}], h0: ${lineArr[i].p0.h})`);
        console.log(`(x1: ${lineArr[i].p1.x}, y1: ${lineArr[i].p1.y}, color1: [${lineArr[i].p1.color}], h1: ${lineArr[i].p0.h})`);
        console.log("");
    }

    return (
        <div className="LineRasterizer">
            <div className="CanvasContainer">
                <Canvas
                    lineArr={lineArr}
                    width={canvasSize.x}
                    height={canvasSize.y}
                />
            </div>
            <div className="LineFieldContainer">
                {lineArr.map((item: Line, index: number) => (
                    <LineField
                        key={index}
                        lineIndex={index}
                        line={item}
                        handleChangeLine={handleChangeLine}
                    />
                ))}
                <button 
                    className="AddLineBtn"
                    type="button" 
                    onClick={handleAddLine}
                >
                    Add Line
                </button>
            </div>
        </div>
    );
};

export default LineRasterizer;