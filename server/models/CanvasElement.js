// models/CanvasElement.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pixelSchema = new Schema({
    x: {
        type: Number,
        required: true,
        default: 0
    },
    y: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    h: { 
        type: Number, 
        default: 1 
    },
}, { _id: false}); // don't id sub docs

const canvasElementSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true,
        enum: ['line', 'triangle'] // only these types are allowed
    },
    vertices: {
        type: [pixelSchema],
        required: true,
    },
    color: {
        type: [Number],
        required: true,
        default: [0, 255, 0],
    },
    createdAt: { 
        type: Date, 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const CanvasElement = mongoose.model('CanvasElement', canvasElementSchema);

module.exports = CanvasElement;

// const test = new CanvasElement
// (
//     {
//         "_id": {
//           "$oid": "65b95294a64f38e7e562fa98"
//         },
//         "type": "line",
//         "vertices": [
//           {
//             "x": 0,
//             "y": 120,
//             "h": 0.5
//           },
//           {
//             "x": -160,
//             "y": -120,
//             "h": 1
//           }
//         ],
//         "color": [255, 0, 0]
//       }
// )