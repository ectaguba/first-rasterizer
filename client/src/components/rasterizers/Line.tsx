export interface Line {
    _id?: string;
    type: 'line';
    // array of Pixel interfaces
    vertices: {
      x: number;
      y: number;
      h: number;
    }[];
    color: number[];
    createdAt: number
    updatedAt?: number;
}