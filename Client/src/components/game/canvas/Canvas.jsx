import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { Button } from "@material-ui/core";

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
  DivRound,
  DivTimer,
} from "./styles";

const Canvas = () => {
  const [brushColor, setBrushColor] = useState("#607d8b");
  const [brushSize, setBrushSize] = useState(12);
  const [canvasDisabled, setCanvasDisabled] = useState(false);
  const myCanvas = useRef(null);

  const [seconds, setSeconds] = useState(30);
  const [round, setRound] = useState(1);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setRound(round + 1);
      setSeconds(30);
      myCanvas.current.clear();
    }
  }, [seconds]);

  return (
    <CanvasContainer>
      <CanvasContainerInner>
        <DivGameInfo>
          <DivRound>
            <h1>Round {round}</h1>
          </DivRound>
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
              canvasWidth={700}
              canvasHeight={450}
              hideGrid={true}
              //
              brushColor={brushColor}
              brushRadius={brushSize}
              disabled={canvasDisabled}
            />
          </CanvasBorder>
          <ColorPicker onChange={(color) => setBrushColor(color.hex)} />
        </DivCanvas>
      </CanvasContainerInner>
    </CanvasContainer>
  );
};

export default Canvas;
