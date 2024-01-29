// import React, { useState } from 'react';

// import Canvas from "../Canvas.tsx";
// import { Pixel } from "../Pixel.tsx";
// import { Triangle } from "../Triangle.tsx";

// const TriangleRasterizer: React.FC = () => {

//     const canvasSize = { x: 640, y: 480 };

//     const [triangleArr, setTriangleArr] = useState<Triangle[]>([
//         new Triangle(
//             new Pixel(0, 120, 1.0),
//             new Pixel(-120, -120, 0.5),
//             new Pixel(120, -120, 0)
//         )
//     ]);

//     const handleChangeTriangle = (
//         index: number, 
//         point: number, 
//         property: 'x' | 'y' | 'h' | 'color', 
//         value: string | number
//     ): void => {
//         // return new array to re-render
//         setTriangleArr((prevTriArr) => {
//             const updatedTriangles = prevTriArr.map((tri, i) => {
//                 if (i === index) {
//                     return tri.updatePoint(point, property, value);
//                 } else {
//                     return tri;
//                 }
//             });
//             return updatedTriangles;
//         });
//     };

//     const handleAddTriangle = (): void => {

//     };

//     return (
//         <div className="TriangleRasterizer">
//             <div className="CanvasContainer">
//                 <Canvas
//                     modelArr={triangleArr}
//                     width={canvasSize.x}
//                     height={canvasSize.y}
//                 />
//             </div>
//             <div className="LineFieldContainer">
//                 {triangleArr.map((item: Triangle, index: number) => (
//                     <TriangleField
//                         key={index}
//                         lineIndex={index}
//                         line={item}
//                         handleChangeTriangle={handleChangeTriangle}
//                     />
//                 ))}
//                 <button 
//                     className="AddLineBtn"
//                     type="button" 
//                     onClick={handleAddTriangle}
//                 >
//                     Add Line
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default TriangleRasterizer;