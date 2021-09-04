import React, { Component } from "react";
import Phaser from "phaser";
import Ecosystem from "../phaser/ecosystem";
import Lab from "../phaser/lab";
// import Clothfun from "../phaser/clothfun";
// import World from "../phaser/world";

import Glide from '../components/Glide';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavIcon from '@material-ui/icons/Favorite';


const lodash = require('lodash');

class PhaserWorld extends Component {
   componentWillMount() {

      this.id = lodash.uniqueId("simulation-");
      // let scene;
      let physics = 'arcade';
      switch (this.props.worldType) {
        case "Ecosystem":
          this.scene = new Ecosystem(this.id, this.props.width, this.props.height, 'arcade');
          break;
        case "Lab":
          this.scene = new Lab(this.id, this.props.width, this.props.height, 'arcade');
          break;
        // case "Colorfun":
        //   scene = new Colorfun();
        //   break;
        // case "Shaderfun":
        //   scene = new Shaderfun(this.props.width, this.props.height);
        //   break;
        // case "Helix":
        //   scene = new Helix(this.props.width, this.props.height);
        //   break;
        // case "Clothfun":
        //   scene = new Clothfun(this.props.width, this.props.height, 'matter');
        //   physics = 'matter';
        //   break;
      
        //Create Lab by Default
        default:
          this.scene = new Lab(this.id, 800, 600, 'arcade');
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
        default: physics,
        matter: {}
      },
      scene: this.scene
    };
    //create the Phaser world
    this.game = new Phaser.Game(config);

  }

componentWillUnmount() {
  this.game.destroy(true)
}

saveNet() {

}

render() {
	  return (
      <><div className="clickable">
        <Fab color="primary" aria-label="add" onClick={this.saveNet} style={{ margin: '10px' }}>
          <AddIcon />
        </Fab>Create Net
        <Fab color="secondary" aria-label="edit" style={{ margin: '10px' }}>
          <EditIcon />
        </Fab> Edit Net
        <Fab color="secondary" aria-label="edit" style={{ margin: '10px' }}>
          <FavIcon />
        </Fab> Save Net
      </div><div id={this.id}></div></>
    )
  }
}

export default PhaserWorld;