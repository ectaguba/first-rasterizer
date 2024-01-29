export class Pixel {

    // all number types will be restricted to floats.
    private _x: number;
    private _y: number;
    private _h: number;
    private _color: number[];

    constructor(x: number = 0, y: number = 0, h: number = 1, color: number[] = [128, 128, 128]) {
        this._x = Number(x.toPrecision(7));
        this._y = Number(y.toPrecision(7));
        this._color = color;
        if (h > 0 || h < 1) this._h = Number(h.toPrecision(7));
        else if (h < 0) this._h = 0;
        else if (h > 1) this._h = 1;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get color(): number[] {
        return this._color;
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

    set color(newColor: number[]) {
        this._color = newColor;
    }

    set h(newH: number) {
        this._h = newH;
    }
}

