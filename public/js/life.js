// const Net = require('./cluster');
// const Vector = require('./vector');

// const Matter = require('matter-js');
class Life extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, sprite, frame, tiles)
    {
        super(scene, x, y, sprite, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.tiles;
        this.tileSize = 32;
        
        this.fitness = 0;

        //for updateWithEngine
        this.setBounce(10000);

        // only for fast updating (no rendering and only limited physics)
        // this.x;?
        // this.y;?
    }

    //for updating within update loop of Phaser or Matter
    update(goals, bonusGoal) {
        //let angle = Phaser.Math.Angle.BetweenPoints(this, goal);
        //let dist = Phaser.Math.Distance.BetweenPoints(this, goal);

        let inputs = [];
        //distance from goals and bonus goal
        for (let g=0; g < goals.length; g++){
            inputs.push((this.x - goals[g].x) / 100); //x difference (not dist)
            inputs.push((this.y - goals[g].y) / 100); //y difference
            inputs.push((this.x - goals[g].x) / 100); //x difference (not dist)
            inputs.push((this.y - goals[g].y) / 100); //y difference
            inputs.push((this.x - goals[g].x) / 100); //x difference (not dist)
            inputs.push((this.y - goals[g].y) / 100); //y difference
            inputs.push(g == bonusGoal ? 3 : -3) //bonus goal
        }
        inputs = inputs.concat(this.getTileInputs());


        let outputs = this.mind.update(inputs);           
        // this.setAcceleration((outputs[0] + outputs[2]) * 500, (outputs[1] + outputs[3]) * 500);
        this.body.velocity.x = (outputs[0] + outputs[2]) * 500;
        this.body.velocity.y = (outputs[1] + outputs[3]) * 500;

        // if (outputs[4] > 0.2)
        //    this.tryToJump();
        //this.setAngularVelocity(outputs[3]);
        // if (!this.body.touching.down)
        //     this.setVelocityY(100);
    }

    tryToJump(force=1) {
        if (this.body.touching.down)
            this.setAccelerationY(3000 * force);
        else 
            this.setVelocityY(0);
    }

    updateFast() {
        let outputs = this.mind.update(1, 1);     
        
    }

    getTileInputs(){
        const tileSize = this.tileSize;
        const tileInputs = [];

        //Go around clock-wise
        tileInputs.push(this.lookAtTile(this.x, this.y - tileSize)); //12:00, Up, North
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y - tileSize)); //1:30, Upper Right, Northeast
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y, true)); //3:00, Right, East
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y + tileSize)); //4:30, Bottom Right, Southeast
        tileInputs.push(this.lookAtTile(this.x, this.y + tileSize)); //6:00, Bottom, South
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y + tileSize)); //7:30, Bottom Left, Southwest
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y)); //9:00, Left, West
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y - tileSize)); //10:30, Upper Left, Northwest

        //Generate array of inputs based on if the tiles collide or not
        //return nearbyTiles.map((a) => (a === 70 || a === 48 || a === 29)  ? -3 : 0); 
        return tileInputs;
    }

    lookAtTile(x, y){
        let tileInput;
        try {
            let tile = tiles.getTileAtWorldXY(x, y, true).index;
            //TODO: get these magic tile numbers from elsewhere
            tileInput = (tile === 70 || tile === 48 || tile === 29) ? -2 : 0;
        }
        catch { //treat out of bounds the same as blocking tile for neural input
            tileInput = -2;
        }
        return tileInput;
    }

    //This inidividual's Nets replaced with a clone's
    clone(cloned) {
        //TODO: For each tier of Nets
        this.mind.net.asexual(cloned.mind.net);
    }
    //This is replaced with offspring of mating
    mate(mom, dad) {
        //TODO: For each tier of Nets
        this.mind.net.asexual(mom.mind.net, dad.mind.net);
    }
    
    mutate() {
        
    }
}

//const squish = (x) => x * 0.01;

// module.exports = Life;