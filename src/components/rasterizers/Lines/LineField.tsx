import React, { useState } from 'react';
import { Line } from '../Line.tsx';

interface LineFieldProps {
    lineIndex: number;
    line: Line;
    handleChangeLine: (
        index: number,
        point: number,
        property: 'x' | 'y' | 'h' | 'color',
        value: string | number
    ) => void;
}

const LineField: React.FC<LineFieldProps> = ({ lineIndex, line, handleChangeLine }) => {

    const handlePointChange = (
        point: number,
        property: 'x' | 'y' | 'h' | 'color',
        value: string | number
    ): void => {
        handleChangeLine(lineIndex, point, property, value);
    };

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
                        value={line.p0.x}
                        onChange={(e) =>
                            handlePointChange(0, 'x', e.target.value)
                        }
                    />
                </label>
                <label>
                    y0:
                    <input
                        type="text"
                        value={line.p0.y}
                        onChange={(e) =>
                            handlePointChange(0, 'y', e.target.value)
                        }
                    />
                </label>
            </div>
            <div className="LineFieldPt">
                <label>
                    x1:
                    <input
                        type="text"
                        value={line.p1.x}
                        onChange={(e) =>
                            handlePointChange(1, 'x', e.target.value)
                        }
                    />
                </label>
                <label>
                    y1:
                    <input
                        type="text"
                        value={line.p1.y}
                        onChange={(e) =>
                            handlePointChange(1, 'y', e.target.value)
                        }
                    />
                </label>
            </div>
        </form>
    );
};

export default LineField;
