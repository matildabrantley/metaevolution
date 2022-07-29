import Life from './life';
import Group from './group';

const Phaser = require('phaser');

class Species extends Phaser.Physics.Arcade.Group {
    constructor({world, scene, config, genus=null, tiles, seesTiles = false} = {}, //general config for species and its sub-groups
                {groupSelectionFreq = 40, maxGroupSelectionFreq = 500, deltaSelectionFreq = 20, mutMutRate = 0.12} = {}, groups = []) {
        
        super(world, scene, config);
        this.world = world;
        this.scene = scene;
        this.config = config;
        this.tiles = tiles;
        this.seesTiles = seesTiles;
        this.scene.physics.add.collider(this, tiles);
        this.genus = genus;

        this.groups = groups; //groups can be predefined, but it's better to use createGroup()
        this.globalTimer = 0;
        this.currentCycleTimer = 0;
        this.mingleFreq = 11500;
        this.groupSelectionFreq = groupSelectionFreq;
        this.maxGroupSelectionFreq = maxGroupSelectionFreq;
        this.mutMutRate = mutMutRate;
        this.speciesFitness = 0;
    }
    
    setupSpecies({preySpecies = [], predatorSpecies = []} = {}) {
        //setup tile collisions
        this.scene.physics.add.collider(this, this.tiles);
        
        this.preySpecies = preySpecies;
        this.predatorSpecies = predatorSpecies;

        //setup prey collisions
        preySpecies.forEach(preySpecie => {
            this.scene.physics.add.overlap(this, preySpecie, (predator, prey) => {
                predator.fitness += 10;
            }, null, this.scene);
        })

        //Setup handles Group construction aspects that prefer the entire population exist first
        for (const group of this.groups) {
            group.setup();
        }

        this.allLives = this.getChildren();

        //just initialize "best" group to first group for now
        this.bestGroup = this.groups[0].best;
    }

    //Preferred (and simpler) method to create new groups
    createGroup({sprite, spritesheet, key, firstFrame, scale = 1} = {}, //animation config for all sprites in group
                {pop = 100, mutRate = 0.08, selectionCutoff = 0.1, maxGenLength = 450, initialGenLength = 50, deltaGenLength = 5} = {} //genetic config
        ){

        //Create Group object with general configuration
        const newGroup = new Group(this.world, this.scene, this.config, this.tiles, this,
            {pop, mutRate, selectionCutoff, maxGenLength, initialGenLength, deltaGenLength});

        //Add the population
        let midX = this.scene.scale.displaySize._width / 2;
        let midY = this.scene.scale.displaySize._height / 2;
        for (let i=0; i < pop; i++){
            let life;
            if (spritesheet != null) { //animated sprite provided
                life = new Life(this.scene, midX, midY, {sprite: spritesheet, frame: firstFrame, tiles: this.tiles}, this.seesTiles);
                life.play(key);
            } else if (sprite != null) //static sprite provided
                life = new Life(this.scene, midX, midY, {sprite: sprite, tiles: this.tiles}, this.seesTiles);
              else //no sprite provided, use default sprite
                life = new Life(this.scene, midX, midY, {sprite: 'default', tiles: this.tiles}, this.seesTiles);
            
            life.setScale(scale);
            life.alpha = 0.5;
            // life.body.setAllowGravity(true);
            // life.body.setGravityY(1000);
            
            newGroup.add(life);
            this.add(life); //add to species as well
        } 
        
        //Establish Collision
        //this.scene.physics.add.collider(newGroup, this.tiles);
        //Add group to this species
        this.groups.push(newGroup); //append to this.groups array
        return newGroup;
    }
    addGroup(newGroup){
        this.groups.push(newGroup);
    }

