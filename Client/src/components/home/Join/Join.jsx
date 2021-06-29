import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  JoinContainer,
  JoinContainerInner,
  JoinInput,
  JoinHeader,
  JoinButton,
} from "./styles";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <JoinContainer>
      <JoinContainerInner>
        <JoinHeader>Join</JoinHeader>
        <div>
          <JoinInput
            placeholder="Name"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <JoinInput
            placeholder="Room"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/game?name=${name}&room=${room}`}
        >
          <JoinButton type="submit">Join</JoinButton>
        </Link>
      </JoinContainerInner>
    </JoinContainer>
  );
};

export default Join;
