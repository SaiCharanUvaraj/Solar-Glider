import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { DroneContext } from "../../../Root";

function BatteryRadialChart () 
{
    const { dronesListInfo } = useContext(DroneContext);
    // const drones = [
    //     { name: "Drone A", battery: 78 },
    //     { name: "Drone B", battery: 42 },
    //     { name: "Drone C", battery: 16 },
    //     { name: "Drone D", battery: 95 }
    // ];
    const series = dronesListInfo.map(d => d.battery);
    const labels = dronesListInfo.map(d => d.name);

    const colors = dronesListInfo.map(d => {
        if (d.battery > 80) return "#90EE90";   // light green
        if (d.battery > 60) return "#ADD8E6";   // light blue
        if (d.battery > 40) return "#FFFACD";   // light yellow
        if (d.battery > 20) return "#FFDAB9";   // light orange
        return "#FFB6C1";                        // light red
    });

    const options = {
        chart: {
            type: "radialBar",
            foreColor: "#ffffff",
            animations: {
                enabled: false
            }
        },

        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    size: "30%",
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: "16px",
                    },
                    value: {
                        show: true,
                        fontSize: "14px",
                        formatter: (val) => `${val}%`,
                    }
                }
            }
        },

        colors: colors,
        labels: labels,
        legend: {
            show: true,
            position: "bottom",
            fontSize: "16px"
        }
    };

    return (
        <Chart 
            options={options} 
            series={series} 
            type="radialBar" 
            height={400} 
            width={400}
        />
    );
}

export default BatteryRadialChart;
