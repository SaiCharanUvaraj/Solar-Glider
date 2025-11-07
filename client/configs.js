export const isDev = import.meta.env.VITE_DEV;
export const serverUrl=isDev ? import.meta.env.VITE_SERVER_URL_DEV :  import.meta.env.VITE_SERVER_URL