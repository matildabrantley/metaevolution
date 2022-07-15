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
import tilesheet1 from './assets/tiles/all-tiles.png';
import tilemap1 from './assets/tiles/tilemap-empty-data';
// import tilemap1 from './assets/tiles/tilemap-lab-data 3x3';


import Genus from './genus';
import Species from './species';
import Group from './group';

class Lab extends Phaser.Scene {
  constructor({parent, width = 800, height = 600, physicsType = 'arcade'} = {}) {
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

    this.groupPop = 50;
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
    this.load.image('star', star);
    this.load.image('circle', circle);
    //spritesheets and json frame data
    this.load.atlas('blackLife', blackSprite, blackFrames);
    this.load.atlas('redLife', redPulse, redPulseFrames);
    this.load.atlas('blueLife', bluePulse, bluePulseFrames);
    this.load.atlas('greenLife', greenPulse, greenPulseFrames);
    //tiles
    this.load.image('tiles', tilesheet1);
    this.load.tilemapTiledJSON('tilemap', tilemap1);
    // this.load.tilemapTiledJSON('tilemap', tilemap2);
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

  this.map.setCollision([ 29, 6]);

  let loneStar, blueStar, greenStar, blackStar;
  let goalDivergence = 0.2;
  let goalGroup = this.add.group();
  loneStar = this.physics.add.image(this.config.width * (0.54 - goalDivergence), this.config.height * (0.55 - goalDivergence), 'star');
  loneStar.setCircle(30);
  loneStar.setScale(1);
  loneStar.setBounce(5);
  loneStar.collideWorldBounds = true;
  goalGroup.add(loneStar);

  let fps = 10;
  const blackGroupAnim = createAnimConfig (this, 'blackKey', 'blackLife', fps, 'black-life0.png', 0.5);
  const redGroupAnim = createAnimConfig (this, 'redKey', 'redLife', fps, 'pulsing-red-dot0.png');
  const blueGroupAnim = createAnimConfig (this, 'blueKey', 'blueLife', fps, 'pulsing-blue-dot0.png'); 
  const greenGroupAnim = createAnimConfig (this, 'greenKey', 'greenLife', fps, 'pulsing-green-dot0.png'); 

  const generalConfig = {world: this.physics.world, scene: this, config: this.config, tiles: this.tileLayer, seesTiles: true};
  let fitnessConfig = {goals: goalGroup};
  
  //Create one Genus
  this.genera.push(new Genus(generalConfig));
  const speciesConfig = {world: this.physics.world, scene: this, config: this.config, genus: this.genera[0], tiles: this.tileLayer, seesTiles: true};

   //4 Groups per Species, 4 Species (16 groups total) each with different animations
   //Create empty Species with only goals defined
  let newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: false});
  newSpecies.createGroup(blackGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(redGroupAnim , {pop: this.groupPop});
  newSpecies.createGroup(blueGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(greenGroupAnim, {pop: this.groupPop});
  this.genera[0].addSpecies(newSpecies);

  this.genera[0].setupGenus(fitnessConfig);
  
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
