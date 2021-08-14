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
        this.setAcceleration((outputs[0] + outputs[2]) * 500, (outputs[1] + outputs[3]) * 500);
        if (outputs[4] > 0.2)
           this.tryToJump();
        //this.setAngularVelocity(outputs[3]);
        if (!this.body.touching.down)
            this.setVelocityY(100);
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
        const nearbyTiles = [];
        //nearbyTiles.push(tiles.getTileAtWorldXY(this.x, this.y, true)); //don't need to know tile we're on for now
        //Go around clock-wise
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x, this.y - tileSize, true).index); //12:00, Up, North
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x + tileSize, this.y - tileSize, true).index); //1:30, Upper Right, Northeast
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x + tileSize, this.y, true).index); //3:00, Right, East 
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x + tileSize, this.y + tileSize, true).index); //4:30, Bottom Right, Southeast
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x, this.y + tileSize, true).index); //6:00, Bottom, South
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x - tileSize, this.y + tileSize, true).index); //7:30, Bottom Left, Southwest
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x - tileSize, this.y, true).index); //9:00, Left, West
        nearbyTiles.push(tiles.getTileAtWorldXY(this.x - tileSize, this.y - tileSize, true).index); //10:30, Upper Left, Northwest

        //Generate array of inputs based on if the tiles collide or not
        //TODO: get these magic tile numbers from elsewhere
        return nearbyTiles.map((a) => (a === 70 || a === 48 || a === 29)  ? -3 : 0); 
    }

    //This is replaced with a clone
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