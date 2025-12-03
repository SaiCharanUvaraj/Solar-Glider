import React from "react";
import Chart from "react-apexcharts";

const x=60;
export default function SimpleDonut({ series = [100-x, x], labels = ['A','B'], height = 300 }) {
    const options = {
        chart: {
            type: 'donut',
            toolbar: { show: false },
            animations: { enabled: false }
        },
        labels,
        legend: { show: false },
        dataLabels: { enabled: false },
        tooltip: { enabled: false },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { height: 220 },
                }
            }
        ],
        // Optional: custom colors
        colors: ["white","red"],
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                    labels: {   
                        show: true,
                        name: { show: true , fontSize: '30px', formatter: () => "Speed", color: "white",},
                        value: { show: true, fontSize: '20px', formatter: () => `${series[1]}Km/hr` },
                        total: {
                            show: true,
                            label: 'Speed',
                            color: "white", 
                            fontSize: '30px',
                            formatter: () => {
                                return `${series[1]}Km/hr`;
                            }
                        }
                    }
                }
            }
        }
    };

  return (
    <div>
      <Chart options={options} series={series} type="donut" height={height} />
    </div>
  );
}