import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { Button, Slider } from "@material-ui/core";
import { CirclePicker } from "react-color";

const Canvas = () => {
  const [brushColor, setBrushColor] = useState("#607d8b");
  const [brushSize, setBrushSize] = useState(12);
  const myCanvas = useRef(null);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => myCanvas.current.clear()}
      >
        Clear
      </Button>
      <Button onClick={() => myCanvas.current.undo()}>Undo</Button>
      <Slider
        defaultValue={12}
        min={1}
        max={24}
        onChange={(event, newValue) => {
          setBrushSize(newValue);
        }}
      />
      <div>
        <CanvasDraw
          ref={myCanvas}
          lazyRadius={0}
          canvasWidth={700}
          canvasHeight={450}
          // hideGrid={true}
          brushColor={brushColor}
          brushRadius={brushSize}
        />
      </div>
      <CirclePicker
        onChange={(color) => setBrushColor(color.hex)}
        circleSpacing={9}
      />
    </div>
  );
};

export default Canvas;
