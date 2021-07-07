import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { Button } from "@material-ui/core";
import io from "socket.io-client";

import {
  CanvasContainer,
  CanvasContainerInner,
  CanvasBorder,
  DivCanvas,
  ColorPicker,
  DivSizeBtns,
  DivButtons,
  DivRemoveBtns,
  DivGameInfo,
  DivTimer,
} from "./styles";

let socket;
const ENDPOINT = "localhost:5000";

const endOfRound = (myCanvas, userInfo) => {
  socket = io(ENDPOINT, {
    transports: ["websocket", "polling", "flashsocket"],
  });
  socket.emit("saveDrawing", {
    drawing: myCanvas.current.getSaveData(),
    user: userInfo.user,
    room: userInfo.room,
  });
};

const Canvas = ({ image, userInfo }) => {
  const [brushColor, setBrushColor] = useState("#607d8b");
  const [brushSize, setBrushSize] = useState(12);
  const [canvasDisabled, setCanvasDisabled] = useState(false);
  const myCanvas = useRef(null);

  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setCanvasDisabled(true);
      endOfRound(myCanvas, userInfo);
    }
  }, [seconds]);

  return (
    <CanvasContainer>
      <CanvasContainerInner>
        <DivGameInfo>
          <DivTimer>
            <h1>{seconds} seconds remain</h1>
          </DivTimer>
        </DivGameInfo>
        <DivButtons>
          <DivRemoveBtns>
            <Button
              onClick={() => myCanvas.current.clear()}
              style={{ margin: "5px 10px" }}
            >
              Clear
            </Button>
            <Button
              onClick={() => myCanvas.current.undo()}
              style={{ margin: "5px 10px" }}
            >
              Undo
            </Button>
          </DivRemoveBtns>
          <DivSizeBtns>
            <p>Brush Size</p>
            <Button
              onClick={() => setBrushSize(6)}
              style={{ margin: "5px 10px" }}
            >
              Small
            </Button>
            <Button
              onClick={() => setBrushSize(12)}
              style={{ margin: "5px 10px" }}
            >
              Medium
            </Button>
            <Button
              onClick={() => setBrushSize(18)}
              style={{ margin: "5px 10px" }}
            >
              Large
            </Button>
          </DivSizeBtns>
        </DivButtons>

        <DivCanvas>
          <CanvasBorder>
            <CanvasDraw
              ref={myCanvas}
              lazyRadius={0}
              canvasWidth={308}
              canvasHeight={560}
              hideGrid={true}
              //
              brushColor={brushColor}
              brushRadius={brushSize}
              disabled={canvasDisabled}
            />
          </CanvasBorder>
          <ColorPicker onChange={(color) => setBrushColor(color.hex)} />
          <CanvasBorder>
            <img src={image} />
          </CanvasBorder>
        </DivCanvas>
      </CanvasContainerInner>
    </CanvasContainer>
  );
};

export default Canvas;
