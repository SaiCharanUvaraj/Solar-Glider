import dotenv from "dotenv";
dotenv.config();

export const isDev = process.env.DEV?.toLowerCase() === "true";
export const port=process.env.PORT || 5000;
export const allowedOrgins=process.env.ALLOWED_ORIGINS?.split(",") || "*";
export const client=allowedOrgins==="*" ? null : process.env.ALLOWED_ORIGINS?.split(",")[0];
export const host=isDev ? process.env.HOST || "127.0.0.1" : "0.0.0.0";
export const mongoUri=isDev ? (process.env.MONGO_URI_DEV || null) : (process.env.MONGO_URI || null);