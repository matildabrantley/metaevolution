// const Life = require('./life');
// const Vector = require('./vector');

class Group extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config, goals){
        super(world, scene, config);
        this.lives = [];
        this.scene = scene;
        this.world = world;

        this.timer1 = 0;
        this.genLength = 10;
        this.selectionCutoff = 0.08;
        this.goals = goals.getChildren();

        //for updateFast()
        this.timer2 = 0;
        this.fastGenLength = 50;
    }

    //maintains array of Life objects, sets initial distances from goals and create Minds
    setup() {
        this.lives = this.getChildren();

        for (let life of this.lives){
            life.startingDistFromGoal = new Array(this.goals.length);
            for (let g=0; g < this.goals.length; g++)
                life.startingDistFromGoal[g] = Phaser.Math.Distance.BetweenPoints(life, this.goals[g]);
        
            //Create minds based on number of goals
            life.mind = new Mind(this.goals.length * 2, 2);
        }
    }

    //normal updating within Phaser's/Matter's loop
    updateWithEngine() {
        this.timer1++;
        for (let life of this.lives) {
            if (this.timer1 % 10 == 0){
                for (let goal of this.goals)
                    goal.setVelocity((Math.random()-0.5) * 700, (Math.random()-0.5) * 700);
            }

            life.update(this.goals);

            //Better for fitness to be managed by group for many reasons
            let distScores = [];
            for (let goal of this.goals)
                distScores.push(life.startingDistFromGoal / (Phaser.Math.Distance.BetweenPoints(life, goal) + 1));
            //use reducer to get total product (and divide by 1000 to keep values manageable)
            life.fitness += distScores.reduce((a,b) => a*b, 1) / 1000;
        }

        if (this.timer1 % this.genLength == 0){
           this.selection();
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
        if (this.genLength < 500)
            this.genLength += 5;
        this.timer1 = 0;

        //fitness sorting function in which more fit lives move to front
        this.lives.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);

        //vast majority of population replaced by sexual offspring of top X% (X = selectionCutoff)
        for (let i=this.lives.length-1; i > this.lives.length * this.selectionCutoff; i--) {
            let mom = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            let dad = Math.floor(Math.random() * Math.floor(this.lives.length * this.selectionCutoff));
            this.lives[i].mind.cluster.sexual(this.lives[mom].mind.cluster, this.lives[dad].mind.cluster, 0.05);
        }

        //Elite Selection: Best 10 always get spot(s) in next generation without mutation
        if (this.lives.length > 3) { //two clones of 1st and one clone of 2nd
            this.lives[this.lives.length - 1].mind.cluster.asexual(this.lives[0].mind.cluster, 0);
            this.lives[this.lives.length - 2].mind.cluster.asexual(this.lives[0].mind.cluster, 0);
            this.lives[this.lives.length - 3].mind.cluster.asexual(this.lives[1].mind.cluster, 0);
        } if (this.lives.length > 6) { //three children of mating 1st/2nd
            this.lives[this.lives.length - 4].mind.cluster.sexual(this.lives[0].mind.cluster, this.lives[1].mind.cluster, 0);
            this.lives[this.lives.length - 5].mind.cluster.sexual(this.lives[0].mind.cluster, this.lives[1].mind.cluster, 0);
            this.lives[this.lives.length - 6].mind.cluster.sexual(this.lives[0].mind.cluster, this.lives[1].mind.cluster, 0);
        } if (this.lives.length > 10) {   //mating between 1st/3rd and 2nd/3rd, and clones of 3rd and 4th      
            this.lives[this.lives.length - 7].mind.cluster.sexual(this.lives[0].mind.cluster, this.lives[2].mind.cluster, 0);
            this.lives[this.lives.length - 7].mind.cluster.sexual(this.lives[1].mind.cluster, this.lives[2].mind.cluster, 0);
            this.lives[this.lives.length - 9].mind.cluster.asexual(this.lives[2].mind.cluster, 0);
            this.lives[this.lives.length - 10].mind.cluster.asexual(this.lives[3].mind.cluster, 0);
        } if (this.lives.length > 15) {         
            this.lives[this.lives.length - 11].mind.cluster.asexual(this.lives[3].mind.cluster, 0);
            this.lives[this.lives.length - 12].mind.cluster.asexual(this.lives[3].mind.cluster, 0);
            this.lives[this.lives.length - 13].mind.cluster.asexual(this.lives[4].mind.cluster, 0);
            this.lives[this.lives.length - 14].mind.cluster.asexual(this.lives[4].mind.cluster, 0);
            this.lives[this.lives.length - 15].mind.cluster.asexual(this.lives[5].mind.cluster, 0);
        } if (this.lives.length > 20) {         
            this.lives[this.lives.length - 16].mind.cluster.asexual(this.lives[5].mind.cluster, 0);
            this.lives[this.lives.length - 17].mind.cluster.asexual(this.lives[6].mind.cluster, 0);
            this.lives[this.lives.length - 18].mind.cluster.asexual(this.lives[7].mind.cluster, 0);
            this.lives[this.lives.length - 19].mind.cluster.asexual(this.lives[8].mind.cluster, 0);
            this.lives[this.lives.length - 20].mind.cluster.asexual(this.lives[9].mind.cluster, 0);
        }

        //reset
        let newStartingX = 200 + Math.random() * 400;
        let newStartingY = 150 + Math.random() * 300;
        for (let life of this.lives){
            life.setPosition(newStartingX, newStartingY);
            for (let goal of this.goals)
                goal.setPosition(200 + Math.random() * 400, 150 + Math.random() * 300);

            for (let g=0; g < this.goals.length; g++)
                life.startingDistFromGoal[g] = Phaser.Math.Distance.BetweenPoints(life, this.goals[g]);

            life.fitness = 0;
            
        }
       
    }

}