
class NeuralMemory {
    constructor (numDimensions, width) {
        this.numDimensions = numDimensions;
        this.width = width;
        this.memory = buildNDimensionalCube(numDimensions);
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

    // *** Basic Vector Operations *** 

    // Two Vectors Operations
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

    //Scalar Vector Operations
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

    //Average any number of vectors
    averageVectors(vectors) {
        let sum = new Array(this.width).fill(0);
        for (let i = 0; i < vectors.length; i++)
            sum = this.addTwoVectors(sum, vectors[i]);
        return this.divideVector(sum, vectors.length);
    }

    //get a vector that's the pointwise sum of all vectors intersecting that point in the n-cube
    getVectorSumAtIntersection(point) { //point is an array of length numDimensions containing indices
        let sum = new Array(this.width).fill(0);
        //Add up all vectors intersecting the point
        for (let i = 0; i < this.numDimensions; i++) 
        sum = this.addTwoVectors(sum, getVectorByPoint(point, i));
        return sum;
    }

    //get a vector that's a 1D slice from any direction of the n-cube (row, column, etc.)
    //by passing a point inside that vector and the direction of the slice
    getVectorByPoint(point, direction) { //point is an array of length numDimensions containing indices
        let v = Array(this.width);

        //Up to 8 dimensions supported
        //these nested switches are a mess right now, but it's quite fast
        //need a solution with less repetitive code and scalable dimensions, 
        //so something recursive or perhaps a different data structure
        //the difficulty is needing to get a vector from any slice for all possible dimensionalities
        switch(this.numDimensions) {
            case 2:
                //2D case
                switch (direction) {
                    case 0:
                        for (let i=0; i < this.width; i++) 
                            v[i] = this.memory[i][point[1]];
                        break;
                    case 1:
                        for (let i=0; i < this.width; i++) 
                            v[i] = this.memory[point[0]][i];
                        break;
                }
                break;
            case 3:
                //3D case
                switch (direction) {
                    case 0:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[i][point[1]][point[2]];
                        break;
                    case 1:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][i][point[2]];
                        break;
                    case 2:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][i];
                        break;
                }
            case 4:
                //4D case
                switch (direction) {
                    case 0:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[i][point[1]][point[2]][point[3]];
                        break;
                    case 1:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][i][point[2]][point[3]];
                        break;
                    case 2:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][i][point[3]];
                        break;
                    case 3:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][i];
                }
                break;
            case 5:
                //5D case
                switch (direction) {
                    case 0:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]];
                        break;
                    case 1:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]];
                        break;
                    case 2:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]];
                        break;
                    case 3:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]];
                        break;
                    case 4:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i];
                        break;
                }
                break;
            case 6:
                //6D case
                switch (direction) {
                    case 0:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]];
                        break;
                    case 1:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]];
                        break;
                    case 2:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]];
                        break;
                    case 3:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]];
                        break;
                    case 4:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]];
                        break;
                    case 5:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i];
                        break;
                }
                break;
            case 7:
                //7D case
                switch (direction) {
                    case 0:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]];
                        break;
                    case 1: 
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]];
                        break;
                    case 2:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]];
                        break;
                    case 3:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]];
                        break;
                    case 4:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]];
                        break;
                    case 5:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]];
                        break;
                    case 6:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i];
                        break;
                }
                break;
            case 8:
                //8D case
                switch (direction) {
                    case 0:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[i][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]];
                        break;
                    case 1:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][i][point[2]][point[3]][point[4]][point[5]][point[6]][point[7]];
                        break;
                    case 2:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][i][point[3]][point[4]][point[5]][point[6]][point[7]];
                        break;
                    case 3:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][i][point[4]][point[5]][point[6]][point[7]];
                        break;
                    case 4:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][i][point[5]][point[6]][point[7]];
                        break;
                    case 5:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][i][point[6]][point[7]];
                        break;
                    case 6:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][i][point[7]];
                        break;
                    case 7:
                        for (let i=0; i < this.width; i++)
                            v[i] = this.memory[point[0]][point[1]][point[2]][point[3]][point[4]][point[5]][point[6]][i];
                        break;
                }
                break;
        }
        return v;
    }
    
}

export default NeuralMemory;