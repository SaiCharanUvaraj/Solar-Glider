import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import Button from "../components/Button";
import { startDroneSimulation, stopDroneSimulation } from "./DroneSimulation";
import { serverUrl } from "../../configs";
import { notify } from "../components/Notification";

const SimulationPopup = ({setShowPopup}) => {
  const stopSimulation=()=>{
    stopDroneSimulation();
    notify("Drone data simulation stoped","failure",null,null,{name:"Start again",onClick:()=>startSimulation()})
  }
  const startSimulation=()=>{
    setShowPopup(false);
    const socket = startDroneSimulation(serverUrl);
    notify("Drone data simulation started","success",null,null,{name:"Stop",onClick:()=>stopSimulation()})
    setTimeout(() => {
      stopSimulation()
      socket.disconnect();
    }, 10000);
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-[#00334E]/70 backdrop-blur-md w-[350px] p-5 rounded-md shadow-xl relative">

        <div onClick={()=>setShowPopup(false)} className="absolute top-3 right-3 text-xl text-[#E8E8E8] cursor-pointer " >
          <CloseIcon />
        </div>

        <h3 className="text-xl font-semibold text-[#E8E8E8] text-center">No Drone data till now</h3>

        <div className="text-[#E8E8E8] mt-3 text-sm">
          <p>This may happen due to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Your drones are inactive and in off state</li>
            <li>Drones lost connection to the server</li>
            <li>No realtime connection to server</li>
            <li>Weak network</li>
          </ul>
        </div>

        <div className="flex items-center justify-center mt-3">
          <Button text="Click to see how app works" onClick={()=>startSimulation}/>
        </div>
        <div className="text-sm font-semibold text-[#E8E8E8] text-center mt-1">Through simulation of drone sending data to the server</div>
      </div>
    </div>
  );
};

export default SimulationPopup;