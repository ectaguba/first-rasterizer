import { Pixel } from "../Pixel.tsx"
import { Line } from "../Line.tsx"
import React, { useState } from "react";

const LineTest = () => {

    const [lineArr, setLineArr] = useState<Line[]>([
        new Line(
            new Pixel(0, 0), 
            new Pixel(10, 10)
        ),
        new Line(
            new Pixel(0, 0), 
            new Pixel(20, 20)
        ),
        new Line(
            new Pixel(0, 0), 
            new Pixel(30, 30)
        ),
    ]);
    
    const handleChangeLine = (
        index: number, 
        point: 0 | 1, 
        property: 'x' | 'y' | 'color' | 'h', 
        value: number
    ): void => {
        const updatedLines = [...lineArr];
        updatedLines.map((line, i) => {
            // i === index ? line.updatePoint(point, axis, value) : line
            if (i === index) {
                line.updatePoint(point, property, value);
            }
        });
        setLineArr(updatedLines);
    };
    
    const handleCoordinateChange = (
        point: 0 | 1, 
        property: 'x' | 'y' | 'color' | 'h', value: number
    ): void => {
        handleChangeLine(2, point, property, value);
    };
    
    console.log(lineArr);

    console.log(lineArr[0].p0.x == 5);
    console.log(lineArr[0].p0.y == 5);
    console.log(lineArr[0].p1.x == 15);
    console.log(lineArr[0].p1.y == 15);

    console.log(lineArr[1].p0.x == 18);
    console.log(lineArr[1].p0.y == 18);
    console.log(lineArr[1].p1.x == 25);
    console.log(lineArr[1].p1.y == 25);

    console.log(lineArr[2].p0.x == 22);
    console.log(lineArr[2].p0.y == 22);
    console.log(lineArr[2].p1.x == 34);
    console.log(lineArr[2].p1.y == 34);

    return (
        <button onClick={() => {          
            handleChangeLine(0, 0, 'x', 5);
            handleChangeLine(0, 0, 'y', 5);
            
            handleChangeLine(0, 1, 'x', 15);
            handleChangeLine(0, 1, 'y', 15);
            
            handleChangeLine(1, 0, 'x', Number(18));
            handleChangeLine(1, 0, 'y', Number(18));
            
            handleChangeLine(1, 1, 'x', Number(25));
            handleChangeLine(1, 1, 'y', Number(25));

            handleCoordinateChange(0, 'x', Number(22));
            handleCoordinateChange(0, 'y', Number(22));
            
            handleCoordinateChange(1, 'x', Number(34));
            handleCoordinateChange(1, 'y', Number(34));
        }}>
            Line Test
        </button>
    )
}

export default LineTest;