    update(){
        this.globalTimer++;
        this.currentCycleTimer++;

        let allGroupsFitness = []; //used to calculate average group fitness

        //update each group, which will update each life
        for (let group of this.groups) {
            group.update();
            allGroupsFitness.push(group.groupFitness);
        }
        this.speciesFitness = average(allGroupsFitness);
        
        // for (const preySpecie of this.preySpecies) {
        //     this.allLives.forEach(life => {
        //         // life.closestPrey = preySpecie.getClosestTo(life);
        //     })
        // }

        if (this.globalTimer % this.mingleFreq === 0){
            this.mingleAllGroups(0.15);
            if (this.mingleFreq < 500)
                this.mingleFreq+=10;
        }

        if (this.currentCycleTimer >= this.groupSelectionFreq){
            this.groupSelection();
            this.currentCycleTimer = 0;
        }
        
    }

    //selection of the best subpopulations in the species
    groupSelection(){
        //TODO: Compare ancient elite fitness scores and reload an ancient population if better
        this.groups.sort((b, a) => (a.groupFitness > b.groupFitness) ? 1 : -1);

        //migrate genes from more fit groups to less fit groups
        // for (let g=0; g < this.groups.length-1; g++){
        //     this.oneWayMingle(g, g+1);
        //     this.groups[g].mutRate = g/50;
        // }

        //replace worst group with best group
        
        this.groups[this.groups.length-1].cloneGroup(this.groups[0]);
        this.bestGroup = this.groups[0];

        //the lower the fitness, the higher the mutation rate
        for (let g=0; g < this.groups.length - 1; g++){
            this.groups[g].mutRate = g/(this.groups.length*10) + this.mutMutRate; 
            this.groups[g].groupFitness = 0;
        }

        // if (this.bestEverFitness < this.bestGroup){
        //     this.bestEverFitness = copyDeep(this.bestEverMind);
        // } else {
        //     this.groups[this.groups.length-1].cloneGroup(this.bestEverGroup);
        // }
            

        //reset fitness
        for (let group of this.groups)
            group.groupFitness = 0;

        this.currentCycleTimer = 0;
        if (this.groupSelectionFreq + this.deltaSelectionFreq <= this.maxGroupSelectionFreq)
            this.groupSelectionFreq += this.deltaSelectionFreq;
    }

    cloneSpecies(clonedSpecies){
        //Replace each group in a species with another species' groups
        for (let g in this.groups){
            this.groups[g].cloneGroup(clonedSpecies.groups[g]);
        }
    }

    //unidirectional migration (no mating during transfer) of fittest lifeforms
    // migrate(migrantGroupIndex, receivingGroupIndex, flowRate = 0.75){
    //     this.groups[receivingGroupIndex].lives
    // }

    //unidirectional (one-way) gene flow via mating from one group to another
    oneWayMingle(otherGroupIndex, receivingGroupIndex, flowRate = 0.75){
        this.groups[receivingGroupIndex].geneFlow(this.groups[otherGroupIndex], flowRate);
    }

    //bidirectional (two-way) gene flow via mating between group pair
    twoWayMingle(groupOneIndex, groupTwoIndex, flowRate = 0.1){
        this.oneWayMingle(groupOneIndex, groupTwoIndex, flowRate);
        this.oneWayMingle(groupTwoIndex, groupOneIndex, flowRate);
    }

    //two way gene flow via mating between all groups in the species
    mingleAllGroups(flowRate = 0.02)
    {
        //g2 starts at g1+1 each inner loop, avoiding checks for self-mingling
        for (let g1=0; g1 < this.groups.length; g1++)
            for (let g2=g1+1; g2 < this.groups.length; g2++)
                this.twoWayMingle(g1, g2, flowRate);
    }

    addPreySpecies(prey){
        for (let group of this.groups) 
            group.preyGroups.push(prey);
    }
    addPredatorSpecies(predator){
        for (let group of this.groups) 
            group.predatorGroups.push(predator);
    }
}

const total = (nums) => nums.reduce((a, b) => (a + b));
const average = (nums) => total(nums) / nums.length;

export default Species;