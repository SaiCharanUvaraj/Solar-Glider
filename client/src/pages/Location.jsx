import React from "react";
import useSocket from "../components/Socket";
import Map from "../components/Map";
import { useState } from "react";
import { useEffect } from "react";

const Location = () => {
  const { droneStatus } = useSocket();
  const [dronesListInfo,setDronesInfoList]=useState([])

  useEffect(() => {
    if (!droneStatus) 
      return;
    setDronesInfoList(prevList => {
      const filteredList = prevList.filter(drone => drone.droneId !== droneStatus.droneId);
      return [...filteredList, droneStatus];
    });
  }, [droneStatus]);

  return (
    <div>
      <Map dronesListInfo={dronesListInfo} />
    </div>
  );
};

export default Location;