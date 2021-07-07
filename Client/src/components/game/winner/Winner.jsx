import React from "react";

import { WinnerContainer, WinnerContainerInner } from "./styles";

const getWinner = (drawings) => {
  let currentWinner = "Everyone";
  let currentVotes = -1;

  for (const drawing of drawings) {
    if (drawing.votes > currentVotes) {
      currentVotes = drawing.votes;
      currentWinner = drawing.user;
    }
  }

  if (currentVotes === 1) currentWinner = "Everyone";

  return currentWinner;
};

const Winner = ({ drawings }) => {
  return (
    <WinnerContainer>
      <WinnerContainerInner>
        <h1>The winner is</h1>
        <h1>{getWinner(drawings)}</h1>
      </WinnerContainerInner>
    </WinnerContainer>
  );
};

export default Winner;
