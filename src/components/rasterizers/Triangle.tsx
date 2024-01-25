import { Pixel } from "./Pixel";

export class Triangle {

    private _p0: Pixel;
    private _p1: Pixel;
    private _p2: Pixel;

    constructor(p0: Pixel, p1: Pixel, p2: Pixel) {
        this._p0 = p0;
        this._p1 = p1;
        this._p2 = p2;
    }

    get p0(): Pixel {
        return this._p0;
    }

    get p1(): Pixel {
        return this._p1;
    }

    get p2(): Pixel {
        return this._p2;
    }

    set p0(newP0: Pixel) {
        this._p0 = newP0;
    }

    set p1(newP1: Pixel) {
        this._p1 = newP1;
    }

    set p2(newP2: Pixel) {
        this._p2 = newP2;
    }
}
