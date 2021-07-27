// const Life = require('./life');
// const Vector = require('./vector');

class Group {
    constructor(bodies){
        this.lifeforms = new Array(bodies.length);
        //pass each body to a different creature
        for (let i = 0; i < this.lifeforms.length; i++)
            this.lifeforms[i] = new Life(bodies[i]); 
        this.groupTimer = 0;
        this.generationLength = 100;
    }

    updateAll() {
        this.groupTimer++;
        for (let i=0; i < this.lifeforms.length; i++) 
            this.lifeforms[i].update();

        if (this.groupTimer % this.generationLength == 0){
           this.individualGenetics();
        }
    }

    individualGenetics() {
        //fitness sorting function in which more fit lifeforms move to front
        this.lifeforms.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);
        
        // for (let i in this.lifeforms) {
        //     lifeforms[i].mutate((i+1) / this.lifeforms.length);
        //     lifeforms[i].fitness = 0;
        // }

        for (let i in this.lifeforms)
            this.lifeforms[i].body.setPosition(40 * i + 20, 40 * i + 20);

        this.lifeforms[this.lifeforms.length - 1].mind.cluster.replaceAndMutate(this.lifeforms[0].mind.cluster, 0.1);
        this.lifeforms[this.lifeforms.length - 2].mind.cluster.replaceAndMutate(this.lifeforms[0].mind.cluster, 0.15);
        this.lifeforms[this.lifeforms.length - 3].mind.cluster.replaceAndMutate(this.lifeforms[0].mind.cluster, 0.2);
        this.lifeforms[this.lifeforms.length - 4].mind.cluster.replaceAndMutate(this.lifeforms[1].mind.cluster, 0.15);
        this.lifeforms[this.lifeforms.length - 5].mind.cluster.replaceAndMutate(this.lifeforms[1].mind.cluster, 0.2);
        this.lifeforms[this.lifeforms.length - 6].mind.cluster.replaceAndMutate(this.lifeforms[2].mind.cluster, 0.2);
    }

}