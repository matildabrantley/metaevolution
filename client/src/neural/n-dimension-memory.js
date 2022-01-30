/*Summary:
N-Dimension Memory is an external memory block connected to the inputs and outputs of a Net.
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
-Supports up to 9 dimensions currently.

Note: the reasoning behind an n-cube is gradual evolutionary change with learned neural patterns.

Example: 
If neural inputs (the Net's outputs) are all in middle of allowed range (such as ~0 when -1 to 1) 
with 3x3 memory, the second (middle) vectors will be targeted. If the memory grows to 3x3x3 then 
existing patterns will still make sense while new patterns can grow naturally with extra memory. 
Likewise, growing to 5x5 instead of adding dimensions also allows for existing patterns to still
work with just a little bit of adjustment.
*/

class NDimensionMemory {
    constructor (numDimensions, width) {
        this.numDimensions = numDimensions;
        this.width = width;
        this.memory = buildNDimensionalCube(numDimensions);
        //an input for each dimension's index and one for scalar, gradient, and operation
        this.writeInputs = new Array(numDimensions + 3);
        this.readInputs = new Array(numDimensions + 1);
    }

    //returns 1D array representing an n-cube shape (n dimensions with equal width i.e. square, cube, tesseract..)
    buildNDimensionalCube(numDimensions) {
        //Equal width dimensions preferred due to the way the network reads and writes vectors in dynamic memory
        //and how the memory capacity grows through generations during evolution. 
        //In other words, complete symmetry is favorable.

        //Pre-calculate the total elements per dimension (vector=2, plane=4, cube=8, etc)
        //to prevent repeatedly multiplying width every time an element is accessed.
        this.elementsPerDim = new Array(numDimensions);
        this.elementsPerDim[0] = 1; //only here for completeness
        for (let i = 1; i <= numDimensions; i++) 
            this.elementsPerDim[i] = Math.pow(this.width, i);
        
        //variables for recursively calculating indices past hardcoded dimensions (8 dimensions)
        //they're not passed recursively because it's a slowdown to normal use cases
        if (numDimensions >= 8) {
            this.indexSum = 0;
            this.currentDim = 0;
        }

        //Return one dimensional array representing the n-dimensional cube
        return new Array(this.elementsPerDim[numDimensions]).fill(0);


    }

    //calculates the n-dimensional index of memory's 1D array
    //index-calculating of first 8 dimensions hardcoded as base cases for efficiency
    //dimensions past 8 are recursively calculated until they reach a base case (8th dimension)
    getElement(indices) {
        switch (indices.length) {
            case 1:
                return this.memory[indices[0]];
            case 2:
                return this.memory[indices[0] * this.elementsPerDim[2] + indices[1]];
            case 3:
                return this.memory[indices[0] * this.elementsPerDim[3] + 
                    indices[1] * this.elementsPerDim[2] + indices[2]];
            case 4:
                return this.memory[indices[0] * this.elementsPerDim[4] +
                    indices[1] * this.elementsPerDim[3] + 
                    indices[2] * this.elementsPerDim[2] + indices[3]];
            case 5:
                return this.memory[indices[0] * this.elementsPerDim[5] +
                    indices[1] * this.elementsPerDim[4] +
                    indices[2] * this.elementsPerDim[3] +
                    indices[3] * this.elementsPerDim[2] + indices[4]];
            case 6:
                return this.memory[indices[0] * this.elementsPerDim[6] +
                    indices[1] * this.elementsPerDim[5] +
                    indices[2] * this.elementsPerDim[4] +
                    indices[3] * this.elementsPerDim[3] +
                    indices[4] * this.elementsPerDim[2] + indices[5]];
            case 7:
                return this.memory[indices[0] * this.elementsPerDim[7] +
                    indices[1] * this.elementsPerDim[6] +
                    indices[2] * this.elementsPerDim[5] +
                    indices[3] * this.elementsPerDim[4] +
                    indices[4] * this.elementsPerDim[3] +
                    indices[5] * this.elementsPerDim[2] + indices[6]];
            case 8:
                let element = this.memory[indices[0] * this.elementsPerDim[8] +
                    indices[1] * this.elementsPerDim[7] +
                    indices[2] * this.elementsPerDim[6] +
                    indices[3] * this.elementsPerDim[5] +
                    indices[4] * this.elementsPerDim[4] +
                    indices[5] * this.elementsPerDim[3] +
                    indices[6] * this.elementsPerDim[2] + indices[7]]
                    + this.indexSum; //adds sum of all indices past 8 dimensions
                //reset indexSum and currentDim
                this.indexSum = 0; 
                this.currentDim = this.numDimensions;
                return element;
            default:
                this.indexSum += indices[0] * this.elementsPerDim[this.currentDim];
                this.currentDim--;
                //slice off highest dimension's index and recursively call getElement
                return this.getElement(indices.slice(1));
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

}

export default NDimensionMemory;