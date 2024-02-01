import { Pixel } from "./Pixel";

export interface Triangle {
    _id: string;
    type: 'triangle';
    // array of Pixel interfaces
    vertices: {
      x: number;
      y: number;
      h: number;
    }[];
    color: number[];
    updatedAt: string;
}