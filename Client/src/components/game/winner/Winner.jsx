import React from "react";

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
    <div>
      <h1>The Winner Is</h1>
      <h1>{getWinner(drawings)}</h1>
    </div>
  );
};

export default Winner;
