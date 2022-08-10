import React, { Component } from "react";
import Phaser from "phaser";
import OpenWorld from "../phaser/simulations/openWorld";
import Lab from "../phaser/lab";
import { saveMind } from '../utilities/react-api';
import UserAuth from '../utilities/userAuthentication';


import Glide from '../components/Glide';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavIcon from '@material-ui/icons/Favorite';

const lodash = require('lodash');
let scene;
class PhaserWorld extends Component {
   componentWillMount() {

      this.id = lodash.uniqueId("simulation-");
      // let scene;
      let physics = 'arcade';
      switch (this.props.worldType) {
        case "OpenWorld":
          scene = new OpenWorld(this.id, this.props.width, this.props.height, 'arcade');
          break;
        case "Lab":
          scene = new Lab(this.id, this.props.width, this.props.height, 'arcade');
          break;
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
      scene: scene
    };
    //create the Phaser world
    this.game = new Phaser.Game(config);

  }

componentWillUnmount() {
  this.game.destroy(true)
}

async save() {
  const bestMind = scene.getBest();

  const userToken = UserAuth.loggedIn() ? UserAuth.getToken() : null;

  if (!userToken)
    return false;

  try {
    const response = await saveMind(userToken, {net: bestMind.senseNet, name: "Filler Name"});

    if (!response.ok) 
      throw new Error('Oh dear, neural net did not save!');
    

    //TODO: Save mind to localStorage or IndexedDB
  } catch (err) {
    console.error(err);
  }
}

async setPopulation(population=100) {
  scene.setPopulation(population);
} b


render() {
	  return (
      <><div className="clickable">
    <FormControl>
  <InputLabel htmlFor="my-input">Group Size</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  {/* <FormHelperText id="my-helper-text">placeholder</FormHelperText> */}
</FormControl>
        <Fab color="primary" aria-label="add" onClick={this.setPopulation} style={{ margin: '10px' }}>
          <AddIcon />
        </Fab>Create Life
        <Fab color="secondary" aria-label="edit" style={{ margin: '10px' }}>
          <EditIcon />
        </Fab> Edit Net 
        <Fab onClick={this.save} color="secondary" aria-label="edit" style={{ margin: '10px' }}>
          <FavIcon />
        </Fab> Save Net
      </div><div id={this.id}></div></>
    )
  }
}

export default PhaserWorld;