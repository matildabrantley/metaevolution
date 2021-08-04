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
    
    function preload () {
        this.load.image('star', '/public/sprites/star.png');
        this.load.image('circle', '/public/sprites/circle.png');
    }
    
    function create () {
        //this.physics...
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!
        //TODO:: Finish changing to arcade physics!

        let bodies = [];
        for (let i=0; i < 10; i++){
            let circleBody = this.physics.add.image((i+1)*10, (i+1)*10, 'circle');
            circleBody.setCircle(30);
            bodies.push(circleBody);
        }

        group = new Group(bodies);

    }

    function update () {
        group.updateWithEngine();
    }
    
}

start();