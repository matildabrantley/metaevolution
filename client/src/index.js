import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import World from "./phaser/world";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
  parent: "simulation",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  scene: World
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
