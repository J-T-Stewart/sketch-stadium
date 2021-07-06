const rooms = {};

const champions = require("lol-champions");

const getImage = () => {
  const random = Math.floor(Math.random() * champions.length);
  let champion = champions[random].name.replace(/\s+/g, "").toLowerCase();
  champion = champion[0].toUpperCase() + champion.slice(1);
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`;
};

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingRoom = Object.keys(rooms).find((roomName) => roomName === room);

  if (existingRoom) {
    rooms[existingRoom].users.push({ name, id });
  } else {
    rooms[room] = {
      users: [{ name, id }],
      image: getImage(),
      roomState: "waiting",
      roomName: room,
      drawings: [],
      votes: 0,
    };
  }

  if (rooms[room].users.length === 3) {
    rooms[room].roomState = "countdown";
  }

  let roomInfo = rooms[room];

  return roomInfo;
};

const saveDrawing = (drawing, user, room) => {
  let temp = rooms[room].users.find((data) => data.id === user);

  rooms[room].drawings.push({ user: temp.name, drawing, votes: 0 });

  if (rooms[room].drawings.length === 3) {
    rooms[room].roomState = "voting";
  }

  let roomInfo = rooms[room];

  return roomInfo;
};

const castVote = (room, drawingIndex) => {
  rooms[room].votes += 1;
  rooms[room].drawings[drawingIndex].votes += 1;

  if (rooms[room].votes === 3) {
    rooms[room].roomState = "victory";
  }

  let roomInfo = rooms[room];

  return roomInfo;
};

module.exports = { addUser, saveDrawing, castVote };
