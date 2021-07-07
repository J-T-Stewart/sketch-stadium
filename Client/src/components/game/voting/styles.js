import styled from "styled-components";
import background from "../../../images/paintDrip.png";

export const CanvasBorder = styled.div`
  border: solid;
  border-radius: 5px;
  height: 560px;
`;

export const VotingContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;
