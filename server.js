import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { Server } from 'socket.io';
import http from "http";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const DELAY = process.env.DELAY || 10000;
const ERROR_TIME = process.env.ERROR_TIME || 10000;
const PENDING_STATUS = "Pending";
const VIDEO_STATUS = "video_status"
const ERROR_STATUS = "Error";
const COMPLETE_STATUS = "Completed";
const DISCONNECT = "disconnect";
const CONNECT = "connection";
const JOIN_ROOM = "join_room"

app.post('/video', (req, res) => {
    const authHeader = req.headers.authorization;
    const userId = authHeader;
    const videoId = uuidv4();
    res.json({ status: PENDING_STATUS, videoId });
    simulateVideoProcessing(videoId, userId);
});

const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: process.env.CORS_ORIGIN_ALLOWED_HOST.split(","),
    methods: ["GET", "POST"],
  },
});

io.on(CONNECT, (socket) => {
  console.log("A user connected");

  socket.on(JOIN_ROOM, (userId) => {
    console.log(`${userId} joined the room`);
    socket.join(userId);
    io.to(userId).emit("connected", { status: true });
  });

  socket.on(DISCONNECT, () => {
    console.log("User disconnected");
  });
});

function simulateVideoProcessing(videoId, userId) {
    io.to(userId).emit(VIDEO_STATUS, { status: PENDING_STATUS, videoId: videoId });
    const errorTimeout = parseInt(ERROR_TIME);
    if(errorTimeout != 0){
      setTimeout(() => {
            console.log(`Video ID ${videoId} encountered an error.`);
            io.to(userId).emit(VIDEO_STATUS, { status: ERROR_STATUS, videoId: videoId });
          
        
      }, errorTimeout);
    }

    else {
      setTimeout(() => {
          console.log(`Video ID ${videoId} has been processed and completed.`);
          io.to(userId).emit(VIDEO_STATUS, { status: COMPLETE_STATUS, videoId: videoId });
        
      }, DELAY);
    }
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});