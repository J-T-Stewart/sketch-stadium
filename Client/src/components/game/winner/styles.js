import styled from "styled-components";
import background from "../../../images/paintDrip.png";

export const WinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const WinnerContainerInner = styled.div`
  width: 20%;
  background-color: white;
  border-radius: 10px;
`;
