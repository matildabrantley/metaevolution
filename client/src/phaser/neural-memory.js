/*Summary:
Neural Memory is an external memory block connected to the inputs and outputs of a Net.
NNs evolved instead of trained with gradient descent can use arbitrary I/O at any place
in the network (provided consistency across generations).

Originally designed to be a form of Random Access Memory to read/write values for each Net, 
it's been updated to read/write whole vectors (or all intersecting vectors). This is because
neural networks aren't so great at reading from/writing to highly specific addresses.

Features:
-Memory block is an n-dimensional cube (any dimensions of the same length).
-Inputs from linked Net are used to target vectors in read/write operations.
-Various mathematical operations can be performed along with a scalar.
-Gradients can be passed to emphasize parts of a vector.
-Supports up to 8 dimensions currently.

Note: the reasoning behind an n-cube is gradual evolutionary change with learned neural patterns.

Example: 
If neural inputs (the Net's outputs) are all in middle of allowed range (such as ~0 when -1 to 1) 
with 3x3 memory, the second (middle) vectors will be targeted. If the memory grows to 3x3x3 then 
existing patterns will still make sense while new patterns can grow naturally with extra memory. 
Likewise, growing to 5x5 instead of adding dimensions also allows for existing patterns to still
work with just a little bit of adjustment.
*/

class NeuralMemory {
    constructor (numDimensions, width) {
        this.numDimensions = numDimensions;
        this.width = width;
        this.memory = buildNDimensionalCube(numDimensions);
        //an input for each dimension's index and one for scalar, gradient, and operation
        this.writeInputs = new Array(numDimensions + 3);
        this.readInputs = new Array(numDimensions + 1);
    }

    //builds and returns multidimensional array with n-cube shape (n dimensions with equal width i.e. square, cube, tesseract..)
    buildNDimensionalCube(numDimensions) {
        //Equal width dimensions preferred due to the way the network reads and writes vectors in dynamic memory
        //and how the memory capacity grows through generations during evolution. 
        //In other words, complete symmetry is favorable.
        if (numDimensions > 1) {
            let arr = new Array();
            for (let i = 0; i < this.width; i++) {
                //recursively build lower dimensions
                arr[i] = this.buildNDimensionalCube(numDimensions - 1);
            }
            return arr;
         } else {
            return new Array(this.width).fill(0);
         }
    }

    write(inputs){
        let point = new Array(this.numDimensions);
        let index = 0;
        for (; index < this.numDimensions; index++) 
            point[index] = inputs[index];
        let scalar = inputs[index++];
        let operation = inputs[index++];
        //TODO: add gradient
        //let gradient = inputs[index++];

        //At this point, memory can be updated in a variety of ways
        //1. Overwrite a specific element
        //2. Scale a specific element
        //3. Scale a vector
        //4. Scale intersecting vectors (the one being used below, as its the most nonlinear)
        this.scaleIntersectingVectors(point, scalar, operation);  
    }

    read(inputs){
        // let point = new Array(this.numDimensions);
        // let index = 0;
        // for (; index < this.numDimensions; index++) {
        //     point[index] = inputs[index];
        // }

        //for now just pass in inputs as the point
        //sum up intersecting vectors and tanh each element
        return this.tanhVector(this.getVectorSumAtIntersection(inputs));
    }

    // *** Basic Vector Operations *** 
    // ** Scalar Vector Operations **
    //return sum of a vector with scalar
    addVector(vector, scalar) {
        for (let i = 0; i < vector.length; i++)
            vector[i] = vector[i] + scalar;
        return vector;
    }
    //return difference of a vector and scalar
    subtractVector(vector, scalar) {
        for (let i = 0; i < vector.length; i++)
            vector[i] = vector[i] - scalar;
        return vector;
    }
    //return product of a vector and scalar
    multiplyVector(vector, scalar) {
        for (let i = 0; i < vector.length; i++)
            vector[i] = vector[i] * scalar;
        return vector;
    }
    //return quotient of a vector and scalar
    divideVector(vector, scalar) {
        for (let i = 0; i < vector.length; i++)
            vector[i] = vector[i] / scalar;
        return vector;
    }

    // ** Two Vector Operations **
    // return sum of two vectors
    addTwoVectors(vector1, vector2) {
        for (let i = 0; i < vector1.length; i++) 
            vector1[i] = vector1[i] + vector2[i];
        return vector1;
    }
    //return difference of two vectors
    subtractTwoVectors(vector1, vector2) {
        for (let i = 0; i < vector1.length; i++)
            vector1[i] = vector1[i] - vector2[i];
        return vector1;
    }
    //return product of two vectors
    multiplyTwoVectors(vector1, vector2) {
        for (let i = 0; i < vector1.length; i++)
            vector1[i] = vector1[i] * vector2[i];
        return vector1;
    }
    //return quotient of two vectors
    divideTwoVectors(vector1, vector2) {
        for (let i = 0; i < vector1.length; i++)
            vector1[i] = vector1[i] / vector2[i];
        return vector1;
    }

