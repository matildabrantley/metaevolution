import React, { Component } from "react";
import Phaser from "phaser";
import Ecosystem from "../phaser/ecosystem";
import Lab from "../phaser/lab";
import Colorfun from "../phaser/colorfun";
import Shaderfun from "../phaser/shaderfun";
import Camerafun from "../phaser/camerafun";
// import World from "../phaser/world";
const lodash = require('lodash');



class PhaserWorld extends Component {
   componentWillMount() {
      this.id = lodash.uniqueId("simulation-");
      let scene;
      switch (this.props.worldType) {
        case "Ecosystem":
          scene = new Ecosystem(this.id, this.props.width, this.props.height, 'arcade');
          break;
        case "Lab":
          scene = new Lab(this.id, this.props.width, this.props.height, 'arcade');
          break;
        case "Colorfun":
          scene = new Colorfun();
          break;
        case "Shaderfun":
          scene = new Shaderfun(this.props.width, this.props.height);
          break;
        case "Camerafun":
          scene = new Camerafun(this.props.width, this.props.height);
          break;
      
        default:
          break;
      }
    //create the Phaser config object
    const config = {
      type: Phaser.AUTO,
      parent: this.id,
      width: this.props.width,
      height: this.props.height,
    //   scale: {
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
      physics: {
        default: 'arcade',
      },
      scene: scene
    };
    //create the Phaser world
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