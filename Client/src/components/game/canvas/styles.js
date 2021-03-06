import styled from "styled-components";
import background from "../../../images/paintDrip.png";

import { CirclePicker } from "react-color";

export const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const CanvasContainerInner = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const ColorPicker = styled(CirclePicker)`
  margin-left: 14px;
  margin-right: 14px !important;
  width: 72px !important;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const DivRound = styled.div`
  padding: 0 15px;
`;

export const DivTimer = styled.div`
  padding: 0 15px;
`;

export const CanvasBorder = styled.div`
  border: solid;
  border-radius: 5px;
  height: 560px;
`;

//
//
//
//
//

export const DivCanvas = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
`;

export const DivRemoveBtns = styled.div`
  display: flex;
`;

export const DivSizeBtns = styled.div`
  display: flex;
`;

export const DivButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DivGameInfo = styled.div`
  display: flex;
  justify-content: center;
`;
