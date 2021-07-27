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
            default: 'matter',
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
        this.load.image('star', '../assets/images/star.png');
    }
    
    function create () {
        this.matter.world.setBounds().disableGravity();
    
        let bodies = [];
        for (let i=0; i < 10; i++){
            let circleBody = this.matter.add.image((i+1)*10, (i+1)*10, 'star');
            circleBody.setBody({
                type: 'circle',
                radius: 16
            });
            bodies.push(circleBody);
        }

        group = new Group(bodies);

    }

    function update () {
        group.updateAll();
    }
    
}

start();