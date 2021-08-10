// const Life = require('./life');
// const Vector = require('./vector');

class Species extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config, goals, isKey = false){
        super(world, scene, config);
        this.lives = [];
        this.scene = scene;
        this.world = world;

        this.timer1 = 0;
        this.goals = goals.getChildren();
        this.bonusLength = 1;
        this.bonusGoal = 0;
        this.isKey = isKey;

        //for updateFast()
        this.timer2 = 0;
        this.fastGenLength = 50;
    }

    //maintains array of Life objects, sets initial distances from goals and create Minds
    setup(mutRate = 0.05, selectionCutoff = 0.1, maxGenLength = 500, initialGenLength = 10, deltaGenLength = 5) {
        this.lives = this.getChildren();

        this.mutRate = mutRate;
        this.maxGenLength = maxGenLength;
        this.genLength = initialGenLength;
        this.deltaGenLength = deltaGenLength;
        this.selectionCutoff = selectionCutoff;


        for (let life of this.lives){
            life.startingDistFromGoal = new Array(this.goals.length);
            for (let g=0; g < this.goals.length; g++)
                life.startingDistFromGoal[g] = Phaser.Math.Distance.BetweenPoints(life, this.goals[g]);
        
            //Create minds based on number of goals
            life.mind = new Mind(this.goals.length * 3, 3);
        }
    }

    //normal updating within Phaser's/Matter's loop
    updateWithEngine() {
        this.timer1++;
        for (let life of this.lives) {
            //if (this.timer1 % 10 == 0){
                //for (let goal of this.goals)
                    //goal.setVelocity((Math.random()-0.5) * 700, (Math.random()-0.5) * 700);
            //}

            life.update(this.goals, this.bonusGoal);

            //Fitness to be managed by species
            let distScores = [];
            for (let g=0; g < this.goals.length; g++){
                let newScore = life.startingDistFromGoal[g] / (Phaser.Math.Distance.BetweenPoints(life, this.goals[g]) + 1);
                if (g == this.bonusGoal){
                    newScore *= 2.5; 
                    this.goals[g].setScale(6);
                }
                else {
                    newScore *= 1;
                    this.goals[g].setScale(4);
                }
                    
                distScores.push(newScore);
            }
            //use reducer to get total product (and divide by 1000 to keep values manageable)
            life.fitness += distScores.reduce((a,b) => a+b, 1) / 1000;
        }

        if (this.timer1 % this.genLength == 0){
           this.selection();
        }
        if (this.timer1 % this.bonusLength == 0){
           this.bonusGoal = Math.floor((Math.random() * this.goals.length));
        }
    }

    //simplified fast updating without a framework/renderer/engine, and very limited physics
    async updateFast() {
        this.timer2++;
        for (let i=0; i < this.lives.length; i++) 
            this.lives[i].updateFast();

        if (this.timer2 % this.fastGenLength == 0){
            this.selection();
        }
    }

    //generational change in group where fitness is sorted and replacement and mutation occur
    selection() {
        if (this.genLength < this.maxGenLength)
            this.genLength += this.deltaGenLength;
        this.timer1 = 0;

        this.bonusLength = Math.floor(this.genLength / 10);

        //fitness sorting function in which more fit lives move to front
        this.lives.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);

        //vast majority of population replaced by sexual offspring of top X% (X = selectionCutoff)
        for (let i=this.lives.length-1; i > this.lives.length * this.selectionCutoff; i--) {
            let mom = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            let dad = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            this.lives[i].mind.net.sexual(this.lives[mom].mind.net, this.lives[dad].mind.net, this.mutRate);
        }

        //Elite Selection: Best 10 always get spot(s) in next generation without mutation
        if (this.lives.length > 3) { //two clones of 1st and one clone of 2nd
            this.lives[this.lives.length - 1].mind.net.asexual(this.lives[0].mind.net, 0);
            this.lives[this.lives.length - 2].mind.net.asexual(this.lives[0].mind.net, 0);
            this.lives[this.lives.length - 3].mind.net.asexual(this.lives[1].mind.net, 0);
        } if (this.lives.length > 6) { //three children of mating 1st/2nd
            this.lives[this.lives.length - 4].mind.net.sexual(this.lives[0].mind.net, this.lives[1].mind.net, 0);
            this.lives[this.lives.length - 5].mind.net.sexual(this.lives[0].mind.net, this.lives[1].mind.net, 0);
            this.lives[this.lives.length - 6].mind.net.sexual(this.lives[0].mind.net, this.lives[1].mind.net, 0);
        } if (this.lives.length > 10) {   //mating between 1st/3rd and 2nd/3rd, and clones of 3rd and 4th      
            this.lives[this.lives.length - 7].mind.net.sexual(this.lives[0].mind.net, this.lives[2].mind.net, 0);
            this.lives[this.lives.length - 7].mind.net.sexual(this.lives[1].mind.net, this.lives[2].mind.net, 0);
            this.lives[this.lives.length - 9].mind.net.asexual(this.lives[2].mind.net, 0);
            this.lives[this.lives.length - 10].mind.net.asexual(this.lives[3].mind.net, 0);
        } if (this.lives.length > 15) {         
            this.lives[this.lives.length - 11].mind.net.asexual(this.lives[3].mind.net, 0);
            this.lives[this.lives.length - 12].mind.net.asexual(this.lives[3].mind.net, 0);
            this.lives[this.lives.length - 13].mind.net.asexual(this.lives[4].mind.net, 0);
            this.lives[this.lives.length - 14].mind.net.asexual(this.lives[4].mind.net, 0);
            this.lives[this.lives.length - 15].mind.net.asexual(this.lives[5].mind.net, 0);
        } if (this.lives.length > 20) {         
            this.lives[this.lives.length - 16].mind.net.asexual(this.lives[5].mind.net, 0);
            this.lives[this.lives.length - 17].mind.net.asexual(this.lives[6].mind.net, 0);
            this.lives[this.lives.length - 18].mind.net.asexual(this.lives[7].mind.net, 0);
            this.lives[this.lives.length - 19].mind.net.asexual(this.lives[8].mind.net, 0);
            this.lives[this.lives.length - 20].mind.net.asexual(this.lives[9].mind.net, 0);
        }

        //key species controls goals
        // if (this.isKey){
        //     for (let goal of this.goals)
        //         goal.setPosition(200 + Math.random() * 400, 150 + Math.random() * 300);
        // }

        //reset
        let newStartingX = 400;
        let newStartingY = 300;
        for (let life of this.lives){
            life.setPosition(newStartingX, newStartingY);

            for (let g=0; g < this.goals.length; g++)
                life.startingDistFromGoal[g] = Phaser.Math.Distance.BetweenPoints(life, this.goals[g]);

            life.fitness = 0;
            
        }
    }

    geneFlow(otherPopulation, flowRatio = 0.1) {
        this.lives.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);

        for (let i=this.lives.length-1; i > this.lives.length * flowRatio; i--) {

        }
    }

}