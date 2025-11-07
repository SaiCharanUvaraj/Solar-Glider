export const isDev=process.env.DEV === "true";
export const port=process.env.PORT || 5000;
export const host=process.env.HOST || "127.0.0.1";
export const allowedOrgins=process.env.ALLOWED_ORIGINS?.split(",") || "*";