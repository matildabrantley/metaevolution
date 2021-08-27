import React, { Component } from "react";
import Phaser from "phaser";
import Ecosystem from "../phaser/ecosystem";
// import World from "../phaser/world";
const lodash = require('lodash');



class PhaserWorld extends Component {

  componentWillMount() {
    this.id = lodash.uniqueId("simulation-");
    const config = {
      type: Phaser.AUTO,
      parent: this.id,
      width: 200,
      height: 150,
      physics: {
        default: 'arcade',
      },
      scene: new Ecosystem()
    };
    this.game = new Phaser.Game(config);
    // this.id = `simulation ${ Math.floor(Math.random() * 999999) }`;
  }

componentWillUnmount() {
  this.game.destroy(true)
}

render() {
	  return (<div id={this.id}></div>)
  }
}

export default PhaserWorld;