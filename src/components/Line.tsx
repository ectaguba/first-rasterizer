import { Pixel } from "./Pixel.tsx";

export class Line {

    private _p0: Pixel;
    private _p1: Pixel;

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

    set p0(newP0: Pixel) {
        this._p0 = newP0;
    }

    set p1(newP1: Pixel) {
        this._p1 = newP1;
    }

    updatePoint(point: number, axis: string, value: number): Line {
        let newP0: Pixel = new Pixel(this._p0.x, this._p0.y);
        let newP1: Pixel = new Pixel(this._p1.x, this._p1.y);    

        if (point === 0) {
            if (axis === 'x') {
                newP0 = new Pixel(value, this._p0.y);
            } else if (axis === 'y') {
                newP0 = new Pixel(this._p0.x, value);
            }
        } else if (point === 1) {
            if (axis === 'x') {
                newP1 = new Pixel(value, this._p1.y);
            } else if (axis === 'y') {
                newP1 = new Pixel(this._p1.x, value);
            }
        }
        
        return new Line(newP0, newP1);
    }
}

