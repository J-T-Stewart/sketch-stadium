import styled from "styled-components";
import background from "../../../images/paintDrip.png";

export const JoinContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const JoinContainerInner = styled.div`
  width: 20%;
`;

export const JoinInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 85%;
  margin-top: 20px;
`;

export const JoinHeader = styled.h1`
  color: white;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;

export const JoinButton = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-top: 20px;
`;
