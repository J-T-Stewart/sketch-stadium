import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import CanvasDraw from "react-canvas-draw";
import { Button } from "@material-ui/core";

import { WaitingContainer, WaitingContainerInner } from "../waiting/styles";
import { CanvasBorder } from "../canvas/styles";

let socket;

const Vote = ({ drawings, image, numberOfUsers, userInfo }) => {
  const [voted, setVoted] = useState(false);
  const canvasOne = useRef(null);
  const canvasTwo = useRef(null);
  const canvasThree = useRef(null);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }, [ENDPOINT]);

  useEffect(() => {
    if (drawings.length === numberOfUsers) {
      canvasOne.current?.loadSaveData(drawings[0]?.drawing, false);
      canvasTwo.current?.loadSaveData(drawings[1]?.drawing, false);
      canvasThree.current?.loadSaveData(drawings[2]?.drawing, false);
    }
  }, [drawings]);

  return (
    <WaitingContainer>
      <WaitingContainerInner>
        <h1>Cast your vote!</h1>
      </WaitingContainerInner>
      <CanvasBorder>
        <img src={image} />
      </CanvasBorder>
      <CanvasDraw
        ref={canvasOne}
        lazyRadius={0}
        canvasWidth={308}
        canvasHeight={560}
        hideGrid={true}
        disabled={true}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={voted}
        onClick={() => {
          setVoted(true);
          socket.emit("castVote", {
            room: userInfo.room,
            drawingIndex: 0,
          });
        }}
      >
        Vote
      </Button>
      <CanvasDraw
        ref={canvasTwo}
        lazyRadius={0}
        canvasWidth={308}
        canvasHeight={560}
        hideGrid={true}
        disabled={true}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={voted}
        onClick={() => {
          setVoted(true);
          socket.emit("castVote", {
            room: userInfo.room,
            drawingIndex: 1,
          });
        }}
      >
        Vote
      </Button>
      <CanvasDraw
        ref={canvasThree}
        lazyRadius={0}
        canvasWidth={308}
        canvasHeight={560}
        hideGrid={true}
        disabled={true}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={voted}
        onClick={() => {
          setVoted(true);
          socket.emit("castVote", {
            room: userInfo.room,
            drawingIndex: 2,
          });
        }}
      >
        Vote
      </Button>
    </WaitingContainer>
  );
};

export default Vote;
