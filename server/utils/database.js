import mongoose from "mongoose";
import { isDev, mongoUri } from "../config.js";

export async function connectDB() 
{
    if(mongoUri===null)
    {
        console.log("MongoDB connection failed");
        console.log("No MongoDB URI");
        return;
    }
    try 
    {
        await mongoose.connect(mongoUri);
        if(isDev)
            console.log("Connected to MongoDB Local");
        else
            console.log("Connected to MongoDB Cloud");
    } 
    catch (err) 
    {
        console.error("MongoDB Connection Error:", err.message);
    }
}
