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
});

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
        default: [0, 255, 0] // green
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
