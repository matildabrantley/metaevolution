// const Matter = require('matter-js');
let width = 800;
let height = 600;
let groupPop = 1250;
let maxStars = 10;
const species = [];

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
let loneStar;
let distances = [];

function preload () {
    this.load.image('star', 'sprites/star.png');
    this.load.image('bluestar', 'sprites/bluestar.png');
    this.load.image('blackstar', 'sprites/blackstar.png');
    this.load.image('greenstar', 'sprites/greenstar.png');
    this.load.image('circle', 'sprites/circle.png');
    this.load.atlas('redLife', 'sprites/pulsing-red-dot.png', 'sprites/pulsing-red-dot.json');
    this.load.atlas('blueLife', 'sprites/pulsing-blue-dot.png', 'sprites/pulsing-blue-dot.json');
    this.load.atlas('greenLife', 'sprites/pulsing-green-dot.png', 'sprites/pulsing-green-dot.json');
    this.load.atlas('brightLife', 'sprites/pulsing-white-star.png', 'sprites/pulsing-white-star.json');
}

function create () {
    this.physics.world.setBounds( 0, 0, width, height );

    let goalGroup = this.add.group();
    loneStar = this.physics.add.image(width * 0.35, height * 0.35, 'star');
    loneStar.setCircle(30);
    loneStar.setScale(4);
    loneStar.setBounce(5);
    loneStar.collideWorldBounds = true;
    goalGroup.add(loneStar);
    
    // blueStar = this.physics.add.image(width * 0.65, height * 0.35, 'bluestar');
    // blueStar.setCircle(30);
    // blueStar.setScale(4);
    // blueStar.setBounce(5);
    // blueStar.collideWorldBounds = true;
    // goalGroup.add(blueStar);
    
    blackStar = this.physics.add.image(width * 0.65, height * 0.65, 'blackstar');
    blackStar.setCircle(30);
    blackStar.setScale(5);
    blackStar.setBounce(5);
    blackStar.collideWorldBounds = true;
    goalGroup.add(blackStar);
    
    // greenStar = this.physics.add.image(width * 0.35, height * 0.65, 'greenstar');
    // greenStar.setCircle(30);
    // greenStar.setScale(5);
    // greenStar.setBounce(5);
    // greenStar.collideWorldBounds = true;
    // goalGroup.add(greenStar);

    let animConfig = {
        key: 'redKey',
        frames: 'redLife',
        frameRate: 30,
        repeat: -1
    };
    this.anims.create(animConfig);
    const redGroupAnim = {spritesheet: animConfig.frames, key: animConfig.key, firstFrame: 'pulsing-red-dot0.png'};

    animConfig = {
        key: 'blueKey',
        frames: 'blueLife',
        frameRate: 30,
        repeat: -1
    };
    this.anims.create(animConfig);
    const blueGroupAnim = {spritesheet: animConfig.frames, key: animConfig.key, firstFrame: 'pulsing-blue-dot0.png'};
    
    animConfig = {
        key: 'greenKey',
        frames: 'greenLife',
        frameRate: 30,
        repeat: -1
    };
    this.anims.create(animConfig);
    const greenGroupAnim = {spritesheet: animConfig.frames, key: animConfig.key, firstFrame: 'pulsing-green-dot0.png'};
    
    animConfig = {
        key: 'brightKey',
        frames: 'brightLife',
        frameRate: 60,
        repeat: -1
    };
    this.anims.create(animConfig);
    const brightGroupAnim = {spritesheet: animConfig.frames, key: animConfig.key, firstFrame: 'pulsing-white-star0.png'};

    const groupConfig = {world: this.physics.world, scene: this, config: config, goals: goalGroup};

    species.push(new Species({goals: goalGroup, goalsAreMoving: true})); //create empty species with only goals defined
    species[0].createGroup(groupConfig, redGroupAnim, {pop: groupPop});
    species[0].createGroup(groupConfig, blueGroupAnim, {pop: groupPop});
    species[0].createGroup(groupConfig, greenGroupAnim, {pop: groupPop});
    species[0].createGroup(groupConfig, brightGroupAnim, {pop: groupPop});
    // species[0].createGroup(groupConfig, redGroupAnim, {pop: 100});
    // species[0].createGroup(groupConfig, blueGroupAnim, {pop: 100});
    // species[0].createGroup(groupConfig, greenGroupAnim, {pop: 100});
    // species[0].createGroup(groupConfig, brightGroupAnim, {pop: 100});

     timerText = this.add.text(10, 10, globalTimer);
}

function update () {
    timerText.setText("Update " + globalTimer);
    
    //Let's pretend "specie" is the correct singular of "species" =)
    for (let specie of species)
        specie.update();

    //example of collision handling
    //this.physics.collide(groups[0], loneStar, eat);
    globalTimer++;
}

function eat (creature, food) {
    food.destroy();
    // creature.fitness++;
}
