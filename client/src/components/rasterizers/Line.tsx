import { Pixel } from "./Pixel.tsx";

export class Line {

    private _p0: Pixel;
    private _p1: Pixel;
    private _color: number[];

    constructor(
        p0: Pixel = new Pixel(0, 0), 
        p1: Pixel = new Pixel(100, 100), 
        color: number[] = [128, 128, 128]
    ) {
        this._p0 = p0;
        this._p1 = p1;
        this._color = color;
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
        point: 0 | 1, 
        property: 'x' | 'y' | 'h' | 'color', 
        value: string | number
    ): void {
        if (property === 'color') {
            this._color = this._hexToRGB(value as string)
        } else if (property === 'x') {
            if (point === 0) {
                this._p0.x = Number(value);
            } else {
                this._p1.x = Number(value);
            }
        } else if (property === 'y') {
            if (point === 0) {
                this._p0.y = Number(value);
            } else {
                this._p1.y = Number(value);
            }
        } else if (property === 'h') {
            if (point === 0) {
                this._p0.h = Number(value);
            } else {
                this._p1.h = Number(value);
            }
        }
    }
}

