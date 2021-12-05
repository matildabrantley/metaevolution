
class NeuralMemory {
    constructor (numDimensions, width) {
        this.width = width;
        this.memory = buildNDimensionalCube(numDimensions);
    }
    
    () {
        
    }
    
    //builds and returns multidimensional array with shape of square, cube, tesseract, etc. (n dimensions with equal width)
    function buildNDimensionalCube(numDimensions) {
        if (numDimensions > 0) {
            var arr = new Array();
            for (let i = 0; i < this.width; i++) {
                //recurvisely build lower dimension
                arr[i] = buildNDimensionalCube(numDimensions);
            }
            return arr;
         } else {
            return undefined;
         }
    }
    
}

export default NeuralMemory;