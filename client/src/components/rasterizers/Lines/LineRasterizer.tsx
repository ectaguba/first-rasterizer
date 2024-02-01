import React, { useState, useEffect } from 'react';

import Canvas from "../Canvas.tsx";
import { Line } from "../Line.tsx"
import LineField from "./LineField.tsx";

import axios from "axios";

const LineRasterizer: React.FC = () => {

    const canvasSize = { x: 640, y: 480 };

    const [lineArr, setLineArr] = useState<Line[]>([]);

    // GET
    const fetchLines = () => {
        axios
            .get("http://localhost:8082/api/canvasElements")
            .then((res) => {
                setLineArr(res.data);
            })
            .catch((err) => {
                console.log("Error from LineRasterizer");
            })
    }

    // PUT (save) to DB
    const handleSaveLines = async () => {
        // update or add lines based on if id exists
        await Promise.all(lineArr.map(async (line: Line) => {
            if (line._id) {
                // update existing line
                await axios.put(`http://localhost:8082/api/canvasElements/${line._id}`, line);
            } else {
                // add new line
                await axios.post("http://localhost:8082/api/canvasElements", line);
            }
        }));

        // fetch latest changes and save into state
        fetchLines();
        console.log("Saved all lines to DB");
    };

    // POST (add) to DB
    const handleAddLine = (): void => {
        const newLine: Line = {
            type: 'line',
            vertices: [
                {x: 0, y: 0, h: 1},
                {x: 0, y: 0, h: 1}
            ],
            color: [0, 255, 0],
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        axios
            .post("http://localhost:8082/api/canvasElements", newLine)
            .then((res) => {
                setLineArr([...lineArr, res.data]);
            })
            .catch((err) => {
                console.log("Error from LineRasterizer");
            });
    }

    // DELETE from DB
    const handleDeleteLine = (targetId: string): void => {
        axios
            .delete(`http://localhost:8082/api/canvasElements/${targetId}`)
            .then((res) => {
                setLineArr(lineArr.filter((line) => line._id !== targetId));
            })
            .catch((err) => {
                console.log("Error in handleDeleteLine");
                return;
            });
    }

    const hexToRGB = (hex: string): number[] =>  {
        // Remove the hash if it's present
        hex = hex.replace(/^#/, '');
    
        // Ensure the hex code is valid
        const validHex = /^[0-9A-F]{6}$/i.test(hex);
        if (!validHex) {
            console.error('Invalid hex color code');
            return [0, 0, 0];
        }
    
        // Parse the hex code into RGB values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
    
        return [r, g, b];
    }

    
    const updateColor = (line: Line, value: string): void => {
        line.color = hexToRGB(value);
    };
    
    const updateCoordinate = (
        line: Line, 
        property: 'x' | 'y' | 'h', 
        point: 0 | 1, 
        value: string | number
    ): void => {
        const vertex = line.vertices[point];
        if (property === 'x') vertex.x = Number(value);
        else if (property === 'y') vertex.y = Number(value);
        else if (property === 'h') vertex.h = Number(value);
    };
    
    const handleChangeLineArr = (
        key: string, 
        property: 'x' | 'y' | 'h' | 'color',
        point: 0 | 1, 
        value: string | number
    ): void => {
        const updatedLines: Line[] = [...lineArr];
    
        updatedLines.forEach((line) => {
            // skip unmatched keys
            if (line._id !== key) return;
    
            if (property === 'color') {
                updateColor(line, value as string);
            } else {
                updateCoordinate(line, property, point, value);
            }
        });
    
        setLineArr(updatedLines);
    };

    // run after every re-render
    useEffect(() => {
        fetchLines()
    }, [])
    
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
                                key={lineArr[key]._id}
                                lineId={lineArr[key]._id}
                                lineNum={index}
                                line={lineArr[key]}
                                handleChangeLineArr={handleChangeLineArr}
                                handleDeleteLine={handleDeleteLine} 
                            />
                        );
                    })}
                <button 
                    className="AddLineBtn"
                    type="button" 
                    onClick={handleAddLine}
                >
                    Add Line
                </button>
                <button 
                    style={{
                        backgroundColor: "darkgreen",
                        color: "white"
                    }}
                    className="AddLineBtn"
                    type="button" 
                    onClick={handleSaveLines}
                >
                    Save Lines
                </button>
            </div>
        </div>
    )
};

export default LineRasterizer;