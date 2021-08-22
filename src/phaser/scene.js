import Phaser from "phaser";
import logoImg from "../assets/logo.png";

//import assets from assets/index.js
import {
   //sprites
   star, bluestar, blackstar, greenstar, circle,
   //spritesheets
   redPulse, bluePulse, greenPulse, brightPulse, brownPulse, crimsonPulse, grayPulse, purplePulse, yellowPulse, 
   fireSpiral, waterSpiral, natureSpiral, windSpiral, sparkSpiral, groundSpiral, lightSpiral, voidSpiral,
   //json frame data
   redPulseFrames, bluePulseFrames, greenPulseFrames, brightPulseFrames, brownPulseFrames, 
   crimsonPulseFrames, grayPulseFrames, purplePulseFrames, yellowPulseFrames, 
   fireSpiralFrames, waterSpiralFrames, natureSpiralFrames, windSpiralFrames, 
   sparkSpiralFrames, groundSpiralFrames, lightSpiralFrames, voidSpiralFrames
} from './assets';

const Species = require('./species');
const Genus = require('./genus');
const Group = require('./group');

let width = 800;
let height = 600;
let groupPop = 150;
let maxStars = 10;
let genera = [];

var config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  backgroundColor: '#000F00',
  parent: 'phaser-example',
  physics: {
      default: 'arcade',
  }
};

let starGroup;
let globalTimer = 0;
let timerText;
let loneStar, blueStar, greenStar, brightStar;
// let chosenPoint;
let tiles, tileset, tileLayer;
let g1, g2, g3, g4;
let distances = [];

class Launch extends Phaser.Scene {
  constructor() {
    super("Launch");
  }

