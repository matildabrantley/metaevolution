// const Cluster = require('./cluster');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Life extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, sprite, mind = new Mind())
    {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.mind = mind; 
        
        this.fitness = 0;

        //for updateWithEngine
        this.setVelocity(10, 10);
        this.setAngularVelocity(6.5);
        this.setBounce(1);

        // only for fast updating (no rendering and only limited physics)
        // this.x;
        // this.y;
    }

    //for updating within update loop of Phaser or Matter
    update(goal) {
        let outputs = this.mind.update(squish(this.x), squish(this.y), squish(goal.x), squish(goal.y));           
        this.setVelocity(outputs[0]*250 * Math.random(), outputs[1]*250 * Math.random());
        //this.setAngularVelocity(outputs[3]);
    }

    //
    updateFast() {
        let outputs = this.mind.update(1, 1);     
        
    }

    mutate() {
        
    }
}

const squish = (x, base = 2) => 1 / (1 + Math.pow(base, -x));

// module.exports = Life;