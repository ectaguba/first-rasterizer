export class Pixel {

    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    set x(newX: number) {
        this._x = newX;
    }

    set y(newY: number) {
        this._y = newY;
    }
}

