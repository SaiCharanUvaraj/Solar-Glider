import mongoose from "mongoose";

const DroneInfoSchema = new mongoose.Schema({
    droneId: {
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