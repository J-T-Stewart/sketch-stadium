import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
