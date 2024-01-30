import React, { useState } from 'react';

interface LineFieldProps {
    lineIndex: number;
    line: {
        _id: string;
        type: string;
        vertices: {
          x: number;
          y: number;
          h: number;
        }[];
        color: number[];
        updatedAt: string;
    };
    // modelArr??
    // handleChangeLine: (
    //     index: number,
    //     point: 0 | 1,
    //     property: 'x' | 'y' | 'h' | 'color',
    //     value: string | number
    // ) => void;
}

const LineField: React.FC<LineFieldProps> = ({ lineIndex, line }) => {

    const [lineState, setLineState] = useState(line);
    
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

    return (
        <form className="LineField">
            <div className="LineFieldHeader">
                <h3>Line {lineIndex}</h3>
            </div>

            <div className="LineFieldPt">
                <label>
                    x0:
                    <input
                        type="text"
                        value={line.vertices[0].x}
                    />
                </label>
                <label>
                    y0:
                    <input
                        type="text"
                        value={line.vertices[0].y}
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
                    />
                </label>
            </div>

            <div className="LineFieldPt">
                <label>
                    x1:
                    <input
                        type="text"
                        value={line.vertices[1].x}
                    />
                </label>
                <label>
                    y1:
                    <input
                        type="text"
                        value={line.vertices[1].y}
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
                    />
                </label>
            </div>
            <div className="LineFieldColor">
                Color:
                <input
                    type="color"
                    value={rgbToHex(line.color)}
                    onChange={(e) => {
                        
                    }}
                />
            </div>
        </form>
    );
};

export default LineField;
