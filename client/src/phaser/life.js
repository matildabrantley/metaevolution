const Net = require('./net');
const Phaser = require('phaser');
// const Vector = require('./vector');

class Life extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, sprite, frame, tiles)
    {
        super(scene, x, y, sprite, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.tiles = tiles;
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
        this.body.setVelocityX((outputs[0]) * 700);
        this.body.setVelocityY((outputs[1]) * 700);

        // if (outputs[4] > 0.2)
        //    this.tryToJump();
        //this.setAngularVelocity(outputs[3]);
        // if (!this.body.touching.down)
        //     this.setVelocityY(100);

        //this.feed();
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

        //current tile, tripled input
        // tileInputs.push(this.lookAtTile(this.x, this.y)); 
        // tileInputs.push(this.lookAtTile(this.x, this.y)); 
        // tileInputs.push(this.lookAtTile(this.x, this.y)); 
        //Go around clock-wise for nearest 8
        tileInputs.push(this.lookAtTile(this.x, this.y - tileSize)); //12:00, Up, North
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y - tileSize)); //1:30, Upper Right, Northeast
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y, true)); //3:00, Right, East
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y + tileSize)); //4:30, Bottom Right, Southeast
        tileInputs.push(this.lookAtTile(this.x, this.y + tileSize)); //6:00, Bottom, South
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y + tileSize)); //7:30, Bottom Left, Southwest
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y)); //9:00, Left, West
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y - tileSize)); //10:30, Upper Left, Northwest
        
        // tileInputs.push(this.lookAtTile(this.x, this.y - tileSize * 2)); //12:00, Up, North
        // tileInputs.push(this.lookAtTile(this.x + tileSize  * 2, this.y - tileSize  * 2)); //1:30, Upper Right, Northeast
        // tileInputs.push(this.lookAtTile(this.x + tileSize  * 2, this.y, true)); //3:00, Right, East
        // tileInputs.push(this.lookAtTile(this.x + tileSize  * 2, this.y + tileSize  * 2)); //4:30, Bottom Right, Southeast
        // tileInputs.push(this.lookAtTile(this.x, this.y + tileSize  * 2)); //6:00, Bottom, South
        // tileInputs.push(this.lookAtTile(this.x - tileSize  * 2, this.y + tileSize  * 2)); //7:30, Bottom Left, Southwest
        // tileInputs.push(this.lookAtTile(this.x - tileSize  * 2, this.y)); //9:00, Left, West
        // tileInputs.push(this.lookAtTile(this.x - tileSize  * 2, this.y - tileSize  * 2)); //10:30, Upper Left, Northwest


        //Generate array of inputs based on if the tiles collide or not
        //return nearbyTiles.map((a) => (a === 70 || a === 48 || a === 29)  ? -3 : 0); 
        return tileInputs;
    }

    lookAtTile(x, y){
        let tileInput;
        try {
            let tile = this.tiles.getTileAtWorldXY(x, y, true).index;
            //TODO: get these magic tile numbers from elsewhere
            if (tile === 6 || tile === 48 || tile === 29){
                tileInput = 0;
                //this.fitness-=20;
            }
            else if (tile === 1) {
                tileInput = 2;
            }
            else {
                tileInput = 0;
            }
        }
        catch { //treat out of bounds the same as blocking tile for neural input
            tileInput = -2;
        }
        return tileInput;
    }

    feed(food=35){
        try{
            let tile = this.tiles.getTileAtWorldXY(this.x, this.y, true).index;
            if (tile == food)
                this.fitness+=2;
            //else
                //this.fitness--;
        }
        catch {}
    }

    //This inidividual's Nets replaced with a clone's
    clone(cloned, mutRate) {
        this.mind.cloneMind(cloned.mind, mutRate);
    }
    //This is replaced with offspring of mating
    mate(mom, dad, mutRate) {
        this.mind.mateMind(mom.mind, dad.mind, mutRate);
    }
    
    mutate() {
        
    }
}

//const squish = (x) => x * 0.01;

module.exports = Life;