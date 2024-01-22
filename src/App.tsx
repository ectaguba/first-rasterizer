import React, { useState } from 'react';

import Canvas from "./components/Canvas.tsx";
import LineField from "./components/LineField.tsx";
import { Pixel } from "./components/Pixel.tsx";
import { Line } from "./components/Line.tsx";

const App: React.FC = () => {

    const canvasSize = { x: 640, y: 480 };

    const defaultP0 = new Pixel(0, 0);
    const defaultP1 = new Pixel(0, 0);

    const [lineArr, setLineArr] = useState<Line[]>([new Line(defaultP0, defaultP1)]);

    const handleChangeLine = (
        index: number,  
        point: string | number, 
        axis: string,
        value: number
    ) => {
        setLineArr((prevLineArr) => {
            if (point == 0) {
                // initial point
                if (axis == "x") {
                    prevLineArr[index].p0.x = value;
                } else {
                    prevLineArr[index].p0.y = value;
                }
            } else {
                // final point
                if (axis == "x") {
                    prevLineArr[index].p1.x = value;
                } else {
                    prevLineArr[index].p1.y = value;
                }
            }
            return prevLineArr;
        });
    }

    const handleAddLine = (): void => {
        setLineArr([...lineArr, new Line(defaultP0, defaultP1)]);
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Rasterizer in the Web</h1>
            <Canvas
                width={canvasSize.x}
                height={canvasSize.y}
            />
            {lineArr.map((item: Line, index: number) => (
                <div key={index}>
                    <h3>Line {index}</h3>
                    <LineField
                        lineIndex={index}
                        handleChangeLine={handleChangeLine}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddLine}>
                Add Line
            </button>
        </div>
    );
};

export default App;