    // ** Other Vector Operations **
    //tanh, zero-centered curve, applied to each element
    tanhVector(vector, base=3) {
        for (let i = 0; i < vector.length; i++)
            vector[i] = 2 / (1 + Math.pow(base, -vector[i])) - 1;
        return vector;
    }
    //returns sum of many vectors
    addArrayOfVectors(vectors) {
        //return first vector (array) if only one
        if (vectors.length == 1) 
            return vectors[0];
        let sum = new Array(this.width).fill(0);
        for (let i = 1; i < vectors.length; i++) 
            for (let j = 0; j < this.width; j++)
                sum[j] = vectors[i-1][j] + vectors[i][j];

        return sum;
    }

    //returns average of many vectors
    averageArrayOfVectors(vectors) {
        return this.divideVector(this.addArrayOfVectors(vectors), vectors.length);
    }

    //get a vector that's the sum of all vectors intersecting that point in the n-cube
    getVectorSumAtIntersection(point) { //point is an array of length numDimensions containing indices
        let vectors = new Array(this.numDimensions);
        //Add up all vectors intersecting the point
        for (let i = 0; i < this.numDimensions; i++) 
            vectors.push(this.getVectorInMemory(point, i));
        return this.addArrayOfVectors(vectors);
    }

    //scales 1D slice of n-dimensional memory by the operation and scalar.
    scaleVectorInMemory(point, direction, operation, scalar, gradient=0) {
        let v = this.getVectorInMemory(point, direction);
        for (let i=0; i < this.width; i++) {
            let distanceFactor; //distance from point in current dimension (direction)
            switch (operation) {
                case 0:
                    v[i] = v[i] * scalar;
                    break;
                case 1:
                    v[i] = v[i] + scalar;
                    break;
                case 2:
                    v[i] = v[i] - scalar;
                    break;
                case 3:
                    v[i] = v[i] / scalar;
                    break;
            }
        }
        this.setVectorInMemory(point, direction, v);
    }

    scaleIntersectingVectors(point, operation, scalar) {
        //scale intersecting vectors for each dimension
        for (let i = 0; i < this.numDimensions; i++) 
            this.scaleVectorInMemory(point, i, operation, scalar);
    }

