// const Life = require('./life');
// const Vector = require('./vector');

class Group extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config, goal){
        super(world, scene, config);
        this.lives = [];
        this.scene = scene;

        // this.lives = new Array(bodies.length);
        // //pass each body to a different creature
        // for (let i = 0; i < this.lives.length; i++){
        //     this.lives[i] = new Life(bodies[i]); 
        //     this.lives[i].startingDistFromGoal = Phaser.Math.Distance.BetweenPoints(goal, bodies[i]);
        // }
        this.timer1 = 0;
        this.genLength = 150;
        this.goal = goal;

        //for updateFast()
        this.timer2 = 0;
        this.fastGenLength = 50;
    }

    //maintains array of easily accessible Life objects
    simplify() {
        this.lives = this.getChildren();
    }

    //normal updating within Phaser's/Matter's loop
    updateWithEngine() {
        this.timer1++;
        for (let life of this.lives) {
            life.update(this.goal);
            //Better for fitness to be managed by group for many reasons
            life.fitness += life.x;
            life.fitness += life.y;
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
        //fitness sorting function in which more fit lives move to front
        this.lives.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);
        
        for (let i=this.lives.length-1; i > this.lives.length * 0.1; i--) {
            let moreFit = Math.floor(Math.random() * Math.floor(this.lives.length * 0.1));
            this.lives[i].mind.cluster.replaceAndMutate(this.lives[moreFit].mind.cluster, 0.1);
        }

        //reset
        for (let i in this.lives){
            this.lives[i].setPosition(250, 250);
            this.lives[i].fitness = 0;
        }

        this.lives[this.lives.length - 1].mind.cluster.replaceAndMutate(this.lives[0].mind.cluster, 0.1);
        this.lives[this.lives.length - 2].mind.cluster.replaceAndMutate(this.lives[0].mind.cluster, 0.15);
        this.lives[this.lives.length - 3].mind.cluster.replaceAndMutate(this.lives[0].mind.cluster, 0.2);
        this.lives[this.lives.length - 4].mind.cluster.replaceAndMutate(this.lives[1].mind.cluster, 0.15);
        this.lives[this.lives.length - 5].mind.cluster.replaceAndMutate(this.lives[1].mind.cluster, 0.2);
        this.lives[this.lives.length - 6].mind.cluster.replaceAndMutate(this.lives[2].mind.cluster, 0.2);
    }

}