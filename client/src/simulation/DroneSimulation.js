import { io } from "socket.io-client";

let lat = 13, lng = 80;
let altitude = 12;
let speed = 12;
let battery = 100.0;

let step = 0.0001;
let direction = 0;
let interval = null;

let connected = false;

const droneId = 1;
const droneName = "Solaris";

export function startDroneSimulation(serverUrl) 
{
    const socket = io(serverUrl, {
        reconnection: true,
        reconnectionDelay: 5000
    });

    socket.on("connect", () => {
        connected = true;
        console.log("\nConnected to server");

        if (!interval) 
            startSimulationLoop(socket);
    });

    socket.on("disconnect", () => {
        connected = false;
        console.log("Disconnected from server");
    });

    return socket; 
}

function startSimulationLoop(socket) 
{
    console.log("Drone simulation started");

    interval = setInterval(() => {
        // movement simulation
        lat += step * Math.cos(direction);
        lng += step * Math.sin(direction);

        // smooth speed + altitude simulation
        speed = 20 + 5 * Math.sin(direction * 0.5);
        altitude = 12 + 4 * Math.sin(direction * 0.3);

        // battery drain
        battery -= 0.05;
        if (battery <= 0) 
            battery = 100.0;

        const data = {
            id: droneId,
            location: [Number(lat.toFixed(6)), Number(lng.toFixed(6))],
            speed: Number(speed.toFixed(2)),
            altitude: Number(altitude.toFixed(2)),
            battery: Number(battery.toFixed(2)),
            name: droneName
        };

        if (connected) 
            socket.emit("DroneStatus", data);
        else 
            console.log("Waiting for reconnection...");

        direction += 0.1;
        if (direction > Math.PI * 2) direction = 0;

    }, 1000);
}

export function stopDroneSimulation() 
{
    if (interval) 
    {
        clearInterval(interval);
        interval = null;
        console.log("Drone simulation stopped");
    }
}