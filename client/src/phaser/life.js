//import Net from '../neural/net';
const Phaser = require('phaser');
const copyDeep = require('lodash.clonedeep');
// const Vector = require('./vector');

class Life extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, {sprite, frame, tiles}={}, seesTiles = true)
    {
        if (frame)
            super(scene, x, y, sprite, frame);
        else
            super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.midWidth = scene.scale.displaySize._width / 2;
        this.midHeight = scene.scale.displaySize._height / 2;
        this.tiles = tiles;
        this.tileSize = 32;
        this.seesTiles = seesTiles;
        this.resources = [{tileIndex: 2, effect: 0, satiation: 1, amount: 0}, 
            {tileIndex: 3, effect: 1, satiation: 1, amount: 0}, 
            {tileIndex: 4, effect: 1, satiation: 1, amount: 0}, 
            {tileIndex: 5, effect: 1, satiation: 1, amount: 0}, 
            {tileIndex: 6, effect: 1, satiation: 1, amount: 0}];
        this.blockedTiles = [{tileIndex: 1, effect: -1}];

        this.currentResource = 0;
        this.fitness = 0;

        // this.setBounce(10000);
    }

    
    //for updating within update loop of Phaser or Matter
    update() {
        //let angle = Phaser.Math.Angle.BetweenPoints(this, goal);
        
        let inputs = [];
        
        //input absolute position relative to center of simulation
        inputs.push((this.x / this.midWidth) - 1);
        inputs.push((this.y / this.midHeight) - 1);
        inputs.push(this.currentTile());
        
        if (this.seesTiles)
        inputs = inputs.concat(this.getTileInputs());
        
        
        let outputs = this.mind.update(inputs);           
        // this.setAcceleration((outputs[0] + outputs[2]) * 500, (outputs[1] + outputs[3]) * 500);
        this.body.setVelocityX((outputs[0]) * 500);
        this.body.setVelocityY((outputs[1]) * 500);
        
        // this.angle = this.body.angularVelocity;
        // this.setAngle(this.body.angularAcceleration);
        
        this.updateFitness();
    }
    
    getTileInputs(){
        const tileSize = this.tileSize;
        const tileInputs = [];
        
        //current tile, doubled input
        tileInputs.push(this.lookAtTile(this.x, this.y)); 
        tileInputs.push(this.lookAtTile(this.x, this.y)); 
        
        //Adjacent 8 tiles, clockwise
        tileInputs.push(this.lookAtTile(this.x, this.y - tileSize)); //12:00, Up, North
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y - tileSize)); //1:30, Upper Right, Northeast
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y, true)); //3:00, Right, East
        tileInputs.push(this.lookAtTile(this.x + tileSize, this.y + tileSize)); //4:30, Bottom Right, Southeast
        tileInputs.push(this.lookAtTile(this.x, this.y + tileSize)); //6:00, Bottom, South
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y + tileSize)); //7:30, Bottom Left, Southwest
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y)); //9:00, Left, West
        tileInputs.push(this.lookAtTile(this.x - tileSize, this.y - tileSize)); //10:30, Upper Left, Northwest
        
        /*//Adjacent-adjacent (2 away) 8 tiles, clockwise 
        // tileInputs.push(this.lookAtTile(this.x, this.y - tileSize * 2)); //12:00, Up, North
        // tileInputs.push(this.lookAtTile(this.x + tileSize  * 2, this.y - tileSize  * 2)); //1:30, Upper Right, Northeast
        // tileInputs.push(this.lookAtTile(this.x + tileSize  * 2, this.y, true)); //3:00, Right, East
        // tileInputs.push(this.lookAtTile(this.x + tileSize  * 2, this.y + tileSize  * 2)); //4:30, Bottom Right, Southeast
        // tileInputs.push(this.lookAtTile(this.x, this.y + tileSize  * 2)); //6:00, Bottom, South
        // tileInputs.push(this.lookAtTile(this.x - tileSize  * 2, this.y + tileSize  * 2)); //7:30, Bottom Left, Southwest
        // tileInputs.push(this.lookAtTile(this.x - tileSize  * 2, this.y)); //9:00, Left, West
        // tileInputs.push(this.lookAtTile(this.x - tileSize  * 2, this.y - tileSize  * 2)); //10:30, Upper Left, Northwest
        */
       
       //Generate array of inputs based on if the tiles collide or not
       //return nearbyTiles.map((a) => (a === 70 || a === 48 || a === 29)  ? -3 : 0); 
       return tileInputs;
    }
    
    //returns 3-element array representing RGB used for neural input
    lookAtTile(x, y, isCurrentTile=false){
        try {
            let tileIndex = this.tiles.getTileAtWorldXY(x, y, true).index;

            //blocked tile seen as -1 in neural net
            if (tileIndex == 1)
                return -1;
                
            if (isCurrentTile)
                this.currentResource = tileIndex - 2;
              
            //blank tile
            if (tileIndex == 2)
                return 0;
            //TODO: return an RGB array 
            return 1;
            
            //return 0 if doesn't match any tiles
            return 0;
        }
        catch { //treat out of bounds as a strongly blocking tile
            return -2;
        }
    }
    
    //Check current tile for effects, like resource gathering, and return neural input(s)
    currentTile(){
        
        const tileInput = this.lookAtTile(this.x, this.y, true);
        //add current resource to resources array
        //reduce satiation (increase desire) of all resources by 2, down to 100
        this.resources.forEach(resource => {
            resource.satiation = Math.max(1, resource.satiation - 0.2);
        });
        let cr = this.resources[this.currentResource];
        //increase satiation (reduce desire) of current resource by 0.3, up to 100 (net change of +0.1)
        cr.satiation = Math.min(100, cr.satiation + 0.3);
        
        cr.amount += cr.effect / cr.satiation;
        
        
        return tileInput;
        }
                
        updateFitness(){
            //Give lifeform a bonus for diversity of resources by multiplying resources together (and dividing by 100)
            this.fitness += ((1+this.resources[0].amount) * (1+this.resources[0].amount)
                           * (1+this.resources[0].amount) * (1+this.resources[0].amount) 
                           * (1+this.resources[0].amount)) / 1000;
                    
            //Calibrating evolution by testing very simple pressures like moving a certain direction 
            // this.fitness += this.x/50;
            // this.fitness -= Math.abs(this.midWidth - this.x);
            // this.fitness -= Math.abs(this.midHeight - this.y);
            // this.fitness += this.y/50;
                }
                
        //This individual's Nets replaced with a clone's
        clone(cloned, mutRate) {
            this.mind.cloneMind(cloned.mind, mutRate);
        }
        //This is replaced with offspring of mating
         mate(mom, dad, mutRate) {
             this.mind.mateMind(mom.mind, dad.mind, mutRate);
           }
                
         mutate() {
                    
         }
                
          //return a deep copy of mind
        getMindCopy() {
            return copyDeep(this.mind);
        }
    }
            
    //const squish = (x) => x * 0.01;
            
export default Life;