import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { serverUrl } from "../../configs";

let socketInstance = null;

const useSocket = () => {
  const [droneStatus, setDroneStatus] = useState(null);

  useEffect(() => {
    if (!socketInstance) 
    {
      socketInstance = io(serverUrl, { transports: ["websocket"] });

      socketInstance.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });

      socketInstance.on("DroneStatus", (data) => {
        //console.log("DroneStatus received:", data);
        setDroneStatus(data);
      });
    }

    return () => {
      // Don’t disconnect — we want it shared app-wide
      // socketInstance.disconnect();
    };
  }, []);

  return { droneStatus };
};

export default useSocket;