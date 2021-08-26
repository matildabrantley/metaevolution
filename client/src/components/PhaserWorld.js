import React, { Component } from "react";
import Phaser from "phaser";
import World from "../phaser/world";



class PhaserWorld extends Component {

  componentWillMount() {
    const config = {
      type: Phaser.AUTO,
      parent: "simulation",
      width: 800,
      height: 599,
      physics: {
        default: 'arcade',
      },
      scene: new World()
    };
    this.game = new Phaser.Game(config);
  }

componentWillUnmount() {
  this.game.destroy(true)
}

render() {
	  return (<div id="simulation"></div>)
  }
}

export default PhaserWorld;