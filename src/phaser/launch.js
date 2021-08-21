// const Matter = require('matter-js');
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
    },
    scene: {
        preload: preload,
        create: create, 
        update: update,
        //render: render
    }
};

var game = new Phaser.Game(config);
let starGroup;
let globalTimer = 0;
let timerText;
let loneStar, blueStar, greenStar, brightStar;
// let chosenPoint;
let tiles, tileset, tileLayer;
let g1, g2, g3, g4;
let distances = [];

function preload () {
    this.load.image('star', './sprites/star.png');
    this.load.image('bluestar', 'sprites/bluestar.png');
    this.load.image('blackstar', 'sprites/blackstar.png');
    this.load.image('greenstar', 'sprites/greenstar.png');
    this.load.image('circle', 'sprites/circle.png');
    this.load.atlas('redLife', 'sprites/pulsing-red-dot.png', 'sprites/pulsing-red-dot.json');
    this.load.atlas('blueLife', 'sprites/pulsing-blue-dot.png', 'sprites/pulsing-blue-dot.json');
    this.load.atlas('greenLife', 'sprites/pulsing-green-dot.png', 'sprites/pulsing-green-dot.json');
    this.load.atlas('brightLife', 'sprites/pulsing-white-star.png', 'sprites/pulsing-white-star.json');
    this.load.atlas('brownLife', 'sprites/pulsing-brown-star.png', 'sprites/pulsing-brown-star.json');
    this.load.atlas('crimsonLife', 'sprites/pulsing-crimson-star.png', 'sprites/pulsing-crimson-star.json');
    this.load.atlas('grayLife', 'sprites/pulsing-gray-star.png', 'sprites/pulsing-gray-star.json');
    this.load.atlas('purpleLife', 'sprites/pulsing-purple-star.png', 'sprites/pulsing-purple-star.json');
    this.load.atlas('yellowLife', 'sprites/pulsing-yellow-star.png', 'sprites/pulsing-yellow-star.json');
    
    this.load.atlas('fireSpiral', 'sprites/fire-spiral.png', 'sprites/fire-spiral.json');
    this.load.atlas('waterSpiral', 'sprites/water-spiral.png', 'sprites/water-spiral.json');
    this.load.atlas('natureSpiral', 'sprites/nature-spiral.png', 'sprites/nature-spiral.json');
    this.load.atlas('windSpiral', 'sprites/wind-spiral.png', 'sprites/wind-spiral.json');
    this.load.atlas('sparkSpiral', 'sprites/spark-spiral.png', 'sprites/spark-spiral.json');
    this.load.atlas('groundSpiral', 'sprites/ground-spiral.png', 'sprites/ground-spiral.json');
    this.load.atlas('lightSpiral', 'sprites/light-spiral.png', 'sprites/light-spiral.json');
    this.load.atlas('voidSpiral', 'sprites/void-spiral.png', 'sprites/void-spiral.json');

    this.load.image('tiles', 'sprites/all-tiles.png');
    // this.load.tilemapTiledJSON('tilemap', 'sprites/tilemap-data.json');
    this.load.tilemapTiledJSON('tilemap', 'sprites/tilemap-resource-data.json');
}

function create () {
    this.physics.world.setBounds( 0, 0, width, height );

    

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

function update () {
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

function eat (predator, prey) {
    //food.destroy();
    predator.fitness++;
    prey.fitness--;
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