
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

    //get a vector that's the pointwise sum of all vectors intersecting that point in the n-cube
    getVectorSumAtIntersection(point) {
        
    }

    //get a vector that's a 1D slice from any dimension of the n-cube (row, column, etc.)
    //dimension = 0 means rows, 1 means columns and so forth
    getVector(dimension, index) {
        switch (dimension) {
            case 0:
                return this.memory[index];
    }
    
}

export default NeuralMemory;