// const Matter = require('matter-js');
let width = 800;
let height = 600;
let speciesPop = 250;
let maxStars = 10;

    let group;

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
    let firstSpecies;
    let starGroup;
    let distTexts = [];
    let loneStar;
    let distances = [];
    
    function preload () {
        this.load.image('star', 'sprites/star.png');
        this.load.image('bluestar', 'sprites/bluestar.png');
        this.load.image('blackstar', 'sprites/blackstar.png');
        this.load.image('circle', 'sprites/circle.png');
        this.load.atlas('redLife', 'sprites/pulsing-red-dot.png', 'sprites/pulsing-red-dot.json');
        this.load.atlas('blueLife', 'sprites/pulsing-blue-dot.png', 'sprites/pulsing-blue-dot.json');
        this.load.atlas('greenLife', 'sprites/pulsing-green-dot.png', 'sprites/pulsing-green-dot.json');
    }
    
    function create () {
        this.physics.world.setBounds( 0, 0, width, height );

        let goalGroup = this.add.group();
        loneStar = this.physics.add.image(width/2, height/2, 'star');
        loneStar.setCircle(30);
        loneStar.setScale(4);
        loneStar.setBounce(5);
        loneStar.collideWorldBounds = true;
        goalGroup.add(loneStar);
        
        // blueStar = this.physics.add.image(width/2, height/2, 'bluestar');
        // blueStar.setCircle(30);
        // blueStar.setScale(4);
        // blueStar.setBounce(5);
        // blueStar.collideWorldBounds = true;
        // goalGroup.add(blueStar);
        
        // blackStar = this.physics.add.image(width/2, height/2, 'blackstar');
        // blackStar.setCircle(30);
        // blackStar.setScale(5);
        // blackStar.setBounce(5);
        // blackStar.collideWorldBounds = true;
        // goalGroup.add(blackStar);
        
        //firstSpecies is key species, meaning is controls goals
        firstSpecies = new Species(this.physics.world, this, config, goalGroup, true);
        secondSpecies = new Species(this.physics.world, this, config, goalGroup);
        thirdSpecies = new Species(this.physics.world, this, config, goalGroup);

        const redAnimConfig = {
            key: 'redKey',
            frames: 'redLife',
            frameRate: 30,
            repeat: -1
        };
        const blueAnimConfig = {
            key: 'blueKey',
            frames: 'blueLife',
            frameRate: 30,
            repeat: -1
        };
        const greenAnimConfig = {
            key: 'greenKey',
            frames: 'greenLife',
            frameRate: 30,
            repeat: -1
        };
        this.anims.create(redAnimConfig);
        this.anims.create(blueAnimConfig);
        this.anims.create(greenAnimConfig);


        for (let i=0; i < speciesPop; i++){
            let life = new Life(this, 300, 400, 'redLife', 'pulsing-red-dot0.png');
            //life.setCircle(16);
            life.play('redKey');
            firstSpecies.add(life);
        }
        firstSpecies.setup(0.05);
        for (let i=0; i < speciesPop; i++){
            let life = new Life(this, 500, 300, 'blueLife', 'pulsing-blue-dot0.png');
            //life.setCircle(16);
            life.play('blueKey');
            secondSpecies.add(life);
        }
        secondSpecies.setup(0.1);
        for (let i=0; i < speciesPop; i++){
            let life = new Life(this, 500, 300, 'greenLife', 'pulsing-green-dot0.png');
            //life.setCircle(16);
            life.play('greenKey');
            thirdSpecies.add(life);
        }
        thirdSpecies.setup(0.75);
        //starGroup = this.add.group();
        // for (let i=0; i < maxStars; i++){
        //     let starBody = this.physics.add.image((i+1)*10 + 100, (i+1)*10, 'star');
        //     starBody.setCircle(30);
        //     starGroup.add(starBody);
        // }

        //for (let i=0; i < firstSpecies.getLength(); i++)
         //   distTexts.push(this.add.text(500, i*50 + 20, 'hello'));
    }

    function update () {
        let i = 0;
        // firstSpecies.children.each(function(creature) {
        //     distTexts[i].setText(Phaser.Math.Distance.BetweenPoints(loneStar, creature));
        //     i++;
        // }, this);

        // if (starGroup.getLength() < maxStars) {
        //     let starBody = this.physics.add.image(Math.random() * width, Math.random() * height, 'star');
        //     starBody.setCircle(30);
        //     starGroup.add(starBody);
        // }
        firstSpecies.updateWithEngine();
        secondSpecies.updateWithEngine();
        thirdSpecies.updateWithEngine();
        //this.physics.collide(firstSpecies, loneStar, eat);
    }

    // function render () {
    //     this.game.debug.text( "This is debug text", 100, 380 );
    // }

    function eat (creature, food) {
        food.destroy();
        // creature.fitness++;
    }

    // ​function getAllMethods(object) {
    //     return Object.getOwnPropertyNames(object).filter(function(property) {
    //         return typeof object[property] == 'function';
    //     });
    // }