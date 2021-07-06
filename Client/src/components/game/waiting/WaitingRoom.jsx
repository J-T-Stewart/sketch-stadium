import React from "react";

import { WaitingContainer, WaitingContainerInner } from "./styles";

const WaitingRoom = ({ numberOfUsers }) => {
  return (
    <WaitingContainer>
      <WaitingContainerInner>
        <h1>Waiting for players...</h1>
        <h1>{numberOfUsers} / 3</h1>
      </WaitingContainerInner>
    </WaitingContainer>
  );
};

export default WaitingRoom;
