import NDimensionMemory from './n-dimension-memory'

class RelativeMemory extends NDimensionMemory {
    
    constructor(numDimensions = 1, width = 5) {
        super(numDimensions, width);
        this.relationships = [];
    }
    
    findVectorFromRelationship() {
        
    }

}

export default RelativeMemory;