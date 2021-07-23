const Thing = require('./creature');
const Vector = require('./vector');

class Room {
    constructor(name, floor, rangeSlider, originX, originY, size, pop){

        this.originX = originX;
        this.originY = originY;
        this.maxX = originX + size;
        this.maxY = originY + size;
        this.size = size;

        this.pop = pop; //population
        this.things = new Array(pop);
        for (var c = 0; c < pop; c++)
            this.things[c] = new Thing(this, new Vector(rand(0, size), rand(0, size))); //random positions
    }

    update() {
        for (var c=0; c < this.pop; c++) 
            this.things[c].update();

        this.draw();
        if (worldCount % generationLength == 0){
            this.creatureGenetics();
        }
    }

    draw() {
        //(this.originX, this.originY, this.size, this.size, 10);
    }

    creatureGenetics() {
        //fitness sorting function in which more fit things move to front
        this.things.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);
        this.pop = this.things.length;
    }

}