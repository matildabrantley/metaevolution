// const Cluster = require('./cluster');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Life {
    constructor(body, mind = new Mind()){
        this.body = body;
        this.mind = mind;      
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
        // this.mind.update(body.position.x, body.position.y);      
        let outputs = this.mind.update(1, 1);      
        this.body.setVelocity(outputs[0]*25, outputs[1]*25);
        //this.body.setAngularVelocity(outputs[3]);
        
        //this.fitness = 

        this.fitness -= this.body.body.velocity.y;
        this.fitness -= this.body.body.velocity.x;
    }

    //
    updateFast() {
        let outputs = this.mind.update(1, 1);     
        
    }



}

// module.exports = Life;