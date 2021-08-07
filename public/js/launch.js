// const Matter = require('matter-js');
let width = 800;
let height = 600;

function start() {
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
    let starCount;
    
    function preload () {
        this.load.image('star', 'sprites/star.png');
        this.load.image('circle', 'sprites/circle.png');
    }
    
    function create () {

        starCount = this.add.text(500, 50, 'hello');

        let livingGroup = [];
        circleGroup = this.add.group();
        for (let i=0; i < 10; i++){
            let circleBody = this.physics.add.image((i+1)*10, (i+1)*10, 'circle');
            circleBody.fitness = 0;
            circleBody.setCircle(30);
            livingGroup.push(circleBody);
            circleGroup.add(circleBody);
        }
        starGroup = this.add.group();
        for (let i=0; i < 10; i++){
            let starBody = this.physics.add.image((i+1)*10 + 100, (i+1)*10, 'star');
            starBody.setCircle(30);
            starGroup.add(starBody);
        }
        
        group = new Group(livingGroup);

    }

    function update () {
        starCount.setText(starGroup.getLength());

        if (starGroup.getLength() < 10) {
            let starBody = this.physics.add.image(Math.random() * width, Math.random() * height, 'star');
            starBody.setCircle(30);
            starGroup.add(starBody);
        }
        group.updateWithEngine();
        this.physics.collide(circleGroup, starGroup, eat);
    }

    // function render () {
    //     this.game.debug.text( "This is debug text", 100, 380 );
    // }

    function eat (creature, food) {
        food.destroy();
        creature.fitness++;
    }

    
}

start();