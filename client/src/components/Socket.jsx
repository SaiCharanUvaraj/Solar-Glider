import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { serverUrl } from "../../configs";
import { notify } from "./Notification";

let socketInstance = null;

const useSocket = () => {
  const [droneStatus, setDroneStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const popupShownRef = useRef(false);

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
    const interval = setInterval(() => {
      if (popupShownRef.current) return;

      if (droneStatus === null) 
      {
        setShowPopup(true);
        popupShownRef.current = true;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [droneStatus]);

  return {
    showPopup,
    droneStatus,
    setShowPopup,
  };
};

export default useSocket;