// const Matter = require('matter-js');
let width = 800;
let height = 600;
let maxLifeforms = 500;
let maxStars = 10;

    let group;

    var config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        backgroundColor: '#1b1464',
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
    let circleGroup;
    let starGroup;
    let distTexts = [];
    let loneStar;
    let distances = [];
    
    function preload () {
        this.load.image('star', 'sprites/star.png');
        this.load.image('circle', 'sprites/circle.png');
    }
    
    function create () {
        this.physics.world.setBounds( 0, 0, width, height );

        loneStar = this.physics.add.image(width/2, height/2, 'star');
        loneStar.setCircle(30);
        loneStar.setScale(5);
        loneStar.setBounce(5);
        loneStar.collideWorldBounds = true;

        //circleGroup = this.add.group();
        circleGroup = new Group(this.physics.world, this, config, loneStar);;

        for (let i=0; i < maxLifeforms; i++){
            let circleBody = new Life(this, 250, 250, 'circle');
            circleBody.setCircle(30);
            circleGroup.add(circleBody);
        }
        circleGroup.simplify();
        //starGroup = this.add.group();
        // for (let i=0; i < maxStars; i++){
        //     let starBody = this.physics.add.image((i+1)*10 + 100, (i+1)*10, 'star');
        //     starBody.setCircle(30);
        //     starGroup.add(starBody);
        // }

        //for (let i=0; i < circleGroup.getLength(); i++)
         //   distTexts.push(this.add.text(500, i*50 + 20, 'hello'));
    }

    function update () {
        let i = 0;
        // circleGroup.children.each(function(creature) {
        //     distTexts[i].setText(Phaser.Math.Distance.BetweenPoints(loneStar, creature));
        //     i++;
        // }, this);

        // if (starGroup.getLength() < maxStars) {
        //     let starBody = this.physics.add.image(Math.random() * width, Math.random() * height, 'star');
        //     starBody.setCircle(30);
        //     starGroup.add(starBody);
        // }
        circleGroup.updateWithEngine();
        //this.physics.collide(circleGroup, loneStar, eat);
    }

    // function render () {
    //     this.game.debug.text( "This is debug text", 100, 380 );
    // }

    function eat (creature, food) {
        food.destroy();
        // creature.fitness++;
    }