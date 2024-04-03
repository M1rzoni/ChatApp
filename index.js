import express from "express";
const app = express();
import http from "http";
import {Server} from "socket.io";
import cors from "cors";

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET","POST"],
    },
});

io.on("connection", (socket) => {
console.log(`User connected: ${socket.id}`)

socket.on("send_message", (data) => {
   socket.broadcast.emit("receive_message", data)
})
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})