import React, { useState } from 'react';

import { Line } from "../Line.tsx"

interface LineFieldProps {
    lineId: string;
    lineNum: number;
    line: Line;
    handleChangeLineArr: (
        lineId: string,
        property: 'x' | 'y' | 'h' | 'color',
        point: 0 | 1,
        value: string | number
    ) => void;
    handleDeleteLine: (id: string) => void;
}

const LineField: React.FC<LineFieldProps> = ({ 
    lineId, 
    lineNum, 
    line, 
    handleChangeLineArr,
    handleDeleteLine
}) => {

    if (!line) {
        // undefined while line is being fetched
        return <div>Loading...</div>;
    }

    const rgbToHex = (rgb: number[]): string => {
        // Ensure the RGB array has three values
        if (rgb.length !== 3) {
            throw new Error('RGB array must have three values (red, green, blue)');
        }

        // Convert each RGB component to a two-digit hex value
        const hexComponents = rgb.map(component => {
            const hex = component.toString(16).toUpperCase();
            return hex.length === 1 ? '0' + hex : hex;
        });

        // Concatenate the hex components to form the final hex color string
        return '#' + hexComponents.join('');
    }

    const handleChangeLine = (
        property: 'x' | 'y' | 'h' | 'color',
        point: 0 | 1,
        value: string | number
    ): void => {
        handleChangeLineArr(lineId, property, point, value);
    }

    return (
        <form className="LineField">
            <div className="LineFieldHeader">
                <h3>Line {lineNum}</h3>
            </div>

            <div className="LineFieldPt">
                <label>
                    x0:
                    <input
                        type="text"
                        value={line.vertices[0].x}
                        onChange={(e) => {
                            handleChangeLine('x', 0, e.target.value);
                        }}
                    />
                </label>
                <label>
                    y0:
                    <input
                        type="text"
                        value={line.vertices[0].y}
                        onChange={(e) => {
                            handleChangeLine('y', 0, e.target.value);
                        }}
                    />
                </label>
                <label>
                    h0:
                    <input
                        type="number"
                        value={line.vertices[0].h}
                        min="0.0"
                        max="1.0"
                        step="0.1"
                        onChange={(e) => {
                            handleChangeLine('h', 0, e.target.value);
                        }}
                    />
                </label>
            </div>

            <div className="LineFieldPt">
                <label>
                    x1:
                    <input
                        type="text"
                        value={line.vertices[1].x}
                        onChange={(e) => {
                            handleChangeLine('x', 1, e.target.value);
                        }}
                    />
                </label>
                <label>
                    y1:
                    <input
                        type="text"
                        value={line.vertices[1].y}
                        onChange={(e) => {
                            handleChangeLine('y', 1, e.target.value);
                        }}
                    />
                </label>
                <label>
                    h1:
                    <input
                        type="number"
                        value={line.vertices[1].h}
                        min="0.0"
                        max="1.0"
                        step="0.1"
                        onChange={(e) => {
                            handleChangeLine('h', 1, e.target.value);
                        }}
                    />
                </label>
            </div>
            <div className="LineFieldColor">
                Color:
                <input
                    type="color"
                    value={rgbToHex(line.color)}
                    onChange={(e) => {
                        handleChangeLine('color', 0, e.target.value);
                    }}
                />
            </div>
            <button
                style={{
                    backgroundColor: "darkred",
                    color: "white",
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "0.5rem 1rem"
                }}
                onClick={() => handleDeleteLine(lineId)}
            >
                Delete
            </button>
        </form>
    );
};

export default LineField;
