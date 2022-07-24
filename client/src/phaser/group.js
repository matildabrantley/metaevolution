import Life from './life';
import Mind from '../neural/mind';
const Phaser = require('phaser');
// const Vector = require('./vector');
const copyDeep = require('lodash.clonedeep');

class Group extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config, tiles, species,
            {pop = 100, mutRate = 0.1 , selectionCutoff = 0.1, maxGenLength = 1500, initialGenLength = 50, deltaGenLength = 5}={}){
        super(world, scene, config);
        this.lives = [];
        this.scene = scene;
        this.world = world;
        this.tiles = tiles;
        this.species = species;
        
        this.mutRate = 0.1;//mutRate;
        this.maxGenLength = maxGenLength;
        this.genLength = initialGenLength;
        this.deltaGenLength = deltaGenLength;
        this.selectionCutoff = selectionCutoff;
        this.numElites = 20;

        this.currentGenTimer = 0;
        this.groupFitness = 0;
        this.bestEverFitness = 0;
        this.bestEverMind = null;
    }

    //maintains array of Life objects and create Minds
    setup() {
        this.lives = this.getChildren();

        this.preySpecies = [];
        this.predatorSpecies = [];

        for (let life of this.lives){
            //Create minds for each life
            const tileVisionInputs = this.species.seesTiles ? 10 : 0;
            life.mind = new Mind(3 + tileVisionInputs, 3);
        }

        //initialize "best" to simply first created for now
        this.best = this.lives[0];
    }

    //normal updating within Phaser's/Matter's loop
    update() {
        this.currentGenTimer++;
        for (let life of this.lives) {

            life.update();
            
            this.updateGroupFitness();
        }

        //New generation if timer is up
        if (this.currentGenTimer >= this.genLength){
           this.selection();
           this.currentGenTimer = 0;
           //stretch out the generation length incrementally until maxed
           if (this.genLength < this.maxGenLength)
            this.genLength += this.deltaGenLength;
        }
    }

    updateGroupFitness(){
        let allFitness = []; //used to calculate average fitness
        for (let life of this.lives){
            allFitness.push(life.fitness);
        }
        this.groupFitness += average(allFitness);

    }

    //generational change in group where fitness is sorted and replacement and mutation occur
    selection() {
        //fitness sorting function in which more fit lives move to front
        this.lives.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);
        //save the best so it can be saved to database when requested or used as ancient elite
        if (this.lives[0].fitness > this.bestEverFitness) {
            this.bestEverFitness = this.lives[0].fitness;
            this.bestEverMind = this.lives[0].getMindCopy();
        }

        //vast majority of population replaced by sexual offspring of top X% (X = selectionCutoff)
        for (let i=this.lives.length-1; i > this.lives.length * this.selectionCutoff; i--) {
            let mom = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            let dad = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            this.lives[i].mate(this.lives[mom], this.lives[dad], this.mutRate);
        }

        //Elite Selection: Best 10 always get spot(s) in next generation with low or no mutation,
                        // with certain matings guaranteed (1st & 2nd, 1st & 3rd, etc).
                        // Ensures genetic diversity in the best performing agents.
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
            this.lives[this.lives.length - 8].mate(this.lives[1], this.lives[2], 0);
            this.lives[this.lives.length - 9].clone(this.lives[2], 0);
            this.lives[this.lives.length - 10].clone(this.lives[3], 0);
        } if (this.lives.length > 15) {         
            this.lives[this.lives.length - 11].clone(this.lives[0], 0.03);
            this.lives[this.lives.length - 12].clone(this.lives[0], 0.05);
            this.lives[this.lives.length - 13].clone(this.lives[1], 0.05);
            this.lives[this.lives.length - 14].clone(this.lives[1], 0.05);
            this.lives[this.lives.length - 15].mate(this.lives[2], this.lives[3], 0);
        } if (this.lives.length > 20) {         
            this.lives[this.lives.length - 16].mate(this.lives[0], this.lives[3], 0);
            this.lives[this.lives.length - 17].mate(this.lives[1], this.lives[3], 0);
            this.lives[this.lives.length - 18].clone(this.lives[5], 0.05);
            this.lives[this.lives.length - 19].clone(this.lives[6], 0.06);
            this.lives[this.lives.length - 20].clone(this.lives[7], 0.07);
        } if (this.lives.length > 25) {         
            this.lives[this.lives.length - 21].mate(this.lives[0], this.lives[1], 0);
            this.lives[this.lives.length - 22].mate(this.lives[0], this.lives[2], 0);
            this.lives[this.lives.length - 23].mate(this.lives[0], this.lives[3], 0);
            this.lives[this.lives.length - 24].mate(this.lives[0], this.lives[4], 0);
            this.lives[this.lives.length - 25].mate(this.lives[1], this.lives[2], 0);
        }
        //Highly mutated version of fittest agent to prevent stagnation
        this.lives[this.lives.length - 26].clone(this.lives[0], 0.8);

        this.lives[this.lives.length - 27].mind = copyDeep(this.bestEverMind);


        let midX = this.scene.scale.displaySize._width / 2;
        let midY = this.scene.scale.displaySize._height / 2;
        //reset
        let newStartingX = midX + randIntBetween(-10, 10);
        let newStartingY = midY + randIntBetween(-10, 10);
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