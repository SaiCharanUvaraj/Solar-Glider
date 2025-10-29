export const isDev = import.meta.env.VITE_DEV;
export let serverUrl=import.meta.env.VITE_SERVER_URL
if(isDev)
    serverUrl=import.meta.env.VITE_SERVER_URL_DEV