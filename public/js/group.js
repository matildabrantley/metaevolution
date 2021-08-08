// const Life = require('./life');
// const Vector = require('./vector');

class Group extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config, goal){
        super(world, scene, config);


        // this.lifeforms = new Array(bodies.length);
        // //pass each body to a different creature
        // for (let i = 0; i < this.lifeforms.length; i++){
        //     this.lifeforms[i] = new Life(bodies[i]); 
        //     this.lifeforms[i].startingDistFromGoal = Phaser.Math.Distance.BetweenPoints(goal, bodies[i]);
        // }
        this.timer1 = 0;
        this.genLength = 150;
        this.goal = goal;

        //for updateFast()
        this.timer2 = 0;
        this.fastGenLength = 50;
    }

    //normal updating within Phaser's/Matter's loop
    updateWithEngine() {
        this.timer1++;
        // for (let life of this.lifeforms) {
        //     life.updateWithEngine(this.goal);
        //     //Better for fitness to be managed by group for many reasons
        //     life.fitness += Phaser.Math.Distance.BetweenPoints(this.goal, life.body) / (life.startingDistFromGoal + 1);
        //     let a = 1;
        // }

        this.children.each(function(life) {
            life.update(this.goal);
        }, this);
     

        if (this.timer1 % this.genLength == 0){
           this.selection();
        }
    }

    //simplified fast updating without a framework/renderer/engine, and very limited physics
    async updateFast() {
        this.timer2++;
        for (let i=0; i < this.lifeforms.length; i++) 
            this.lifeforms[i].updateFast();

        if (this.timer2 % this.fastGenLength == 0){
            this.selection();
        }
    }

    //generational change in group where fitness is sorted and replacement and mutation occur
    selection() {
        //fitness sorting function in which more fit lifeforms move to front
        this.lifeforms.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);
        
        // for (let i in this.lifeforms) {
        //     lifeforms[i].mutate((i+1) / this.lifeforms.length);
        //     lifeforms[i].fitness = 0;
        // }

        for (let i in this.lifeforms)
            this.lifeforms[i].body.setPosition(250, 250);

        this.lifeforms[this.lifeforms.length - 1].mind.cluster.replaceAndMutate(this.lifeforms[0].mind.cluster, 0.1);
        this.lifeforms[this.lifeforms.length - 2].mind.cluster.replaceAndMutate(this.lifeforms[0].mind.cluster, 0.15);
        this.lifeforms[this.lifeforms.length - 3].mind.cluster.replaceAndMutate(this.lifeforms[0].mind.cluster, 0.2);
        this.lifeforms[this.lifeforms.length - 4].mind.cluster.replaceAndMutate(this.lifeforms[1].mind.cluster, 0.15);
        this.lifeforms[this.lifeforms.length - 5].mind.cluster.replaceAndMutate(this.lifeforms[1].mind.cluster, 0.2);
        this.lifeforms[this.lifeforms.length - 6].mind.cluster.replaceAndMutate(this.lifeforms[2].mind.cluster, 0.2);
    }

}