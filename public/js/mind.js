// const Net = require('./net');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Mind {
    constructor(numInputs = 4, numOutputs = 2){
        this.inputs = new Array(numInputs);
        this.outputs = new Array(numOutputs);

        //Feedforward Neural Network
        this.net = new Net(numInputs, 9, 12, 6, numOutputs);
    }

    update(inputs) {
        this.inputs = inputs;
        //TODO: Auto-Normalize inputs here if needed

        this.outputs = this.net.activate(inputs);

        return this.outputs;
    }
}

// module.exports = Mind;