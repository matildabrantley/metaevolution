// const Cluster = require('./cluster');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Life {
    constructor(body, mind = new Mind()){
        this.body = body;
        this.mind = mind; 
        
        this.goal = goal;
        this.startingDistFromGoal = Phaser.Math.Distance.BetweenPoints(goal, body)
        this.fitness = 0;

        //for updateWithEngine
        this.body.setVelocity(1, -1);
        this.body.setAngularVelocity(6.5);
        this.body.setBounce(1);

        // only for fast updating (no rendering and only limited physics)
        this.x;
        this.y;
    }

    //for updating within update loop of Phaser or Matter
    updateWithEngine() {
        this.mind.update(this.goal.position.x, this.goal.position.y);      
        let outputs = this.mind.update(1, 1);      
        this.body.setVelocity(outputs[0]*25, outputs[1]*25);
        //this.body.setAngularVelocity(outputs[3]);
        
        let fitnessDelta = Phaser.Math.Distance.BetweenPoints(this.goal, this.body) / (this.startingDistFromGoal + 1);
        this.fitness += fitnessDelta;
    }

    //
    updateFast() {
        let outputs = this.mind.update(1, 1);     
        
    }



}

// module.exports = Life;