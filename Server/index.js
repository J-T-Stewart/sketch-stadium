const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const champions = require("lol-champions");

const {
  removeUser,
} = require("./users");

const { addUser, saveDrawing, castVote } = require("./rooms");

const PORT = process.env.PORT || 5000;
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    const roomInfo = addUser({ id: socket.id, name, room });

    socket.join(room);

    io.to(room).emit("roomState", roomInfo);
  });

  socket.on("saveDrawing", ({ drawing, user, room }) => {
    const roomInfo = saveDrawing(drawing, user, room);
    io.to(room).emit("roomState", roomInfo);
  });

  socket.on("castVote", ({ room, drawingIndex }) => {
    const roomInfo = castVote(room, drawingIndex);
    if (roomInfo.votes === 3) {
      io.to(room).emit("roomState", roomInfo);
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
