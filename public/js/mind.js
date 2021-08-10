// const Cluster = require('./cluster');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Mind {
    constructor(numInputs = 4, numOutputs = 2){
        this.inputs = new Array(numInputs);
        this.outputs = new Array(numOutputs);

        //Feedforward Neural Network
        this.cluster = new Cluster(numInputs, 5, 8, 4, numOutputs);
    }

    update(inputs) {
        this.inputs = inputs;
        //TODO: Normalize inputs here if needed

        this.outputs = this.cluster.activate(inputs);

        return this.outputs;
    }
}

// module.exports = Mind;