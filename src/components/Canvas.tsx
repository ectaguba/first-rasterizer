import React, { useEffect, useRef } from 'react';

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {

    // obtain React reference to canvas node
    const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    // render after state (canvas size, scene objects, etc.) changes
    useEffect(() => {

        // access actual DOM node
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (!canvas) return;

        // rendering context
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!context) return;


        /* ImageData is an array containing color data for each pixel.
        For a given pixel at position i in the buffer:
            - canvasBuffer.data[i] corresponds to Red
            - canvasBuffer.data[i + 1] corresponds to Green
            - canvasBuffer.data[i + 2] corresponds to Blue
            - canvasBuffer.data[i + 3] corresponds to Alpha */
        const canvasBuffer: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const canvasPitch: number = canvasBuffer.width * 4;

        const putPixel = (x: number, y: number, color: number[]): void => {

            x = canvas.width / 2 + (x | 0);
            y = canvas.height / 2 - (y | 0) - 1;

            if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
                return;
            }

            // obtain indices of pixel's color data
            var offset = 4 * x + canvasPitch * y;
            
            // iterate through rgba properties
            canvasBuffer.data[offset++] = color[0];
            canvasBuffer.data[offset++] = color[1];
            canvasBuffer.data[offset++] = color[2];
            canvasBuffer.data[offset++] = 255; // Alpha

        };

        const updateCanvas = () => {
            context.putImageData(canvasBuffer, 0, 0);
        };

        const interpolate = (i0: number, d0: number, i1: number, d1: number): number[] => {

            // single value d = f(i)
            if (i0 == i1) return [d0];

            const values: number[] = [];
            const a: number = (d1 - d0) / (i1 - i0);
            let d = d0;

            // for each step x/y, increase y/x by slope a
            for (let i = i0; i < i1; i++) {
                values.push(d);
                d += a;
            }

            return values;

        };

        const drawLine = (p0: { x: number; y: number }, p1: { x: number; y: number }, color: number[]): void => {

            const dx: number = p1.x - p0.x;
            const dy: number = p1.y - p0.y;

            if (Math.abs(dx) > Math.abs(dy)) {
                // line is more horizontal
                if (p0.x > p1.x) {
                    [p0.x, p1.x] = [p1.x, p0.x]; // swap
                }
                const ys: number[] = interpolate(p0.x, p0.y, p1.x, p1.y);
                for (let x = p0.x; x < p1.x; x++) {
                    putPixel(x, ys[x - p0.x], color);
                }
            } else {
                // line is more vertical
                if (p0.y > p1.y) {
                    [p0.y, p1.y] = [p1.y, p0.y];
                }
                const xs: number[] = interpolate(p0.y, p0.x, p1.y, p1.x);
                for (let y = p0.y; y < p1.y; y++) {
                    putPixel(y, xs[y - p0.y], color);
                }
            }
        };

        // Call DrawLine and UpdateCanvas with desired parameters
        drawLine({ x: -200, y: -100 }, { x: 240, y: 120 }, [0, 0, 0]);
        drawLine({ x: -50, y: -200 }, { x: 60, y: 240 }, [0, 0, 0]);

        updateCanvas();

    }, []);

    return (
        <div className="centered">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    display: 'block',
                    margin: 'auto',
                    border: '1px grey solid'
                }}
            >
            </canvas>
        </div>
    );
};

export default Canvas;
