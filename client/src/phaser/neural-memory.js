
class NeuralMemory {
    constructor (numDimensions, width) {
        this.width = width;
        this.memory = buildNDimensionalCube(numDimensions);
    }
    
    () {
        
    }
    
    //builds and returns multidimensional array with n-cube shape (n dimensions with equal width i.e. square, cube, tesseract..)
    function buildNDimensionalCube(numDimensions) {
        if (numDimensions > 1) {
            var arr = new Array();
            for (let i = 0; i < this.width; i++) {
                //recursively build lower dimensions
                arr[i] = this.buildNDimensionalCube(numDimensions - 1);
            }
            return arr;
         } else {
            return new Array(this.width).fill(0);
         }
    }
    
}

export default NeuralMemory;