    //get a vector that's a 1D slice from any direction of the n-cube (row, column, etc.)
    //by passing a point inside desired vector and direction of the slice
    getVectorInMemory(point, direction) { //point is an array of length numDimensions containing indices
        let v = Array(this.width);

        //Up to 8 dimensions supported
        //these nested switches are a mess right now, but it's quite fast
        //need a solution with less repetitive code and scalable dimensions, 
        //so something recursive or perhaps a different data structure
        //the difficulty is needing to get a vector from any slice for all possible dimensionalities
        switch(this.numDimensions) {
            case 1:
                v = this.memory;
                break;
            case 2:
                //2D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0: 
                            v[i] = this.memory[i][point[1]];
                            break;
                        case 1:
                            v[i] = this.memory[point[0]][i];
                            break;
                    }
                break;
            case 3:
                //3D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            v[i] = this.memory[i][point[1]][point[2]];
                            break;
                        case 1:
                            v[i] = this.memory[point[0]][i][point[2]];
                            break;
                        case 2:
                            v[i] = this.memory[point[0]][point[1]][i];
                            break;
                    }
            case 4:
                //4D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            v[i] = this.memory[i][point[1]][point[2]][point[3]];
                            break;
                        case 1:
                            v[i] = this.memory[point[0]][i][point[2]][point[3]];
                            break;
                        case 2:
                            v[i] = this.memory[point[0]][point[1]][i][point[3]];
                            break;
                        case 3:
                            v[i] = this.memory[point[0]][point[1]][point[2]][i];
                            break;
                    }
                break;
            case 5:
                //5D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]];
                            break;
                        case 1:
                            v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]];
                            break;
                        case 2:
                            v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]];
                            break;
                        case 3:
                            v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]];
                            break;
                        case 4:
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i];
                            break;
                    }
                break;
            case 6:
                //6D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]];
                            break;
                        case 1:
                            v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]];
                            break;
                        case 2:
                            v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]];
                            break;
                        case 3:
                            v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]];
                            break;
                        case 4:
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]];
                            break;
                        case 5:
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i];
                            break;
                    }
                break;
            case 7:
                //7D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]];
                            break;
                        case 1: 
                            v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]];
                            break;
                        case 2:
                            v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]];
                            break;
                        case 3:
                            v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]];
                            break;
                        case 4:
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]];
                            break;
                        case 5:
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]];
                            break;
                        case 6:
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i];
                            break;
                    }
                break;
            case 8:
                //8D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                                v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]];
                            break;
                        case 1:
                                v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]];
                            break;
                        case 2:
                                v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]][point[7]];
                            break;
                        case 3:
                                v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]][point[7]];
                            break;
                        case 4:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]][point[7]];
                            break;
                        case 5:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]][point[7]];
                            break;
                        case 6:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i][point[7]];
                            break;
                        case 7:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][i];
                            break;
                    }
                break;
            case 9:
                //9D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                                v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]][point[8]];
                            break;
                        case 1:
                                v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]][point[8]];
                            break;
                        case 2:
                                v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]][point[7]][point[8]];
                            break;
                        case 3:
                                v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]][point[7]][point[8]];
                            break;
                        case 4:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]][point[7]][point[8]];
                            break;
                        case 5:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]][point[7]][point[8]];
                            break;
                        case 6:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i][point[7]][point[8]];
                            break;
                        case 7:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][i][point[8]];
                            break;
                        case 8:
                                v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]][i];
                            break;
                    }

        }
        return v;
    }

    //pretty much a mirror image of getVectorInMemory
    setVectorInMemory(point, direction, v) {
        switch (this.numDimensions) {
            case 1:
                this.memory = v;
                break;
            case 2:
                //2D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0: 
                            this.memory[i][point[1]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i] = v[i];
                            break;
                    }
                break;
            case 3:
                //3D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            this.memory[i][point[1]][point[2]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i][point[2]] = v[i];
                            break;
                        case 2:
                            this.memory[point[0]][point[1]][i] = v[i];
                            break;
                    }
                break;
            case 4:
                //4D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            this.memory[i][point[1]][point[2]][point[3]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i][point[2]][point[3]] = v[i];
                            break;
                        case 2:
                            this.memory[point[0]][point[1]][i][point[3]] = v[i];
                            break;
                        case 3:
                            this.memory[point[0]][point[1]][point[2]][i] = v[i];
                            break;
                    }
                break;
            case 5:
                //5D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            this.memory[i][point[1]][point[2]][point[3]][point[4]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i][point[2]][point[3]][point[4]] = v[i];
                            break;
                        case 2:
                            this.memory[point[0]][point[1]][i][point[3]][point[4]] = v[i];
                            break;
                        case 3:
                            this.memory[point[0]][point[1]][point[2]][i][point[4]] = v[i];
                            break;
                        case 4:
                            this.memory[point[0]][point[1]][point[2]][point[3]][i] = v[i];
                            break;
                    }
                break;
            case 6:
                //6D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]] = v[i];
                            break;
                        case 2:
                            this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]] = v[i];
                            break;
                        case 3:
                            this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]] = v[i];
                            break;
                        case 4:
                            this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]] = v[i];
                            break;
                        case 5:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i] = v[i];
                            break;
                    }
                break;
            case 7:
                //7D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]] = v[i];
                            break;
                        case 2:
                            this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]] = v[i];
                            break;
                        case 3:
                            this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]] = v[i];
                            break;
                        case 4:
                            this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]] = v[i];
                            break;
                        case 5:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]] = v[i];
                            break;
                        case 6:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i] = v[i];
                            break;
                    }
                    break;
            case 8:
                //8D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]] = v[i];
                            break;
                        case 2:
                            this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]][point[7]] = v[i];
                            break;
                        case 3:
                            this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]][point[7]] = v[i];
                            break;
                        case 4:
                            this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]][point[7]] = v[i];
                            break;
                        case 5:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]][point[7]] = v[i];
                            break;
                        case 6:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i][point[7]] = v[i];
                            break;
                        case 7:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][i] = v[i];
                            break;
                    }
                    break;
            case 9:
                //9D case
                for (let i=0; i < this.width; i++)
                    switch (direction) {
                        case 0:
                            this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]][point[8]] = v[i];
                            break;
                        case 1:
                            this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]][point[8]] = v[i];
                            break;
                        case 2:
                            this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]][point[7]][point[8]] = v[i];
                            break;
                        case 3:
                            this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]][point[7]][point[8]] = v[i];
                            break;
                        case 4:
                            this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]][point[7]][point[8]] = v[i];
                            break;
                        case 5:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]][point[7]][point[8]] = v[i];
                            break;
                        case 6:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i][point[7]][point[8]] = v[i];
                            break;
                        case 7:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][i][point[8]] = v[i];
                            break;
                        case 8:
                            this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]][i] = v[i];
                            break;
                    }

}

export default NeuralMemory;