import { DroneInfoModel } from "../models/DroneInfoModel.js";

export const saveDroneData=async (data)=>{
    try 
    {
        await DroneInfoModel.create(data);
    } 
    catch (err) 
    {
        console.error("Error in saving to database:", err.message);
    }
}
