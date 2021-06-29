import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import WaitingRoom from "./waiting/WaitingRoom";
import Timer from "./timer/Timer";
import Canvas from "./canvas/Canvas";

let socket;

const Game = ({ location }) => {
  const [component, setComponent] = useState(<WaitingRoom numberOfUsers={1} />);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("roomState", ({ room, users, numberOfUsers, stage }) => {
      console.log("Current Users: ", users);
      console.log("Socket: ", socket.id);
      switch (stage) {
        case "wait":
          setComponent(<WaitingRoom numberOfUsers={numberOfUsers} />);
          break;

        case "timer":
          setComponent(<Timer room={room} />);
          break;

        case "game":
          setComponent(<Canvas />);
          break;

        case "vote":
          setComponent(<></>);
          break;

        case "win":
          setComponent(<></>);
          break;
      }
    });
  }, []);

  return <>{component}</>;
};

export default Game;
