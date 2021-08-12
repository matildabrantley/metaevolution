class Species {
    constructor({goals, goalsAreMoving = false, bonusIsRandom = false} = {}, groups = []){
        this.goals = goals.getChildren(); //groups will use these if specific goals aren't defined
        this.groups = groups; //groups can be predefined, but it's better to use createGroup()
        this.bonusLength = 1;
        this.bonusGoal = 0;
        this.timer = 0;
        this.mingleFreq = 30;
        this.goalsAreMoving = goalsAreMoving;
        this.bonusIsRandom = bonusIsRandom;
    }

    //Preferred (and simpler) method to create new groups
    createGroup({world, scene, config, goals = this.goals} = {}, //general config for group
        {spritesheet, key, firstFrame, scale = 1} = {}, //animation config for all sprites in group
        {pop = 100, mutRate = 0.05, selectionCutoff = 0.1, maxGenLength = 250, initialGenLength = 10, deltaGenLength = 5} = {} //genetic config
        ){

        //Create Group object with general configuration
        const newGroup = new Group(world, scene, config, this);
        //Add the population
        for (let i=0; i < pop; i++){
            let life = new Life(scene, 300, 400, spritesheet, firstFrame);
            life.play(key);
            newGroup.add(life);
        } 
        //Setup handles Group construction aspects that prefer the entire population exist first
        newGroup.setup(pop, mutRate, selectionCutoff, maxGenLength, initialGenLength, deltaGenLength);
        //Add group to this species
        this.groups.push(newGroup);
    }
    addGroup(newGroup){
        groups.push(newGroup);
    }

    update(){
        this.timer++;
        for (let group of this.groups)
            group.updateWithEngine();
        
        if (this.timer % this.bonusLength == 0){
            if (this.bonusIsRandom) {
                this.bonusGoal = Math.floor((Math.random() * this.goals.length)); //random goal rotation
            } else {
                this.bonusGoal++;
                if (this.bonusGoal >= this.goals.length)
                    this.bonusGoal = 0;
            }
            //Scale bonus sprite bigger and all others smallers
            for (let g=0; g < this.goals.length; g++)
                g == this.bonusGoal ? this.goals[g].setScale(6) : this.goals[g].setScale(4);
            
            this.bonusLength = Math.floor(this.groups[0].genLength / 3);
        }
        //Move goals around randomly if flag is set true
        if (this.movingGoals)
            for (let goal of this.goals)
                goal.setPosition(200 + Math.random() * 400, 150 + Math.random() * 300);



        if (this.timer % this.mingleFreq == 0)
            this.mingleAllGroups(0.05);
    }

    //unidirectional (one-way) gene flow from one group to another
    migrateGroup(migrantGroupIndex, receivingGroupIndex, flowRate = 0.1){
        this.groups[receivingGroupIndex].geneFlow(this.groups[migrantGroupIndex], flowRate);
    }

    //bidirectional (two-way) gene flow between group pair
    mingleGroups(groupOneIndex, groupTwoIndex, flowRate = 0.1){
        this.migrateGroup(groupOneIndex, groupTwoIndex, flowRate);
        this.migrateGroup(groupTwoIndex, groupOneIndex, flowRate);
    }

    //two way gene flow between all groups in the species
    mingleAllGroups(flowRate = 0.02)
    {
        //g2 starts at g1+1 each inner loop, avoiding checks for self-mingling
        for (let g1=0; g1 < this.groups.length; g1++)
            for (let g2=g1+1; g2 < this.groups.length; g2++)
                this.mingleGroups(g1, g2, flowRate);
    }




}