  preload () {
    this.load.image('star', star);
    this.load.image('bluestar', bluestar);
    this.load.image('blackstar', blackstar);
    this.load.image('greenstar', greenstar);
    this.load.image('circle', circle);
    this.load.atlas('redLife', redPulse, redPulseFrames');
    this.load.atlas('blueLife', bluePulse, bluePulseFrames');
    this.load.atlas('greenLife', greenPulse, greenPulseFrames');
    this.load.atlas('brightLife', whitePulse, whitePulseFrames');
    this.load.atlas('brownLife', brownPulse, brownPulseFrames');
    this.load.atlas('crimsonLife', crimsonPulse, crimsonPulseFrames');
    this.load.atlas('grayLife', grayPulse, grayPulseFrames');
    this.load.atlas('purpleLife', purplePulse, purplePulseFrames');
    this.load.atlas('yellowLife', yellowPulse, pulsing-yellowPulseFrames');
    this.load.atlas('fireSpiral', fireSpiral, fireSpiralFrames');
    this.load.atlas('waterSpiral', waterSpiral, waterSpiralFrames');
    this.load.atlas('natureSpiral', natureSpiral, natureSpiralFrames');
    this.load.atlas('windSpiral', windSpiral, windSpiralFrames');
    this.load.atlas('sparkSpiral', sparkSpiral, sparkSpiralFrames');
    this.load.atlas('groundSpiral', groundSpiral, groundSpiralFrames');
    this.load.atlas('lightSpiral', lightSpiral, lightSpiralFrames');
    this.load.atlas('voidSpiral', voidSpiral, voidSpiralFrames');

    this.load.image('tiles', 'sprites/all-tiles.png');
    // this.load.tilemapTiledJSON('tilemap', 'sprites/tilemap-data.json');
    this.load.tilemapTiledJSON('tilemap', 'sprites/tilemap-resource-data.json');
}

create () {
  //this.physics.world.setBounds( 0, 0, width, height );

  

  tiles = this.make.tilemap({ key: 'tilemap', tileWidth: 32, tileHeight: 32 });
  tileset = tiles.addTilesetImage('tiles');
  tileLayer = tiles.createLayer('training-grounds', tileset);

  tiles.setCollision([ 29, 48, 70 ]);

  let goalDivergence = 0.2;

  let goalGroup = this.add.group();
  loneStar = this.physics.add.image(width * (0.5 - goalDivergence), height * (0.5 - goalDivergence), 'star');
  loneStar.setCircle(30);
  loneStar.setScale(4);
  loneStar.setBounce(5);
  loneStar.collideWorldBounds = true;
  goalGroup.add(loneStar);
  
  // blueStar = this.physics.add.image(width * (0.5 + goalDivergence), height * (0.5 - goalDivergence), 'bluestar');
  // blueStar.setCircle(30);
  // blueStar.setScale(4);
  // blueStar.setBounce(5);
  // blueStar.collideWorldBounds = true;
  // goalGroup.add(blueStar);
  
  // blackStar = this.physics.add.image(width * (0.5 + goalDivergence), height * (0.5 + goalDivergence), 'blackstar');
  // blackStar.setCircle(30);
  // blackStar.setScale(5);
  // blackStar.setBounce(5);
  // blackStar.collideWorldBounds = true;
  // goalGroup.add(blackStar);
  
  // greenStar = this.physics.add.image(width * (0.5 - goalDivergence), height * (0.5 + goalDivergence), 'greenstar');
  // greenStar.setCircle(30);
  // greenStar.setScale(5);
  // greenStar.setBounce(5);
  // greenStar.collideWorldBounds = true;
  // goalGroup.add(greenStar);

  let fps = 30;
  const redGroupAnim = createAnimConfig (this, 'redKey', 'redLife', fps, 'pulsing-red-dot0.png');
  const blueGroupAnim = createAnimConfig (this, 'blueKey', 'blueLife', fps, 'pulsing-blue-dot0.png'); 
  const greenGroupAnim = createAnimConfig (this, 'greenKey', 'greenLife', fps, 'pulsing-green-dot0.png'); 
  const brightGroupAnim = createAnimConfig (this, 'brightKey', 'brightLife', fps, 'pulsing-white-star0.png'); 
  const brownGroupAnim = createAnimConfig (this, 'brownKey', 'brownLife', fps+1, 'pulsing-brown-star0.png'); 
  const crimsonGroupAnim = createAnimConfig (this, 'crimsonKey', 'crimsonLife', fps+2, 'pulsing-crimson-star0.png'); 
  const grayGroupAnim = createAnimConfig (this, 'grayKey', 'grayLife', fps+2, 'pulsing-gray-star0.png'); 
  const purpleGroupAnim = createAnimConfig (this, 'purpleKey', 'purpleLife', fps+2, 'pulsing-purple-star0.png'); 
  const yellowGroupAnim = createAnimConfig (this, 'yellowKey', 'yellowLife', fps+2, 'pulsing-yellow-star0.png'); 
  
  const fireSpiralAnim = createAnimConfig (this, 'fireSpiralKey', 'fireSpiral', fps, 'fire-spiral0.png', 0.4); 
  const waterSpiralAnim = createAnimConfig (this, 'waterSpiralKey', 'waterSpiral', fps, 'water-spiral0.png', 0.4); 
  const natureSpiralAnim = createAnimConfig (this, 'natureSpiralKey', 'natureSpiral', fps, 'nature-spiral0.png', 0.4); 
  const windSpiralAnim = createAnimConfig (this, 'windSpiralKey', 'windSpiral', fps, 'wind-spiral0.png', 0.4); 
  const sparkSpiralAnim = createAnimConfig (this, 'sparkSpiralKey', 'sparkSpiral', fps, 'spark-spiral0.png', 0.4); 
  const groundSpiralAnim = createAnimConfig (this, 'groundSpiralKey', 'groundSpiral', fps, 'ground-spiral0.png', 0.4); 
  const lightSpiralAnim = createAnimConfig (this, 'lightSpiralKey', 'lightSpiral', fps, 'light-spiral0.png', 0.4); 
  const voidSpiralAnim = createAnimConfig (this, 'voidSpiralKey', 'voidSpiral', fps, 'void-spiral0.png', 0.4); 

  const speciesConfig = {world: this.physics.world, scene: this, config: config, tiles: tileLayer};
  let fitnessConfig = {goals: goalGroup};

  //Create one Genus
  genera.push(new Genus());

   //4 Groups per Species, 4 Species (16 groups total) each with different animations
   //Create empty Species with only goals defined
  let newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: true});
  newSpecies.createGroup(redGroupAnim, {pop: groupPop}, fitnessConfig);
  newSpecies.createGroup(blueGroupAnim, {pop: groupPop});
  newSpecies.createGroup(greenGroupAnim, {pop: groupPop});
  newSpecies.createGroup(brightGroupAnim, {pop: groupPop});
  genera[0].addSpecies(newSpecies);

  newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: true});
  //newSpecies.createGroup(brownGroupAnim, {pop: groupPop});
  newSpecies.createGroup(crimsonGroupAnim, {pop: groupPop});
  newSpecies.createGroup(grayGroupAnim, {pop: groupPop});
  newSpecies.createGroup(purpleGroupAnim, {pop: groupPop});
  newSpecies.createGroup(yellowGroupAnim, {pop: groupPop});
  genera[0].addSpecies(newSpecies);

  newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: true});
  newSpecies.createGroup(fireSpiralAnim, {pop: groupPop});
  newSpecies.createGroup(waterSpiralAnim, {pop: groupPop});
  newSpecies.createGroup(natureSpiralAnim, {pop: groupPop});
  newSpecies.createGroup(windSpiralAnim, {pop: groupPop}, fitnessConfig);
  genera[0].addSpecies(newSpecies);

   newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: true});
  newSpecies.createGroup(sparkSpiralAnim, {pop: groupPop});
  newSpecies.createGroup(groundSpiralAnim, {pop: groupPop});
   newSpecies.createGroup(lightSpiralAnim, {pop: groupPop});
   newSpecies.createGroup(voidSpiralAnim, {pop: groupPop});
   genera[0].addSpecies(newSpecies);

  
  // newSpecies.addPreySpecies(newSpecies3);
  // newSpecies3.addPredatorSpecies(newSpecies);

  // this.physics.add.collider(loneStar, tileLayer);


  timerText = this.add.text(10, 10, globalTimer);
}

update () {
  timerText.setText("Update " + globalTimer);
  

  if (globalTimer == 38);
      let breakhere = 'break';

  //Update each genus
  for (let genus of genera)
      genus.update();

  //example of collision handling
  //this.physics.collide(redGroup, blueGroup, eat);
  globalTimer++;
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

export default Launch;
