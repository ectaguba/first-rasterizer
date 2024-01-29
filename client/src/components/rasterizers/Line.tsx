import { Pixel } from "./Pixel.tsx";

export class Line {

    private _p0: Pixel;
    private _p1: Pixel;
    private _color: number[];

    constructor(p0: Pixel, p1: Pixel) {
        this._p0 = p0;
        this._p1 = p1;
    }

    get p0(): Pixel {
        return this._p0;
    }

    get p1(): Pixel {
        return this._p1;
    }

    get color(): number[] {
        return this._color;
    }

    set p0(newP0: Pixel) {
        this._p0 = newP0;
    }

    set p1(newP1: Pixel) {
        this._p1 = newP1;
    }

    set color(newColor: number[]) {
        this._color = newColor; 
    }

    private _hexToRGB = (hex: string): number[] =>  {
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

    updatePoint(
        point: number, 
        property: 'x' | 'y' | 'h' | 'color', 
        value: string | number
    ): Line {
        let newP0: Pixel = new Pixel(this._p0.x, this._p0.y, this._p0.h, this._p0.color);
        let newP1: Pixel = new Pixel(this._p1.x, this._p1.y, this._p1.h, this._p1.color);

        // NOTE: Compile-time assertion (value as number) doesn't work,
        //       so you need runtime conversion (Number(value))
        if (property === 'x') {
            if (point === 0) {
                newP0 = new Pixel(Number(value), this._p0.y, this._p0.h, this._p0.color);
            } else if (point === 1) {
                newP1 = new Pixel(Number(value), this._p1.y,  this._p1.h,  this._p1.color);
            }
        } else if (property === 'y') {
            if (point === 0) {
                newP0 = new Pixel(this._p0.x, Number(value), this._p0.h, this._p0.color);
            } else if (point === 1) {
                newP1 = new Pixel(this._p1.x, Number(value), this._p1.h, this._p1.color);
            }
        } else if (property === 'color') {
            let newColor: number[] = this._hexToRGB(value as string);
            if (point === 0) {
                newP0 = new Pixel(this._p0.x, this._p0.y, this._p0.h, newColor);
            } else if (point === 1) {
                newP1 = new Pixel(this._p1.x, this._p1.y, this._p1.h, newColor);
            }
        } else if (property === 'h') {
            if (point === 0) {
                newP0 = new Pixel(this._p0.x, this._p0.y, Number(value), this._p0.color);
            } else if (point === 1) {
                newP1 = new Pixel(this._p1.x, this._p1.y, Number(value), this._p1.color);
            }
        }

        // // Update the private properties with the new values
        // this._p0 = newP0;
        // this._p1 = newP1;

        return new Line(newP0, newP1);
    }
}

