import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Canvas from "./components/game/canvas/Canvas";
import WaitingRoom from "./components/game/waiting/WaitingRoom";

import Join from "./components/home/Join/Join";
import Game from "./components/game/Game";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/game" component={Game} />
    </Router>
  );
};

export default App;
