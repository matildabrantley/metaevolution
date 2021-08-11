class Species {
    constructor(goals, groups = []){
        this.defaultGoals = goals; //groups will use these if specific goals aren't defined
        this.groups = groups; //groups can be predefined, but it's better to use createGroup()
    }

    update(){
        for (let group of this.groups)
            group.updateWithEngine();
    }

    //Preferred (and simpler) method to create new groups
    createGroup({world, scene, config, goals = this.defaultGoals} = {}, //general config for group
        {spritesheet, key, firstFrame, scale = 1} = {}, //animation config for all sprites in group
        {pop = 100, mutRate = 0.05, selectionCutoff = 0.1, maxGenLength = 500, initialGenLength = 10, deltaGenLength = 5} = {} //genetic config
        ){

        //Create Group object with general configuration
        const newGroup = new Group(world, scene, config, goals);
        //Add the population
        for (let i=0; i < pop; i++){
            let life = new Life(scene, 300, 400, spritesheet, firstFrame);
            life.play(key);
            newGroup.add(life);
        } 
        //Setup handles Group construction aspects that prefer the entire population exist first
        newGroup.setup(mutRate, selectionCutoff, maxGenLength, initialGenLength, deltaGenLength);
        this.groups.push(newGroup);
    }

    addGroup(newGroup){
        groups.push(newGroup);
    }
}