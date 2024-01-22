import { Pixel }from "./Pixel.tsx";

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
}

