import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DroneContext } from "../../../Root";

function AltitudeLineGraph()
{
    const { dronesListInfo } = useContext(DroneContext);
    const [series,setSeries]=useState([]);
    const [timestamps,setTimestamps]=useState([]);
    const max=3;

    useEffect(()=>{
        // Add timestamp for each update (global)
        setTimestamps(prev => {
            const now = new Date();
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            const timeLabel = `${minutes}:${seconds}`;
            const updated = [...prev, timeLabel];
            return updated.slice(-max); 
        });
        setSeries(prev=>{
            const updated=[...prev];
            dronesListInfo.forEach(drone => {
                const existing = updated.find(item=>item.id===drone.id);
                if(existing)
                {
                    const updatedData = [...existing.data, drone.altitude];
                    existing.data = updatedData.slice(-max);
                }
                else
                {
                    updated.push(
                        {
                            id:drone.id,
                            name:drone.name,
                            data:[drone.altitude]
                        }
                    )
                } 
            });
            return updated;
        })
    },[dronesListInfo])

    // const series = [
    //     {
    //     name: "Drone A",
    //     data: [120, 140, 160, 155, 170, 180]
    //     },
    //     {
    //     name: "Drone B",
    //     data: [100, 110, 130, 125, 140, 150]
    //     },
    //     {
    //     name: "Drone C",
    //     data: [90, 105, 115, 120, 130, 140]
    //     }
    // ];

    const options = {
        chart: {
            type: "line",
            toolbar: { show: false },
            foreColor: "#ffffff",
            animations: {
                enabled: false
            }
        },
        stroke: {
            width: 4,
            curve: "smooth"
        },
        markers: {
            size: 5,            
            discrete: series.map((s, i) => ({
                seriesIndex: i,
                dataPointIndex: s.data.length - 1,  
                fillColor: "#ff0000",
                strokeColor: "#ffffff",
                size: 8,
                shape: "circle"
            }))
        },
        xaxis: {
            categories: timestamps,
            title: { text: "Time (m:s)" }
        },
        yaxis: {
            title: { text: "Altitude (m)" },
            min: 0
        },
        legend: {
            position: "bottom",
            horizontalAlign: "left"
        }
    };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={400} width={400} />
    </div>
  );
};

export default AltitudeLineGraph;