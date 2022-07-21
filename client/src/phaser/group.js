import Life from './life';
import Mind from '../neural/mind';
const Phaser = require('phaser');
// const Vector = require('./vector');

class Group extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config, tiles, species,
            {pop = 100, mutRate = 0.1 , selectionCutoff = 0.1, maxGenLength = 500, initialGenLength = 250, deltaGenLength = 5}={}){
        super(world, scene, config);
        this.lives = [];
        this.scene = scene;
        this.world = world;
        this.tiles = tiles;
        this.species = species;
        
        this.mutRate = mutRate;
        this.maxGenLength = maxGenLength;
        this.genLength = initialGenLength;
        this.deltaGenLength = deltaGenLength;
        this.selectionCutoff = selectionCutoff;
        this.numElites = 20;

        this.timer = 0;
        this.groupFitness = 0;
    }

    //maintains array of Life objects and create Minds
    setup() {
        this.lives = this.getChildren();

        this.preySpecies = [];
        this.predatorSpecies = [];

        for (let life of this.lives){
            //Create minds for each life
            const tileVisionInputs = this.species.seesTiles ? 10 : 0;
            life.mind = new Mind(4 + tileVisionInputs, 2);
        }

        //initialize "best" to simply first created for now
        this.best = this.lives[0];
    }

    //normal updating within Phaser's/Matter's loop
    update() {
        this.timer++;
        for (let life of this.lives) {

            life.update();
            
            this.fitness();
        }

        if (this.timer % this.genLength == 0){
           this.selection();
        }
    }

    fitness(){
        let allFitness = []; //used to calculate average fitness
        for (let life of this.lives){
            allFitness.push(life.fitness);
        }
        this.groupFitness += average(allFitness);

    }

    //generational change in group where fitness is sorted and replacement and mutation occur
    selection() {
        if (this.genLength < this.maxGenLength)
            this.genLength += 100;

        //fitness sorting function in which more fit lives move to front
        this.lives.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);
        this.bestMind = this.lives[0].getMindCopy(); //save the best so it can be saved to database when requested

        //vast majority of population replaced by sexual offspring of top X% (X = selectionCutoff)
        for (let i=this.lives.length-20; i > this.lives.length * this.selectionCutoff; i--) {
            let mom = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            let dad = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            this.lives[i].mate(this.lives[mom], this.lives[dad], this.mutRate);
        }

        //Elite Selection: Best 10 always get spot(s) in next generation without mutation,
        //                 with certain matings guaranteed (1st & 2nd, 1st & 3rd, etc)
        if (this.lives.length > 3) { //two clones of 1st and one clone of 2nd
            this.lives[this.lives.length - 1].clone(this.lives[0], 0);
            this.lives[this.lives.length - 2].clone(this.lives[0], 0);
            this.lives[this.lives.length - 3].clone(this.lives[1], 0);
        } if (this.lives.length > 6) { //three children of mating 1st/2nd
            this.lives[this.lives.length - 4].mate(this.lives[0], this.lives[1], 0);
            this.lives[this.lives.length - 5].mate(this.lives[0], this.lives[1], 0);
            this.lives[this.lives.length - 6].mate(this.lives[0], this.lives[1], 0);
        } if (this.lives.length > 10) {   //mating between 1st/3rd and 2nd/3rd, and clones of 3rd and 4th      
            this.lives[this.lives.length - 7].mate(this.lives[0], this.lives[2], 0);
            this.lives[this.lives.length - 7].mate(this.lives[1], this.lives[2], 0);
            this.lives[this.lives.length - 9].clone(this.lives[2], 0);
            this.lives[this.lives.length - 10].clone(this.lives[3], 0);
        } if (this.lives.length > 15) {         
            this.lives[this.lives.length - 11].clone(this.lives[3], 0);
            this.lives[this.lives.length - 12].clone(this.lives[3], 0);
            this.lives[this.lives.length - 13].clone(this.lives[4], 0);
            this.lives[this.lives.length - 14].clone(this.lives[4], 0);
            this.lives[this.lives.length - 15].clone(this.lives[5], 0);
        } if (this.lives.length > 20) {         
            this.lives[this.lives.length - 16].clone(this.lives[5], 0);
            this.lives[this.lives.length - 17].clone(this.lives[6], 0);
            this.lives[this.lives.length - 18].clone(this.lives[7], 0);
            this.lives[this.lives.length - 19].clone(this.lives[8], 0);
            this.lives[this.lives.length - 20].clone(this.lives[9], 0);
        }

        //reset
        let newStartingX = 400 + randIntBetween(-100, 100);
        let newStartingY = 300 + randIntBetween(-100, 100);
        for (let life of this.lives){
            life.setPosition(newStartingX, newStartingY);
            life.fitness = 0;   
        }
    }

    //replace this group with a copy of another group
    cloneGroup(clonedGroup){
        for (let i in this.lives){
            this.lives[i].clone(clonedGroup.lives[i]);
        }
    }

    //Genetic flow from between population
    //Best to use right after selection since they're already sorted
    geneFlow(otherGroup, flowRatio = 0.1) {
        for (let i=0; i < this.lives.length * flowRatio; i++) {
            //avoid replacing best % or the Elites that replaced the least fit
            let replaced = randIntBetween(this.lives.length * this.selectionCutoff, this.lives.length - 1)
            let mom = randIntBetween(0, this.lives.length - 1);
            let dad = randIntBetween(0, otherGroup.lives.length - 1);
            //mating between two populations
            this.lives[replaced].mate(this.lives[mom], otherGroup.lives[dad], 0.1);
        }
    }

}

//Helpers
const randIntBetween = (lowNum, highNum) => {
    lowNum = Math.floor(lowNum);
    highNum = Math.floor(highNum);
    return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
}
const total = (nums) => nums.reduce((a, b) => (a + b));
const average = (nums) => total(nums) / nums.length;

export default Group;