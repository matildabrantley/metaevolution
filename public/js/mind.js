// const Net = require('./net');
// const Vector = require('./vector');
// const Matter = require('matter-js');
class Mind {
    constructor(numInputs = 4, numOutputs = 3){
        this.inputs = new Array(numInputs);
        this.outputs = new Array(numOutputs);

        //Feedforward Neural Network
        this.net = new Net({isRecurrent :true, isLongTerm: false}, numInputs, 12, numOutputs);

        this.nets = [];
    }

    buildNets(){
        let magicNum = 5;
        this.charges = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length; layer++)
		{
			this.charges[layer] = new Array(layerSizes[layer]);
			for (let neuron = 0; neuron < layerSizes[layer]; neuron++)
				this.charges[layer][neuron] = 0;
		}
    }

    buildNetTier(){
        
    }

    update(inputs) {
        this.inputs = inputs;
        //TODO: Auto-Normalize inputs here if needed

        this.outputs = this.net.activate(inputs);

        return this.outputs;
    }
}

// module.exports = Mind;