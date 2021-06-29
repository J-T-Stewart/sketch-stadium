const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  userList,
} = require("./users");

const PORT = process.env.PORT || 5000;
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    console.log(`User "${name}" has joined room "${room}"`);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    let stage = "wait";
    if (getUsersInRoom(user.room).length == 2) {
      stage = "timer";
    }
    console.log("Socket Id: ", socket.id);
    console.log("Users: ", userList());

    io.to(user.room).emit("roomState", {
      room: user.room,
      users: getUsersInRoom(user.room),
      numberOfUsers: getUsersInRoom(user.room).length,
      stage: stage,
    });

    console.log(`Stage is currently ${stage}`);
  });

  socket.on("startGame", (room) => {
    io.to(room).emit("roomState", {
      room: room,
      users: getUsersInRoom(room),
      numberOfUsers: getUsersInRoom(room).length,
      stage: "game",
    });
  });

  socket.on("disconnect", () => {
    console.log(`User with id ${socket.id} has left`);
    const user = removeUser(socket.id);
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
