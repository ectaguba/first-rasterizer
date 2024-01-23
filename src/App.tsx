import React, { useState } from 'react';

import Canvas from "./components/Canvas.tsx";
import LineField from "./components/LineField.tsx";
import { Pixel } from "./components/Pixel.tsx";
import { Line } from "./components/Line.tsx";
import LineTest from './components/LineTest.tsx';

const App: React.FC = () => {

    const canvasSize = { x: 640, y: 480 };

    const [lineArr, setLineArr] = useState<Line[]>(
        [new Line(
            new Pixel(0, 0),
            new Pixel(0, 0)
        )]
    );

    const handleChangeLine = (index: number, point: number, axis: string, value: number): void => {
        setLineArr((prevLineArr) => {
            const updatedLines = prevLineArr.map((line, i) => {
                // i === index ? line.updatePoint(point, axis, value) : line
                if (i === index) {
                    return line.updatePoint(point, axis, value);
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

    const printLines = (): void => {
        console.log("printLines:")
        lineArr.map((item, index) => {
            console.log(`${index}: (${item.p0.x}, ${item.p0.y}), (${item.p1.x}, ${item.p1.y})`)
        })
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Rasterizer in the Web</h1>
            <Canvas
                lineArr={lineArr}
                width={canvasSize.x}
                height={canvasSize.y}
            />
            {lineArr.map((item: Line, index: number) => (
                <div className="line-field-div" key={index}>
                    <LineField
                        lineIndex={index}
                        line={item}
                        handleChangeLine={handleChangeLine}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddLine}>
                Add Line
            </button>
            <button onClick={printLines}>Print Lines</button>
            {/* <LineTest /> */}
        </div>
    );
};

export default App;