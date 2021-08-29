const Group = require('./group');
const Life = require('./life');
const Phaser = require('phaser');

class Species extends Phaser.Physics.Arcade.Group {
    constructor({world, scene, config, tiles} = {}, //general config for species and its sub-groups
                {goals, goalsAreMoving = false, bonusIsRandom = false, groupSelectionFreq = 40, 
                maxGroupSelectionFreq = 500, deltaSelectionFreq = 20} = {}, groups = []) {
        
        super(world, scene, config);
        this.world = world;
        this.scene = scene;
        this.config = config;
        this.tiles = tiles;
        this.scene.physics.add.collider(this, tiles);

        this.goals = goals.getChildren(); //groups will use these if specific goals aren't defined
        this.groups = groups; //groups can be predefined, but it's better to use createGroup()
        this.bonusLength = 1;
        this.bonusGoal = 0;
        this.timer = 0;
        this.mingleFreq = 50000000;
        this.goalsAreMoving = goalsAreMoving;
        this.bonusIsRandom = bonusIsRandom;
        this.groupSelectionFreq = groupSelectionFreq;
        this.maxGroupSelectionFreq = maxGroupSelectionFreq;
        this.speciesFitness = 0;
    }

    //Preferred (and simpler) method to create new groups
    createGroup({spritesheet, key, firstFrame, scale = 1} = {}, //animation config for all sprites in group
                {pop = 100, mutRate = 0.05, selectionCutoff = 0.1, maxGenLength = 250, initialGenLength = 10, deltaGenLength = 5} = {}, //genetic config
                {goals = this.goals, preyGroups, predatorGroups} = {} //fitness config
        ){

        //Create Group object with general configuration
        const newGroup = new Group(this.world, this.scene, this.config, this.tiles, this);
        //Add the population
        for (let i=0; i < pop; i++){
            let life = new Life(this.scene, 300, 400, spritesheet, firstFrame, this.tiles);
            life.setScale(scale);
            life.alpha = 0.5;
            // life.body.setAllowGravity(true);
            // life.body.setGravityY(1000);
            life.play(key);
            newGroup.add(life);
            this.add(life); //add to species as well
        } 
        //Setup handles Group construction aspects that prefer the entire population exist first
        newGroup.setup(pop, mutRate, selectionCutoff, maxGenLength, initialGenLength, deltaGenLength);
        //Establish Collision
        this.scene.physics.add.collider(newGroup, this.tiles);
        //Add group to this species
        this.groups.push(newGroup); //append to this.groups array

        return newGroup;
    }
    addGroup(newGroup){
        this.groups.push(newGroup);
    }

    update(){
        this.timer++;

        let allGroupsFitness = []; //used to calculate average group fitness

        for (let group of this.groups) {
            group.updateWithEngine();
            allGroupsFitness.push(group.groupFitness);
        }
        this.speciesFitness = average(allGroupsFitness);
        
        if (this.timer % this.bonusLength === 0){
            if (this.bonusIsRandom) {
                this.bonusGoal = Math.floor((Math.random() * this.goals.length)); //random goal rotation
            } else {
                this.bonusGoal++;
                if (this.bonusGoal >= this.goals.length)
                    this.bonusGoal = 0;
            }
            //Scale bonus sprite bigger and all others smallers
            for (let g=0; g < this.goals.length; g++)
                g === this.bonusGoal ? this.goals[g].setScale(4) : this.goals[g].setScale(2);
            
            this.bonusLength = Math.floor(this.groups[0].genLength / 2);
        }
        //Move goals around randomly if flag is set true
        if (this.goalsAreMoving){
            if (this.timer % 30 === 0)
                for (let goal of this.goals)
                    goal.setVelocity((Math.random()-0.5) * 200, (Math.random()-0.5) * 200);
            if (this.timer % 90 === 0)
                for (let goal of this.goals)
                    goal.setPosition(200 + Math.random() * 400, 150 + Math.random() * 300);
        }

        if (this.timer % this.mingleFreq === 0){
            this.mingleAllGroups(0.15);
            if (this.mingleFreq < 500)
                this.mingleFreq+=10;
        }

        if (this.timer % this.groupSelectionFreq === 0)
            this.groupSelection();
        
    }

    groupSelection(){
        this.groups.sort((b, a) => (a.groupFitness > b.groupFitness) ? 1 : -1);

        //migrate genes from more fit groups to less fit groups
        // for (let g=0; g < this.groups.length-1; g++){
        //     this.oneWayMingle(g, g+1);
        //     this.groups[g].mutRate = g/50;
        // }

        //replace worst group with best group
        this.groups[this.groups.length-1].cloneGroup(this.groups[0]);

        //the lower the fitness, the higher the mutation rate
        for (let g=0; g < this.groups.length - 1; g++){
            this.groups[g].mutRate = g/(this.groups.length*2) + 0.02; 
            this.groups[g].groupFitness = 0;
        }
        //reset fitness
        for (let group of this.groups)
            group.groupFitness = 0;

        if (this.groupSelectionFreq + this.deltaSelectionFreq <= this.maxGroupSelectionFreq)
            this.groupSelectionFreq += this.deltaSelectionFreq;
    }

    cloneSpecies(clonedSpecies){
        //Replace each group in a species with another species' groups
        for (let g in this.groups){
            this.groups[g].cloneGroup(clonedSpecies.groups[g]);
        }
    }

    //unidirectional migration (no immediate mating) of fittest lifeforms
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

module.exports = Species;