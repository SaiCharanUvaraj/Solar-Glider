import React, { useContext } from "react";
import { DroneContext } from "../../Root";
import Map from "./Map"

const Location = () => {
  const { dronesListInfo } = useContext(DroneContext);

  return (
    <div>
      <Map dronesListInfo={dronesListInfo} />
    </div>
  );
};

export default Location;