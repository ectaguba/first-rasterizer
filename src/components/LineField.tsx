import React, { useState } from 'react';
import { Line } from './Line.tsx';

interface LineFieldProps {
    lineIndex: number;
    line: Line;
    handleChangeLine: (index: number, point: number, axis: string, value: number) => void;
}

const LineField: React.FC<LineFieldProps> = ({ lineIndex, line, handleChangeLine }) => {

    const [color, setColor] = useState<string>('#000000');

    const handleCoordinateChange = (point: number, axis: string, value: number): void => {
        handleChangeLine(lineIndex, point, axis, value);
    };

    const handleColorChange = (e): void => {
        setColor(e.target.value);
    };

    return (
        <form className="LineField">
            <h3>Line {lineIndex}</h3>
            <div>
                <label>
                    x0:
                    <input 
                        type="text" 
                        value={line.p0.x} 
                        onChange={(e) => 
                            handleCoordinateChange(0, 'x', Number(e.target.value))
                        } 
                    />
                </label>
                <label>
                    y0:
                    <input 
                        type="text" 
                        value={line.p0.y} 
                        onChange={(e) => 
                            handleCoordinateChange(0, 'y', Number(e.target.value))
                        } 
                    />
                </label>
            </div>
            <div>
                <label>
                    x1:
                    <input 
                        type="text" 
                        value={line.p1.x} 
                        onChange={(e) => 
                            handleCoordinateChange(1, 'x', Number(e.target.value))
                        } 
                    />
                </label>
                <label>
                    y1:
                    <input 
                        type="text" 
                        value={line.p1.y} 
                        onChange={(e) => 
                            handleCoordinateChange(1, 'y', Number(e.target.value))
                        } 
                    />
                </label>
            </div>
            <div>
                <label>
                    Color:
                    <input 
                        type="color" 
                        value={color} 
                        onChange={handleColorChange} 
                    />
                </label>
            </div>
        </form>
    );
};

export default LineField;
