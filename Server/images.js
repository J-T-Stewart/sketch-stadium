const drawings = [];

const saveDrawing = (drawing, user, room) => {
  room = room.trim().toLowerCase();

  const existingDrawing = drawings.find(
    (drawing) => drawing.room === room && drawing.user === user
  );

  // if (existingDrawing) {
  //   return { error: "User has already submitted a drawing" };
  // }

  const image = { drawing, user, room };

  drawings.push(image);
};

const getDrawingsForRoom = (room) =>
  drawings.filter((drawing) => drawing.room === room);

module.exports = { saveDrawing, getDrawingsForRoom };
