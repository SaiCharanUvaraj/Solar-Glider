import React, { useContext, useState } from "react";
import Chart from "react-apexcharts";
import { DroneContext } from "../../../Root";

function SpeedBarChart() 
{
    const { dronesListInfo } = useContext(DroneContext);
    // const drones = [
    //     { name: "Drone A", speed: 45 },
    //     { name: "Drone B", speed: 72 },
    //     { name: "Drone C", speed: 58 },
    //     { name: "Drone D", speed: 30 }
    // ]
    const options = {
        chart: {
            type: "bar",
            foreColor: "#ffffff",
            toolbar: { show: false },
            animations: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 4,
                barHeight: "20%"
            }
        },
        xaxis: {
            categories: dronesListInfo.map(d => d.name),
            title: {
                text: "Speed (m/s)"
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val} m/s`
        },
        colors: ["#00334E"],   // Customize to match your theme
        tooltip: {
            enabled: true,
            y: {
                formatter: (val) => `${val} m/s`
            }
        },
        grid: { show: false }
    };

    const series = [
        {
            name: "Speed",
            data: dronesListInfo.map(d => d.speed)
        }
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            height={400}
            width={400}
        />
    );
}

export default SpeedBarChart