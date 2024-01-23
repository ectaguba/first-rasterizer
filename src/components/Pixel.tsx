export class Pixel {

    private _x: number;
    private _y: number;
    private _h: number;

    constructor(x: number = 0, y: number = 0, h: number = 1) {
        this._x = x;
        this._y = y;
        if (h > 0 || h < 1) this._h = h;
        else if (h < 0) this._h = 0;
        else if (h > 1) this._h = 1;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get h(): number {
        return this._h;
    }

    set x(newX: number) {
        this._x = newX;
    }

    set y(newY: number) {
        this._y = newY;
    }

    set h(newH: number) {
        this._h = newH;
    }
}

