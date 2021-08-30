import Phaser from "phaser";

//Import static sprites
import star from './assets/sprites/star.png';
import bluestar from './assets/sprites/bluestar.png';
import blackstar from './assets/sprites/blackstar.png';
import greenstar from './assets/sprites/greenstar.png';

//import tilesheet, tilemapping
import tilesheet1 from './assets/tiles/all-tiles.png';
import tilemap1 from './assets/tiles/tilemap-lab-data';


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
    this.globalTimer = 0;

  }

  preload () {
    //tiles
    this.load.image('tiles', tilesheet1);
    this.load.tilemapTiledJSON('tilemap', tilemap1);
    // this.load.tilemapTiledJSON('tilemap', tilemap2);
}

create () {
  this.graphics = this.add.graphics();

  //this.physics.world.setBounds( 0, 0, width, height );
  const cam = this.cameras.main.setBounds(0, 0, 1440, 1440);
  this.cursors = this.input.keyboard.createCursorKeys();
  this.keys = this.input.keyboard.addKeys('W,A,S,D');
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
  loneStar.setScale(4);
  loneStar.setBounce(5);
  loneStar.collideWorldBounds = true;
  goalGroup.add(loneStar);
  
  blueStar = this.physics.add.image(this.config.width * (0.54 + goalDivergence), this.config.height * (0.55 - goalDivergence), 'bluestar');
  blueStar.setCircle(30);
  blueStar.setScale(4);
  blueStar.setBounce(5);
  blueStar.collideWorldBounds = true;
  goalGroup.add(blueStar);
  
  // blackStar = this.physics.add.image(this.config.width * (0.5 + goalDivergence), this.config.height * (0.5 + goalDivergence), 'blackstar');
  // blackStar.setCircle(30);
  // blackStar.setScale(5);
  // blackStar.setBounce(5);
  // blackStar.collideWorldBounds = true;
  // goalGroup.add(blackStar);
  
  // greenStar = this.physics.add.image(this.config.width * (0.5 - goalDivergence), this.config.height * (0.5 + goalDivergence), 'greenstar');
  // greenStar.setCircle(30);
  // greenStar.setScale(5);
  // greenStar.setBounce(5);
  // greenStar.collideWorldBounds = true;
  // goalGroup.add(greenStar);

  const speciesConfig = {world: this.physics.world, scene: this, config: this.config, tiles: this.tileLayer};
  let fitnessConfig = {goals: goalGroup};

  //Create one Genus
  this.genera.push(new Genus());

   //4 Groups per Species, 4 Species (16 groups total) each with different animations
   //Create empty Species with only goals defined
  let newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: false});
  newSpecies.createGroup(redGroupAnim, {pop: this.groupPop}, fitnessConfig);
  newSpecies.createGroup(blueGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(greenGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(brightGroupAnim, {pop: this.groupPop});
  this.genera[0].addSpecies(newSpecies);

  newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: false});
  //newSpecies.createGroup(brownGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(crimsonGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(grayGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(purpleGroupAnim, {pop: this.groupPop});
  newSpecies.createGroup(yellowGroupAnim, {pop: this.groupPop});
  this.genera[0].addSpecies(newSpecies);

  newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: false});
  newSpecies.createGroup(fireSpiralAnim, {pop: this.groupPop});
  newSpecies.createGroup(waterSpiralAnim, {pop: this.groupPop});
  newSpecies.createGroup(natureSpiralAnim, {pop: this.groupPop});
  newSpecies.createGroup(windSpiralAnim, {pop: this.groupPop});
  this.genera[0].addSpecies(newSpecies);

   newSpecies = new Species(speciesConfig, {goals: goalGroup, goalsAreMoving: false});
  newSpecies.createGroup(sparkSpiralAnim, {pop: this.groupPop});
  newSpecies.createGroup(groundSpiralAnim, {pop: this.groupPop});
   newSpecies.createGroup(lightSpiralAnim, {pop: this.groupPop});
   newSpecies.createGroup(voidSpiralAnim, {pop: this.groupPop});
  this.genera[0].addSpecies(newSpecies);

  this.genera[0].setupSpecies();

  
  // newSpecies.addPreySpecies(newSpecies3);
  // newSpecies3.addPredatorSpecies(newSpecies);

  // this.physics.add.collider(loneStar, tileLayer);


  this.timerText = this.add.text(10, 10, this.globalTime);
}

update () {
  this.timerText.setText("Update " + this.globalTime); 

  // const cam = this.cameras.main;
    
  // if (this.keys.A.isDown)
  // {
  //     cam.scrollX -= 4;
  // }
  // else if (this.keys.D.isDown)
  // {
  //     cam.scrollX += 4;
  // }

  // if (this.keys.W.isDown)
  // {
  //     cam.scrollY -= 4;
  // }
  // else if (this.keys.S.isDown)
  // {
  //     cam.scrollY += 4;
  // }

  // if (this.cursors.left.isDown)
  // {
  //     cam.rotation -= 0.005;
  // }
  // else if (this.cursors.right.isDown)
  // {
  //     cam.rotation += 0.005;
  // }
    

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

export default Lab; 
