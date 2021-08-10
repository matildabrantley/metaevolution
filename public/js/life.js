// const Cluster = require('./cluster');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Life extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, sprite, frame)
    {
        super(scene, x, y, sprite, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.mind = mind; 
        
        this.fitness = 0;

        //for updateWithEngine
        this.setVelocity(10, 10);
        this.setAngularVelocity(6.5);
        this.setBounce(1);

        // only for fast updating (no rendering and only limited physics)
        // this.x;?
        // this.y;?
    }

    //for updating within update loop of Phaser or Matter
    update(goals, bonusGoal) {
        //let angle = Phaser.Math.Angle.BetweenPoints(this, goal);
        //let dist = Phaser.Math.Distance.BetweenPoints(this, goal);
        let inputs = [];
        for (let g=0; g < goals.length; g++){
            inputs.push((this.x - goals[g].x) / 100); //x difference (not dist)
            inputs.push((this.y - goals[g].y) / 100); //y difference
            inputs.push(g == bonusGoal ? 1 : -1)
        }

        let outputs = this.mind.update(inputs);           
        this.setVelocity(outputs[0]*500, outputs[1]*500);
        //this.setAngularVelocity(outputs[3]);
    }

    //
    updateFast() {
        let outputs = this.mind.update(1, 1);     
        
    }

    mutate() {
        
    }
}

//const squish = (x) => x * 0.01;

// module.exports = Life;