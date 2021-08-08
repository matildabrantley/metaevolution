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
        let angle = Phaser.Math.Angle.BetweenPoints(this, goal);
        let dist = Phaser.Math.Distance.BetweenPoints(this, goal);
        
        let in1 = goal.x > this.x ? 1 : -1;
        let in2 = goal.y > this.y ? 1 : -1;

        let outputs = this.mind.update(angle, in1, in2);           
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

const squish = (x) => x * 0.01;

// module.exports = Life;