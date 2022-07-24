import Phaser from "phaser";

//Import static sprites
import defaultSprite from './assets/sprites/default.png';
import star from './assets/sprites/star.png';
import bluestar from './assets/sprites/bluestar.png';
import blackstar from './assets/sprites/blackstar.png';
import greenstar from './assets/sprites/greenstar.png';
import circle from './assets/sprites/circle.png';
//Import spritesheets for animations
import blackSprite from './assets/sprites/black-life.png';
import redPulse from './assets/sprites/pulsing-red-dot.png';
import bluePulse from './assets/sprites/pulsing-blue-dot.png';
import greenPulse from './assets/sprites/pulsing-green-dot.png';

// Export json frame data for animations
import blackFrames from './assets/frameData/black-life.json';
import redPulseFrames from './assets/frameData/pulsing-red-dot.json';
import bluePulseFrames from './assets/frameData/pulsing-blue-dot.json';
import greenPulseFrames from './assets/frameData/pulsing-green-dot.json';

//import tilesheet, tilemapping
import tilesheet1 from './assets/tiles/monocolor-tiles.png';
//import tilemap1 from './assets/tiles/tilemap-empty-data';
//import tilemap1 from './assets/tiles/tilemap-5-color-data';
import tilemap1 from './assets/tiles/tilemap-lab-data 7x7 bordered';


import Genus from './genus';
import Species from './species';
import Group from './group';

class Lab extends Phaser.Scene {
  constructor({parent, width = 288, height = 288, physicsType = 'arcade'} = {}) {
    super("Launch");
    //Create a config object for scene
    this.config = {
      type: Phaser.AUTO,
      parent: parent,
      width: width,
      height: height,
      physics: {
        default: physicsType,
      },
      scene: this
    };

    this.groupPop = 40;
    this.genera = [];
    this.globalTime = 0;
  }

  getBest() {
    //works for one genus now
    return this.genera[0].getBestInGenus();
  }

  preload () {
    //sprites
    this.load.image('default', defaultSprite);
    //spritesheets and json frame data
    this.load.atlas('blackLife', blackSprite, blackFrames);
    this.load.atlas('redLife', redPulse, redPulseFrames);
    this.load.atlas('blueLife', bluePulse, bluePulseFrames);
    this.load.atlas('greenLife', greenPulse, greenPulseFrames);
    //tiles
    this.load.image('tiles', tilesheet1);
    this.load.tilemapTiledJSON('tilemap', tilemap1);
}

create () {
  //this.physics.world.setBounds( 0, 0, width, height );
  const cam = this.cameras.main.setBounds(0, 0, this.config.width, this.config.height);
  this.cursors = this.input.keyboard.createCursorKeys();
  this.keys = this.input.keyboard.addKeys('R,A,S,D');
  this.cameras.main.centerToSize();
  cam.centerOn(200,180);
  cam.setBackgroundColor(0xffffff);

  //Tiles
  this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 32, tileHeight: 32 });
  const tileset = this.map.addTilesetImage('tiles');
  this.tileLayer = this.map.createLayer('training-grounds', tileset);

  this.map.setCollision([1]);

  let fps = 10; //sprite's frame per second
  const blackGroupAnim = createAnimConfig (this, 'blackKey', 'blackLife', fps, 'black-life0.png', 0.5);
  const redGroupAnim = createAnimConfig (this, 'redKey', 'redLife', fps, 'pulsing-red-dot0.png');
  const blueGroupAnim = createAnimConfig (this, 'blueKey', 'blueLife', fps, 'pulsing-blue-dot0.png'); 
  const greenGroupAnim = createAnimConfig (this, 'greenKey', 'greenLife', fps, 'pulsing-green-dot0.png'); 

  const generalConfig = {world: this.physics.world, scene: this, config: this.config, tiles: this.tileLayer, seesTiles: false};
  let fitnessConfig = {};
  
  //Create one Genus
  this.genera.push(new Genus(generalConfig));
  const speciesConfig = {world: this.physics.world, scene: this, config: this.config, genus: this.genera[0], tiles: this.tileLayer, seesTiles: true};

   //4 Groups per Species
   //Create empty Species
  let newSpecies = new Species(speciesConfig);
  newSpecies.createGroup(blackGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(redGroupAnim , {pop: this.groupPop});
  newSpecies.createGroup(blueGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(greenGroupAnim, {pop: this.groupPop});
  this.genera[0].addSpecies(newSpecies);

  this.genera[0].setupGenus();
  
  // newSpecies.addPreySpecies(newSpecies3);
  // newSpecies3.addPredatorSpecies(newSpecies);

  // this.physics.add.collider(loneStar, this.tileLayer);


  this.timerText = this.add.text(10, 10, this.globalTime, {
        font: "25px Arial",
        fill: "#ff0044",
        align: "center"
    });
}

update () {
  this.timerText.setText("Updates: " + this.globalTime); 

    //Update each genus
    for (let genus of this.genera)
      genus.update();

    // if (this.globalTime === 200) {
    //     this.genera[0].species[0].createGroup(blueGroupAnim, {pop: this.groupPop});
    // }

    //example of collision handling
    //this.physics.collide(redGroup, blueGroup, eat);
    this.globalTime++;
  }

}

const createAnimConfig = (scene, keyName, spritesheet, fps, firstFrame, animScale = 1) => {
  let animConfig = {
      key: keyName,
      frames: spritesheet,
      frameRate: fps,
      repeat: -1
  };
  scene.anims.create(animConfig);
  return {spritesheet: animConfig.frames, key: animConfig.key, firstFrame: firstFrame, scale: animScale};
}

export default Lab; 
