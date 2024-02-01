import React, { useEffect, useRef } from 'react';

import { Pixel } from "./Pixel.tsx"
import { Line } from "./Line.tsx"
import { Triangle } from "./Triangle.tsx"

// Union type for different shapes
type Model = Line | Triangle;

interface CanvasProps {
    width: number;
    height: number;
    modelArr: Model[];
}

const Canvas: React.FC<CanvasProps> = ({ width, height, modelArr }) => {

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

        const drawLine = (p0: Pixel, p1: Pixel, color: number[]): void => {
            const dx: number = p1.x - p0.x;
            const dy: number = p1.y - p0.y;

            if (Math.abs(dx) > Math.abs(dy)) {
                // The line below is BUGGED: pass-by-reference switches objects outside the function
                // if (p0.x > p1.x) [p0.x, p1.x] = [p1.x, p0.x];

                // horizontal-ish line, swap to make line left to right
                const startP = p0.x > p1.x ? p1 : p0;
                const endP = p0.x > p1.x ? p0 : p1;

                // for each x, obtain y and h values 
                const ys: number[] = interpolate(startP.x, startP.y, endP.x, endP.y);
                const hs: number[] = interpolate(startP.x, startP.h, endP.x, endP.h);

                for (let x = startP.x; x <= endP.x; x++) {
                    const interpolatedY = ys[x - startP.x | 0];
                    let shadedColor: number[] = [
                        color[0] * hs[x - startP.x],
                        color[1] * hs[x - startP.x],
                        color[2] * hs[x - startP.x]
                    ]
                    putPixel(x, interpolatedY, shadedColor);
                }
            } else {
                // BUGGED: pass-by-reference switches objects outside the function
                // if (p0.y > p1.y) [p0.y, p1.y] = [p1.y, p0.y];

                // vertical-ish line, swap to make line bottom to top
                const startP = p0.y > p1.y ? p1 : p0;
                const endP = p0.y > p1.y ? p0 : p1;

                // for each y, obtain x and h values 
                const xs: number[] = interpolate(startP.y, startP.x, endP.y, endP.x);
                const hs: number[] = interpolate(startP.y, startP.h, endP.y, endP.h);

                for (let y = startP.y; y <= endP.y; y++) {
                    const interpolatedX = xs[y - startP.y | 0];
                    let shadedColor: number[] = [
                        color[0] * hs[y - startP.y],
                        color[1] * hs[y - startP.y],
                        color[2] * hs[y - startP.y]
                    ]
                    putPixel(interpolatedX, y, shadedColor);
                }
            }
        };

        const drawWireframeTriangle = (p0: Pixel, p1: Pixel, p2: Pixel, color: number[]): void => {
            drawLine(p0, p1, color);
            drawLine(p1, p2, color);
            drawLine(p0, p2, color);
        }

        const drawFilledTriangle = (p0: Pixel, p1: Pixel, p2: Pixel, color: number[]): void => {

            // swap points from lowest to highest
            if (p1.y < p0.y) [p1, p0] = [p0, p1];
            if (p2.y < p0.y) [p2, p0] = [p0, p2];
            if (p2.y < p1.y) [p2, p1] = [p1, p2];

            // for each y, obtain x and h values
            let x01: number[] = interpolate(p0.y, p0.x, p1.y, p1.x);
            let h01: number[] = interpolate(p0.y, p0.h, p1.y, p1.h);

            let x12: number[] = interpolate(p1.y, p1.x, p2.y, p2.x);
            let h12: number[] = interpolate(p1.y, p1.h, p2.y, p2.h);

            let x02: number[] = interpolate(p0.y, p0.x, p2.y, p2.x);
            let h02: number[] = interpolate(p0.y, p0.h, p2.y, p2.h);

            // connect two short sides
            x01.pop();
            h01.pop();

            let x012: number[] = x01.concat(x12);
            let h012: number[] = h01.concat(h12);

            // use the middle of the triangle to determine left and right sides
            let m: number = Math.floor(x012.length / 2);

            let x_left: number[];
            let h_left: number[];

            let x_right: number[];
            let h_right: number[];

            if (x02[m] < x012[m]) {
                x_left = x02;
                h_left = h02;

                x_right = x012;
                h_right = h012;
            } else {
                x_left = x012;
                h_left = h012;

                x_right = x02;
                h_right = h02;
            }

            // iterate from bottom to top
            for (let yi = p0.y; yi < p2.y; yi++) {

                // obtain the left and right x-values of the line
                let x_l: number = x_left[yi - p0.y];
                let h_l: number = h_left[yi - p0.y];

                let x_r: number = x_right[yi - p0.y];
                let h_r: number = h_right[yi - p0.y];

                // obtain hue values at each x on the line at yi
                let h_segment: number[] = interpolate(x_l, h_l, x_r, h_r);

                // iterate from left to right
                for (let xi = x_left[yi - p0.y]; xi < x_right[yi - p0.y]; xi++) {
                    let shadedColor: number[] = [
                        color[0] * h_segment[xi - x_l],
                        color[1] * h_segment[xi - x_l],
                        color[2] * h_segment[xi - x_l]
                    ]
                    putPixel(xi, yi, shadedColor);
                }
            }
        }

        for (let i = 0; i < modelArr.length; i++) {
            const shape = modelArr[i];
            if (shape.type === "line") {
                drawLine(shape.vertices[0], shape.vertices[1], shape.color);
            } else if (shape.type === "triangle") {
                drawWireframeTriangle(shape.vertices[0], shape.vertices[1], shape.vertices[2], [0, 0, 0]);
                drawFilledTriangle(shape.vertices[0], shape.vertices[1], shape.vertices[2], [0, 255, 0]);
            }
        }

        updateCanvas();

    }, [modelArr]);

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
