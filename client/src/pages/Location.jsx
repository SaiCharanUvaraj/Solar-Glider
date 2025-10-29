import React from "react";
import useSocket from "../components/Socket";
import Map from "../components/Map";

const Location = () => {
  const { droneStatus } = useSocket();

  if (!droneStatus?.location) 
  {
    return <div>Waiting for drone coordinates...</div>;
  }

  return (
    <div>
      <Map position={[droneStatus.location[0], droneStatus.location[1]]} />
    </div>
  );
};

export default Location;