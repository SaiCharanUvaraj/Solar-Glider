// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { allowedOrgins, client, host, isDev, port } from "./config.js";
import { connectDB } from "./utils/Database.js";
import { saveDroneData } from "./services/DroneInfoService.js";
import { accountsRoutes } from "./Routes/AccountsRoutes.js";

const app = express();
app.use(cors({ origin: allowedOrgins}));
app.use(express.json());

app.use("/api/accounts", accountsRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrgins,
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB Atlas
connectDB();

let droneStatus = null;

io.on("connection", (socket) => {
  console.log("A Client connected to the server");
  socket.on("DroneStatus", (data) => {
    //console.log("Drone data received", data);
    droneStatus = data;
    if(droneStatus)
    {
      io.emit("DroneStatus", droneStatus); 
      //saveDroneData(droneStatus);
    }
  });
  socket.on("disconnect", () => {
    console.log("A Client disconnected from the server");
  });
});

app.get("/", (req, res) => {
  try 
  {
    if(client)
      return res.redirect(client);
    else
      res.status(200).send("No client");
  } 
  catch (error) 
  {
    res.status(500).send("Server error");
  }
});

server.listen(port, host , () => {
  if(isDev)
    console.log(`Server is running in http://${host}:${port}`);
  else
    console.log("Server is running online")
});