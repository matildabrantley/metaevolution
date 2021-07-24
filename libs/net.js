
//Just a perceptron/feedforward net for now
class Net {
	constructor(...layerSizes)
	{		
		//initialize all charges to zero
		this.charges = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length; layer++)
		{
			this.charges[layer] = new Array(this.layerSizes[layer].length);
			for (let neuron = 0; neuron < this.layerSizes[layer].length; neuron++)
				this.charges[layer][neuron] = 0;
		}
		
		
		//fully interconnected random weights 
		this.weights = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length - 1; layer++)
		{
			this.weights[layer] = new Array(this.layerSizes[layer].length);
			for (let neuron = 0; neuron < this.layerSizes[layer].length; neuron++)
			{
				this.weights[layer][neuron] = new Array(this.layerSizes[layer + 1])
				for (let w = 0; w < this.layerSizes[i + layer].length; w++)
					this.weights[layer][neuron][w] = Math.random();
			}
		}
		
		//random thresholds
		this.thresholds = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length - 1; layer++)
		{
			this.weights[layer] = new Array(this.layerSizes[layer].length);
			for (let neuron = 0; neuron < this.layerSizes[layer].length; neuron++)
				if (layer == 0)
					thresholds[layer][neuron] = 0;
				else
					thresholds[layer][neuron] = Math.random() * 5;
		}
	}

	//Run the net, feeding charges forward based on weights
	activate(input) {
		//input is array
		this.charges[0] = input;
		
		//layer index of output
		let outputLayer = this.charges.length - 1;

		//Propagate charges forward
		//each layer
		for (let layer = 0, nextLayer = 1; layer < outputLayer; layer++, nextLayer++) {
			//each neuron
			for (let neuron = 0; neuron < this.charges[layer].length; neuron++) {
				//charge checked against threshold
				if (layer == 0 ||this.charges[layer][neuron] > this.thresholds[layer][neuron]) {
					//each weight
					for (let w = 0; w < this.charges[nextLayer].length; w++)
						this.charges[nextLayer][w] += this.charges[layer][neuron] * this.weights[layer][neuron][w];
				}
			}
			//ReLU next layer after its been all charged up, except output layer (which instead gets sigmoid'ed)
			for (let neuron = 0; neuron < this.charges[nextLayer].length; neuron++) 
				charges[nextLayer][neuron] = this.relu(charges[nextLayer][neuron]);
		}
	
		//squish outputs with sigmoid
		for (let neuron = 0; neuron < this.charges[outputLayer].length; neuron++)
			this.charges[outputLayer][neuron] = this.sigmoid(this.charges[outputLayer][neuron]);


		//return output layer
		return this.charges[outputLayer];;
	}

	//copy over this net's weights with another net's weights, mutating in the process
	replaceAndMutate (otherNet, mutationRate=0) { 
		//weights overwritten
		for (let layer = 0; layer < otherNet.charges.length; layer++) {
			for (let neuron = 0; neuron < otherNet.charges[i].length; neuron++) {
				for (let k = 0; k < otherNet.charges[i].length; k++) {	
					this.weights[layer][neuron] = otherNet.weights[layer][neuron];
					if (Math.random() < mutRate)
				}
			}
		}
		//thresholds overwritten
		for (let layer = 0; layer < otherNet.charges.length - 1; layer++)
		{
			for (let neuron = 0; neuron < otherNet.charges[i].length; neuron++)
				this.thresholds[layer][neuron] = otherNet.thresholds[layer][neuron];
		}
	}

	//Activation functions:
	//sigmoid for output layer
	sigmoid(x) { return 1 / (1 + Math.exp(-x)); };
	//ReLU for hidden layer
	relu(x) { return Math.max(0, x); };
}

module.exports = Net;