const Creature = require('./creature');
const Vector = require('./vector');

class Room {
    constructor(name, floor, rangeSlider, originX, originY, size, pop){
        //range slider in controls
        this.rangeSlider = rangeSlider;

        this.originX = originX;
        this.originY = originY;
        this.maxX = originX + size;
        this.maxY = originY + size;
        this.size = size;

        this.pop = pop; //population
        this.creatures = new Array(pop);
        // for (var c = 0; c < pop; c++)
        //     this.creatures[c] = new Creature(this, new Vector(rand(0, size), rand(0, size))); //random positions
        this.creatures[0] = new Creature(this, new Vector(rand(0, size), rand(0, size)), 0x0000ff); //random positions
        this.creatures[1] = new Creature(this, new Vector(rand(0, size), rand(0, size))); //random positions
    }

    update() {
        for (var c=0; c < this.pop; c++) 
            this.creatures[c].update();

        this.draw();
        //TODO: Fix genetic algorithm
        if (frameCount % generationLength == 0){
            // this.genetics();
            this.creatures[0].mutate(1);
        }
    }

    draw() {
        // graphics.lineStyle(2, 0x800000); 
        // //graphics.beginFill(0xff0000);
        // graphics.drawRoundedRect(this.originX, this.originY, this.size, this.size, 10);
        // graphics.endFill();
    }

    //TODO: Debug genetic algorithm
    genetics() {
        //fitness sorting, more fit creatures move to front
        this.creatures.sort((b, a) => (a.fitness > b.fitness) ? 1 : -1);

        this.pop = this.creatures.length;
    }

}