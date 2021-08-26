import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Phaser from "phaser";
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
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
