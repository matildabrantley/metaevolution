// const Cluster = require('./cluster');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Life {
    constructor(body, mind = new Mind()){
        this.mind = mind;
        this.body = body;
        this.fitness = 0;
        this.speedBump = 0;

        this.body.setVelocity(1, -1);
        this.body.setAngularVelocity(6.5);
        this.body.setBounce(1);
        this.body.setFriction(0, 0, 0);
    }

    update() {
        // this.mind.update(body.position.x, body.position.y);      
        let outputs = this.mind.update(1, 1);      
        this.body.setVelocity(outputs[0]*5, outputs[1]*5);
        //this.body.setAngularVelocity(outputs[3]);
        
        this.fitness -= this.body.body.velocity.y;
    }


}

// module.exports = Life;