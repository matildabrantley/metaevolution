const Net = require('./net');

class Creature {
    constructor(room, vector, color = 0xffffff){
        this.room = room;
        this.color = color;
        this.position = vector.getCopy();
        this.velocity = new Vector(0, 0, -3, 3);
        this.accel = new Vector(0, 0, -0.1, 0.1);
        //Basic Feedforward NN
        this.net = new Net(2, 5, 2);
    }

    draw() {
        //(this.position.x + this.room.originX, this.position.y + this.room.originY, 1);
    }

    update() {
        //console.log(this.network);

        //get this room's size and its red dot
        var roomSize = this.room.size;
        var redDot = this.room.redDot; 
        
        //normalize positions by room size (for NN inputs)
        var input = [1,1];
        var output = this.net.activate(input);

        //the vector to be changed by output, such as velocity or accel
        var changing = this.velocity; 

        //update creature's acceleration from output
        changing.x = output[0] - 0.5;
        changing.y = output[1] - 0.5;
        

        // find intended output so NN can learn
        var intendedX = this.position.x > redDot.position.x ? 0 : 1;
        var intendedY = this.position.y > redDot.position.y ? 0 : 1;
        var intendedOutput = [intendedX, intendedY];
        //console.log("intendedOutput");
        //console.log(intendedOutput);

        //add acceleration to velocity
        //this.velocity.add(this.accel);
        //add velocity to position
        this.position.add(this.velocity);

        //out of bounds check
        // var rebound = 5;
        // if (this.position.x > this.room.size-rebound){
        //     this.velocity.x = -this.velocity.x;
        //     this.position.x -= rebound;
        // }
        // if (this.position.y > this.room.size-rebound){
        //     this.velocity.y = -this.velocity.y;
        //     this.position.y -= rebound;
        // }
        // if (this.position.x < rebound){
        //     this.velocity.x  = -this.velocity.x;
        //     this.position.x += rebound;
        // }
        // if (this.position.y < rebound){
        //     this.velocity.y = -this.velocity.y;
        //     this.position.y += rebound;
        }

        this.draw();
    }

    replace() {}
}

module.exports = Creature;