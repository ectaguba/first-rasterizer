import React, { useEffect, useRef } from 'react';

import { Pixel } from "./Pixel.tsx"
import { Line } from "./Line.tsx"

interface CanvasProps {
    width: number;
    height: number;
    lineArr: Line[];
}

const Canvas: React.FC<CanvasProps> = ({ width, height, lineArr }) => {

    // obtain React reference to canvas node
    const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    // render after state (canvas size, scene objects, etc.) changes
    useEffect(() => {

        // access actual DOM node
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (!canvas) return;

        // rendering context
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) return;

        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        /* ImageData is an array containing color data for each pixel.
        For a given pixel at position i in the buffer:
            - canvasBuffer.data[i] corresponds to Red
            - canvasBuffer.data[i + 1] corresponds to Green
            - canvasBuffer.data[i + 2] corresponds to Blue
            - canvasBuffer.data[i + 3] corresponds to Alpha */
        const canvasBuffer: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const canvasPitch: number = canvasBuffer.width * 4;
        
        // main drawing method
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

        // switch front buffer and back buffer
        const updateCanvas = () => {
            context.putImageData(canvasBuffer, 0, 0);
        };

        // for each i in domain [i0, i1], obtain values d in range [d0, d1]
        const interpolate = (i0: number, d0: number, i1: number, d1: number): number[] => {
            if (i0 == i1) return [d0]; // single value d = f(i)

            const values: number[] = [];
            const a: number = (d1 - d0) / (i1 - i0);
            let d = d0;

            // for each step x/y, increase y/x by slope a
            for (let i = i0; i <= i1; i++) {
                values.push(d);
                d += a;
            }

            return values;
        };

        // drawing lines
        const drawLine = (p0: Pixel, p1: Pixel, color: number[]): void => {

            const dx: number = p1.x - p0.x;
            const dy: number = p1.y - p0.y;

            if (Math.abs(dx) > Math.abs(dy)) { 
                // horizontal-ish line
                // swap to make line left to right
                if (p0.x > p1.x) [p0.x, p1.x] = [p1.x, p0.x];

                // obtain and draw y values at each x
                const ys: number[] = interpolate(p0.x, p0.y, p1.x, p1.y);
                for (let x = p0.x; x <= p1.x; x++) {
                    putPixel(x, ys[x - p0.x | 0], color);
                }
            } else { 
                // vertical-ish line
                // swap to make line bottom to top
                if (p0.y > p1.y) [p0.y, p1.y] = [p1.y, p0.y];

                // obtain and draw x values at each y
                const xs: number[] = interpolate(p0.y, p0.x, p1.y, p1.x);
                for (let y = p0.y; y <= p1.y; y++) {
                    putPixel(xs[y - p0.y | 0], y, color);
                }
            }
        };

        //
        const drawWireframeTriangle = (p0: Pixel, p1: Pixel, p2: Pixel, color: number[]): void => {
            drawLine(p0, p1, color);
            drawLine(p1, p2, color);
            drawLine(p0, p2, color);
        }

        const drawFilledTriangle = (p0: Pixel, p1: Pixel, p2: Pixel, color: number[]): void => {

            if (p1.y < p0.y) [p1, p0] = [p0, p1];
            if (p2.y < p0.y) [p2, p0] = [p0, p2];
            if (p2.y < p1.y) [p2, p1] = [p1, p2];

            let x01: number[] = interpolate(p0.y, p0.x, p1.y, p1.x);
            let x12: number[] = interpolate(p1.y, p1.x, p2.y, p2.x);
            let x02: number[] = interpolate(p0.y, p0.x, p2.y, p2.x);

            x01.pop(); // b/c last x01 = first x12
            let x012: number[] = x01.concat(x12);

            let m: number = Math.floor(x012.length / 2);

            let x_left: number[];
            let x_right: number[];

            if (x02[m] < x012[m]) {
                x_left = x02;
                x_right = x012;
            } else {
                x_left = x012;
                x_right = x02;
            }

            for (let y = p0.y; y < p2.y; y++) {
                for (let x = x_left[y - p0.y]; x < x_right[y - p0.y]; x++) {
                    putPixel(x, y, color);
                }
            }
        }

        // for (let i = 0; i < lineArr.length; i++) {
        //     drawLine(lineArr[i].p0, lineArr[i].p1, [0, 0, 0]);
        // }

        let p0 = new Pixel(-200, -200);
        let p1 = new Pixel(200, 50);
        let p2 = new Pixel(20, 250);

        drawFilledTriangle(p0, p1, p2, [0, 255, 0]);
        drawWireframeTriangle(p0, p1, p2, [0, 0, 0]);

        updateCanvas();
    }, [lineArr]);

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
