import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { serverUrl } from "../../configs";
import { notify } from "./Notification";

let socketInstance = null;

const useSocket = () => {
  const intervalRef = useRef(null);
  const [droneStatus, setDroneStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    notify("Connecting to the server for fetching realtime drone data",null,null,true);
    if (!socketInstance) 
    {
      socketInstance = io(serverUrl, { transports: ["websocket"] });

      socketInstance.on("connect", () => {
        console.log("Connected to Socket.IO server");
        setTimeout(()=>notify("Connected in realtime with server for fetching drone data","success"),1000);
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
        notify("Disconnected from server. No realtime connection with server for fetching drone data","failure")
      });

      socketInstance.on("DroneStatus", (data) => {
        setDroneStatus(data);
        setShowPopup(false);
      });
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (droneStatus === null)
        setShowPopup(true);
      else
        setShowPopup(false);
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, [droneStatus]);

  const clearTimeInterval = () => {
    if (intervalRef.current) 
    {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return {
    showPopup,
    droneStatus,
    setShowPopup,
    clearTimeInterval,
  };
};

export default useSocket;