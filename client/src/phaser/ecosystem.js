import Phaser from "phaser";

//Import backgrounds
import floral from './assets/sprites/floral-stunning.jpg';
import floral2 from './assets/sprites/floral-colorful.jpg';

//Import static sprites
import defaultSprite from './assets/sprites/default.png';
import star from './assets/sprites/star.png';
import bluestar from './assets/sprites/bluestar.png';
import blackstar from './assets/sprites/blackstar.png';
import greenstar from './assets/sprites/greenstar.png';
import circle from './assets/sprites/circle.png';
//Import spritesheets for animations
// import rabbit from './assets/sprites/Rabbit.png';
// import darkrabbit from './assets/sprites/Rabbit-dark.png';
// import redrabbit from './assets/sprites/Rabbit-red.png';
// import bluerabbit from './assets/sprites/Rabbit-blue.png';

// Export json frame data for animations
// import rabbitFrames from './assets/frameData/Rabbit.json';
// import darkrabbitFrames from './assets/frameData/Rabbit-dark.json';
// import redrabbitFrames from './assets/frameData/Rabbit-red.json';
// import bluerabbitFrames from './assets/frameData/Rabbit-blue.json';

//import tilesheet, tilemapping
import tilesheet1 from './assets/tiles/all-tiles.png';
import tilemap1 from './assets/tiles/tilemap-eco-data';

import Genus from './genus';
import Species from './species';
import Group from './group';

// let chosenPoint;

class Ecosystem extends Phaser.Scene {
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

    this.worldSize = 1440; //size of whole world, not scene (which is canvas)
    this.pop = 200;
    this.genera = [];
    this.globalTime = 0;
  }

  getBest() {
    //works for one genus now
    return this.genera[0].getBestInGenus();
  }

  preload () {
    //backgrounds
    this.backgrounds = ['background', 'background2'];
    this.load.image(this.backgrounds[0], floral);
    this.load.image(this.backgrounds[1], floral2);
    //sprites
    this.load.image('default', defaultSprite);
    this.load.image('star', star);
    this.load.image('bluestar', bluestar);
    this.load.image('blackstar', blackstar);
    this.load.image('greenstar', greenstar);
    //spritesheets and json frame data
    // this.load.atlas('rabbit', rabbit, rabbitFrames);
    // this.load.atlas('darkrabbit', darkrabbit, darkrabbitFrames);
    // this.load.atlas('redrabbit', redrabbit, redrabbitFrames);
    // this.load.atlas('bluerabbit', bluerabbit, bluerabbitFrames);

    //tiles
    this.load.image('tiles', tilesheet1);
    this.load.tilemapTiledJSON('tilemap', tilemap1);
    // this.load.tilemapTiledJSON('tilemap', tilemap2);
}

