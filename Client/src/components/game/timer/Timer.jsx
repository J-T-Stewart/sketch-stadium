import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { WaitingContainer, WaitingContainerInner } from "../waiting/styles";

let socket;

const Timer = ({ room }) => {
  const [seconds, setSeconds] = useState(5);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      socket.emit("startGame", room);
    }
  }, [ENDPOINT, seconds]);

  return (
    <WaitingContainer>
      <WaitingContainerInner>
        <h1>Game will start in...</h1>
        <h1>{seconds}</h1>
      </WaitingContainerInner>
    </WaitingContainer>
  );
};

export default Timer;
