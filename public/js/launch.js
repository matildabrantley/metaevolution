// const Matter = require('matter-js');

function start() {
    let group;

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#1b1464',
        parent: 'phaser-example',
        physics: {
            default: 'arcade',
            matter: {
                debug: true
            }
        },
        scene: {
            preload: preload,
            create: create, 
            update: update,
        }
    };
    
    var game = new Phaser.Game(config);
    let circleGroup;
    let starGroup;
    
    function preload () {
        this.load.image('star', '/public/sprites/star.png');
        this.load.image('circle', '/public/sprites/circle.png');
    }
    
    function create () {

        //TODO:: Finish changing to arcade physics!

        let livingGroup = [];
        circleGroup = this.add.group();
        for (let i=0; i < 10; i++){
            let circleBody = this.physics.add.image((i+1)*10, (i+1)*10, 'circle');
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
        group.updateWithEngine();
        this.physics.collide(circleGroup, starGroup, eat);
    }

    function eat (creature, food) {
        food.destroy();
    }

    
}

start();