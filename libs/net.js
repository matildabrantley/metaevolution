
//Just a perceptron/feedforward net for now
class Net {
	constructor(...layerSizes)
	{		
		//initialize all charges to zero
		this.charges = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length; layer++)
		{
			this.charges[i] = new Array(this.layerSizes[i].length);
			for (let neuron = 0; neuron < this.layerSizes[i].length; neuron++)
				this.charges[i][j] = 0;
		}
		
		
		//fully interconnected random weights 
		this.weights = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length - 1; layer++)
		{
			this.weights[i] = new Array(this.layerSizes[i].length);
			for (let neuron = 0; neuron < this.layerSizes[i].length; neuron++)
			{
				this.weights[i][j] = new Array(this.layerSizes[i + 1])
				for (let k = 0; k < this.layerSizes[i + 1].length; k++)
					this.weights[i][j][k] = Math.random();
			}
		}
		
		//random thresholds
		this.thresholds = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length - 1; layer++)
		{
			this.weights[i] = new Array(this.layerSizes[i].length);
			for (let neuron = 0; neuron < this.layerSizes[i].length; neuron++)
				if (i == 0)
					thresholds[i][j] = 0;
				else
					thresholds[i][j] = Math.random() * 10;
		}
	}

	activate(input) {

		//input is arrays
		this.charges[0] = input;

		//charges propogate forward
		//each layer
		for (let layer = 0, nextLayer = 1; layer < this.charges.length - 1; layer++, nextLayer++) {
			//each neuron
			for (let neuron = 0; neuron < this.charges[layer].length; neuron++) {
				//charge checked against threshold
				if (layer == 0 ||this.charges[layer][neuron] > this.thresholds[layer][neuron]) {
					//each weight
					for (let w = 0; w < this.charges[nextLayer].length; w++)
						this.charges[nextLayer][w] += this.charges[layer][neuron] * this.weights[layer][neuron][w];
				}
			}
			//ReLU next layer after its been all charged up, except output layer (which gets sigmoid'ed)
			// for (let neuron = 0; neuron < this.charges[nextLayer].length; neuron++) 
			// 	charges[nextLayer][neuron]
		}
	
		// let outputLayer = this.charges.length - 1;
		// for (let neuron = 0; neuron < this.charges[nextLayer].length; neuron++)

		//return output layer
		return this.charges[this.charges.length -1];;
	}

	//copy over this net's weights with another net's weights, mutating in the process
	replaceAndMutate (otherNet, mutationRate=0) { 
		//weights overwritten
		for (let layer = 0; layer < otherNet.charges.length; layer++) {
			for (let neuron = 0; neuron < otherNet.charges[i].length; neuron++) {
				for (let k = 0; k < otherNet.charges[i].length; k++) {	
					this.weights[i][j] = otherNet.weights[i][j];
					if (Math.random() < mutRate)
				}
			}
		}
		//thresholds overwritten
		for (let layer = 0; layer < otherNet.charges.length - 1; layer++)
		{
			for (let neuron = 0; neuron < otherNet.charges[i].length; neuron++)
				this.thresholds[i][j] = otherNet.thresholds[i][j];
		}
	}

	// //activation functions
	// //for output layer
	// sigmoid(x) { return 1 / (1 + Math.exp(-x)); };
	// //for hidden layer
	// relu(x) { return Math.max(0, x); };
}

module.exports = Net;