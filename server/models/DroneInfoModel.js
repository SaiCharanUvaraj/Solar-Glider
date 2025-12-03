import mongoose from "mongoose";

const DroneInfoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    altitude: {
        type: Number,
        required: true,
    },
    battery: {
        type: Number,
        required: true,
    },
    location: {
        type: [Number], // [latitude, longitude]
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

export const DroneInfoModel = mongoose.model("DroneInfo", DroneInfoSchema);