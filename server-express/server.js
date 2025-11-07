// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { allowedOrgins, host, port } from "./config.js";

dotenv.config();

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
  res.send("Express Socket.IO server for Solar Glider is running");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server in running in http://${host}:${port}`);
});