create () {
  //this.physics.world.setBounds( 0, 0, width, height );
  const cam = this.cameras.main.setBounds(0, 0, 1440, 1440);
  this.cursors = this.input.keyboard.createCursorKeys();
  this.keys = this.input.keyboard.addKeys('W,A,S,D');
  this.cameras.main.centerToSize();
  cam.centerOn(200,180);
  cam.setBackgroundColor(0xffffff);

  //Background images copied into four quadrants
  let numStyles = 2;
  this.bgs = [];
  for (let i=0; i < numStyles; i++)  {
      let newBg = this.backgrounds[i];
      //four quadrants of background
      const bg = new Array(4);
      bg[0] = this.add.image(0, 0, newBg).setOrigin(0);
      bg[1] = this.add.image(720, 0, newBg).setOrigin(0);
      bg[1].flipX=true;
      bg[2] = this.add.image(0, 720, newBg).setOrigin(0);
      bg[2].flipY=true;
      bg[3] = this.add.image(720, 720, newBg).setOrigin(0);
      bg[3].flipX=true;
      bg[3].flipY=true;
      for (const quadrant of bg) {
          quadrant.setDisplaySize(2048, 2048);
          quadrant.setScale(0.5);
          quadrant.alpha = 0.4;
      }
      this.bgs.push(bg);
  } 
  //Background image opacity management
  this.maxOpacity = 0.7;
  this.bgOpacity = new Array(numStyles);
  this.bgOpacity[0] = this.maxOpacity;
  this.bgOpacity[1] = 0;
  this.bgOpacityDirection = 1;
  

  //Tiles
  this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 32, tileHeight: 32 });
  const tileset = this.map.addTilesetImage('tiles');
  this.tileLayer = this.map.createLayer('training-grounds', tileset);

  this.map.setCollision([ 1 ]);

  let loneStar, blueStar, greenStar, blackStar;
  let goalDivergence = 0.2;
  let goalGroup = this.add.group();
  loneStar = this.physics.add.image(this.config.width * (0.54 - goalDivergence), this.config.height * (0.55 - goalDivergence), 'star');
  loneStar.setCircle(30);
  loneStar.setScale(1);
  loneStar.setBounce(5);
  loneStar.collideWorldBounds = true;
  goalGroup.add(loneStar);
  
  blueStar = this.physics.add.image(this.config.width * (0.54 + goalDivergence), this.config.height * (0.55 - goalDivergence), 'bluestar');
  blueStar.setCircle(30);
  blueStar.setScale(1);
  blueStar.setBounce(5);
  blueStar.collideWorldBounds = true;
  goalGroup.add(blueStar);
  
  // blackStar = this.physics.add.image(this.config.width * (0.5 + goalDivergence), this.config.height * (0.5 + goalDivergence), 'blackstar');
  // blackStar.setCircle(30);
  // blackStar.setScale(1);
  // blackStar.setBounce(5);
  // blackStar.collideWorldBounds = true;
  // goalGroup.add(blackStar);
  
  // greenStar = this.physics.add.image(this.config.width * (0.5 - goalDivergence), this.config.height * (0.5 + goalDivergence), 'greenstar');
  // greenStar.setCircle(30);
  // greenStar.setScale(1);
  // greenStar.setBounce(5);
  // greenStar.collideWorldBounds = true;
  // goalGroup.add(greenStar);

  let fps = 20;
  // const rabbitAnim = createAnimConfig (this, 'rabbitKey', 'rabbit', fps, 'Rabbit0.png');
  // const darkrabbitAnim = createAnimConfig (this, 'darkrabbitKey', 'darkrabbit', fps, 'Rabbit-dark0.png');
  // const redrabbitAnim = createAnimConfig (this, 'redrabbitKey', 'redrabbit', fps, 'Rabbit-red0.png');
  // const bluerabbitAnim = createAnimConfig (this, 'bluerabbitKey', 'bluerabbit', fps, 'Rabbit-blue0.png');
  
  const generalConfig = {world: this.physics.world, scene: this, config: this.config, tiles: this.tileLayer, seesTiles: true};
  const speciesConfig = {world: this.physics.world, scene: this, config: this.config, tiles: this.tileLayer, seesTiles: false};
  let fitnessConfig = {};

  //Create one Genus
  this.genera.push(new Genus(generalConfig));
  
  // let species1 = this.genera[0].createSpecies(darkrabbitAnim, {pop: this.pop});
  // let species2 = this.genera[0].createSpecies(bluerabbitAnim, {pop: this.pop});
  // let species3 = this.genera[0].createSpecies(redrabbitAnim, {pop: this.pop});
  // let species4 = this.genera[0].createSpecies(rabbitAnim, {pop: this.pop});

  //manual setup
  this.genera[0].bestSpecies = this.genera[0].species[0];
  //species1.setupSpecies({goals: goalGroup, preySpecies: [species2, species3, species4]});
  // species1.setupSpecies({goals: goalGroup});
  // species2.setupSpecies({goals: goalGroup});
  // species3.setupSpecies({goals: goalGroup});
  // species4.setupSpecies({goals: goalGroup});

  //generic setup
  this.genera[0].setupGenus(fitnessConfig);

  
  // newSpecies.addPreySpecies(newSpecies3);
  // newSpecies3.addPredatorSpecies(newSpecies);

  // this.physics.add.collider(loneStar, tileLayer);


  this.timerText = this.add.text(10, 10, this.globalTime);
}

update () {
  this.timerText.setText("Update " + this.globalTime); 
  
   //Background styles imperceptibly alternate
  if (this.bgOpacity[0] >= this.maxOpacity)
            this.bgOpacityDirection = -1;
        else if (this.bgOpacity[0] <= 0)
            this.bgOpacityDirection = 1;
        this.bgOpacity[0] += 0.001 * this.bgOpacityDirection;
        this.bgOpacity[1] += 0.001 * this.bgOpacityDirection * -1;
        for (let i in this.bgs) {
            this.bgs[i].forEach(quadrant => { quadrant.alpha = this.bgOpacity[i] }) ;
        }

        //Camera controls
        const cam = this.cameras.main;
    
        if (this.keys.A.isDown)
        {
            cam.scrollX -= 11;
        }
        else if (this.keys.D.isDown)
        {
            cam.scrollX += 11;
        }
    
        if (this.keys.W.isDown)
        {
            cam.scrollY -= 11;
        }
        else if (this.keys.S.isDown)
        {
            cam.scrollY += 11;
        }
    
        if (this.cursors.left.isDown)
        {
            cam.rotation -= 0.015;
        }
        else if (this.cursors.right.isDown)
        {
            cam.rotation += 0.015;
        }
    

    //Update each genus
    //for (let genus of this.genera)
    //  genus.update();

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

export default Ecosystem;
