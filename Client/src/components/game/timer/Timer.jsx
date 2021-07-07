import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { TimerContainer, TimerContainerInner } from "./styles";

let socket;

const Timer = ({ startGame }) => {
  const [seconds, setSeconds] = useState(5);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      startGame();
    }
  }, [ENDPOINT, seconds]);

  return (
    <TimerContainer>
      <TimerContainerInner>
        <h1>Game will start in...</h1>
        <h1>{seconds}</h1>
      </TimerContainerInner>
    </TimerContainer>
  );
};

export default Timer;
