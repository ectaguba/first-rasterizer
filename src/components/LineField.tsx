import React, { useState, useEffect } from 'react';

import { Pixel } from './Pixel.tsx';

interface LineFieldProps {
    lineIndex: number;
    handleChangeLine: (
        index: number, 
        point: string | number,
        axis: string,  
        value: number
    ) => void;
}

const LineField: React.FC<LineFieldProps> = ({ lineIndex, handleChangeLine }) => {

    const [point0, setPoint0] = useState<Pixel>(new Pixel(0, 0));
    const [point1, setPoint1] = useState<Pixel>(new Pixel(0, 0));
    const [color, setColor] = useState<string>('#000000');

    const handleX0Change = (e): void => {
        setPoint0((prevPoint0) => new Pixel(Number(e.target.value), prevPoint0.y));
        handleChangeLine(
            lineIndex, 
            0,
            "x",
            Number(e.target.value)
        )
    }

    const handleY0Change = (e): void => {
        setPoint0((prevPoint0) => new Pixel(prevPoint0.x, Number(e.target.value)));
        handleChangeLine(
            lineIndex, 
            0,
            "y",
            Number(e.target.value)
        );
    }

    const handleX1Change = (e): void => {
        setPoint1((prevPoint1) => new Pixel(Number(e.target.value), prevPoint1.y));
        handleChangeLine(
            lineIndex, 
            1,
            "x",
            Number(e.target.value)
        )
    }

    const handleY1Change = (e): void => {
        setPoint1((prevPoint1) => new Pixel(prevPoint1.x, Number(e.target.value)));
        handleChangeLine(
            lineIndex, 
            1,
            "y",
            Number(e.target.value)
        )
    }

    const handleColorChange = (e): void => {
        setColor(e.target.value);
    }
    
    return (
        <form className="LineField">
            <div>
                <label>
                    {/* Initial x */}
                    x0:
                    <input
                        type="text"
                        value={point0.x}
                        onChange={handleX0Change}
                    />
                </label>
                <label>
                    {/* Initial y */}
                    y0:
                    <input
                        type="text"
                        value={point0.y}
                        onChange={handleY0Change}
                    />
                </label>
            </div>
            <div>
                <label>
                    {/* Final x */}
                    x1:
                    <input
                        type="text"
                        value={point1.x}
                        onChange={handleX1Change}
                    />
                </label>
                <label>
                    {/* Final y */}
                    y1:
                    <input
                        type="text"
                        value={point1.y}
                        onChange={handleY1Change}
                    />
                </label>
            </div>
            <div>
                <label>
                    Color:
                    <input type="color" value={color} onChange={handleColorChange} />
                </label>
            </div>
        </form>
    );
}

export default LineField;