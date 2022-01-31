import NDimensionMemory from './n-dimension-memory'

class RelativeMemory {
    //pass in n-dimensional memory
    constructor(memory, ...relationships) {
        this.memory = memory;
        this.relationships = relationships;
    }
    
    findVectorFromRelationship() {
        let vector = [];
        for (let i = 0; i < this.relationships.length; i++) {
            vector.push(this.relationships[i].findVector());
        }
        return vector;
    }

    findVectorFromMemory() {
        for (let i = 0; i < this.memory.length; i++) {
            let vector = this.memory[i];
            if (vector.length === this.relationships.length) {
                return vector;
            }
        }
    }



}

export default RelativeMemory;