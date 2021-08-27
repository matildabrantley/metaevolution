import React, { Component } from "react";
import Phaser from "phaser";
import Ecosystem from "../phaser/ecosystem";
import Colorfun from "../phaser/colorfun";
import Shaderfun from "../phaser/shaderfun";
// import World from "../phaser/world";
const lodash = require('lodash');



class PhaserWorld extends Component {

   componentWillMount() {
      this.id = lodash.uniqueId("simulation-");
      let scene;
      switch (this.props.worldType) {
        case "Ecosystem":
          scene = new Ecosystem(this.id, 800, 600, 'arcade');
          break;
        case "Colorfun":
          scene = new Colorfun();
          break;
        case "Shaderfun":
          scene = new Shaderfun();
          break;
      
        default:
          break;
      }


    const config = {
      type: Phaser.AUTO,
      parent: this.id,
      width: this.props.width,
      height: this.props.height,
      physics: {
        default: 'arcade',
      },
      scene: scene
    };
    this.game = new Phaser.Game(config);

  }

componentWillUnmount() {
  this.game.destroy(true)
}

render() {
	  return (<div id={this.id}></div>)
  }
}

export default PhaserWorld;