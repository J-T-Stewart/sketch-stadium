import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import WaitingRoom from "./waiting/WaitingRoom";
import Timer from "./timer/Timer";
import Canvas from "./canvas/Canvas";
import Vote from "./voting/Voting";
import Winner from "./winner/Winner";

let socket;

const Game = ({ location }) => {
  const [component, setComponent] = useState(<WaitingRoom numberOfUsers={1} />);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.emit("join", { name, room });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("roomState", (roomInfo) => {
      switch (roomInfo.roomState) {
        case "waiting":
          setComponent(<WaitingRoom numberOfUsers={roomInfo.users.length} />);
          break;

        case "countdown":
          setComponent(
            <Timer
              startGame={() =>
                setComponent(
                  <Canvas
                    image={roomInfo.image}
                    userInfo={{ user: socket.id, room: roomInfo.roomName }}
                  />
                )
              }
            />
          );
          break;

        case "voting":
          setComponent(
            <Vote
              drawings={roomInfo.drawings}
              image={roomInfo.image}
              numberOfUsers={roomInfo.users.length}
              userInfo={{ user: socket.id, room: roomInfo.roomName }}
            />
          );
          break;

        case "victory":
          setComponent(<Winner drawings={roomInfo.drawings} />);
          break;
      }
    });
  }, []);

  return <>{component}</>;
};

export default Game;
