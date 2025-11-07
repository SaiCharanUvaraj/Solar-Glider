// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { allowedOrgins, host, isDev, port } from "./config.js";

const app = express();
app.use(cors({ origin: allowedOrgins}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrgins,
    methods: ["GET", "POST"],
  },
});

let droneStatus = { location: [] };

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("DroneStatus", droneStatus);

  socket.on("DroneStatus", (data) => {
    console.log("Received from drone:", data);
    droneStatus = data;
    io.emit("DroneStatus", droneStatus); 
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Express server for Solar Glider Drone Monitoring App is running");
});

server.listen(port, host , () => {
  if(isDev)
    console.log(`Server is running in http://${host}:${port}`);
  else
    console.log("Server is running online")
});