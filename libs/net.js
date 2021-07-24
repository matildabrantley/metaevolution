
//Just a perceptron/feedforward net for now
class Net {
	constructor(...layerSizes)
	{		
		//initialize all charges to zero
		this.charges = new Array(layerSizes.length);
		for (let i = 0; i < layerSizes.length; i++)
		{
			this.charges[i] = new Array(this.layerSizes[i].length);
			for (let j = 0; j < this.layerSizes[i].length; j++)
				this.charges[i][j] = 0;
		}
		
		
		//fully interconnected random weights 
		this.weights = new Array(layerSizes.length);
		for (let i = 0; i < layerSizes.length - 1; i++)
		{
			this.weights[i] = new Array(this.layerSizes[i].length);
			for (let j = 0; j < this.layerSizes[i].length; j++)
			{
				this.weights[i][j] = new Array(this.layerSizes[i + 1])
				for (let k = 0; k < this.layerSizes[i + 1].length; k++)
					this.weights[i][j][k] = Math.random();
			}
		}
		
		//random thresholds
		this.thresholds = new Array(layerSizes.length);
		for (let i = 0; i < layerSizes.length - 1; i++)
		{
			this.weights[i] = new Array(this.layerSizes[i].length);
			for (let j = 0; j < this.layerSizes[i].length; j++)
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
		for (let i = 0; i < this.charges.length - 1; i+) {
			//each neuron
			for (let j = 0; j < this.charges[i].length; j++) {
				//charge checked against threshold
				if (i == 0 ||this.charges[i][j] > this.thresholds[i][j]) {
					//each weight
					for (let k = 0; k <this.charges[i + 1].length; k++)
						this.charges[i + 1][k] +=this.charges[i][j] * this.weights[i][j][k];
				}
			}
			//squish next layer after its been all charged up, except output layer
			// for (let next = 0; next < this.charges[i + 1].length; next++) 
		}
		//return output layer
		return this.charges[this.charges.length -1];;
	}

	//copy over this net's weights with another net's weights, mutating in the process
	replaceAndMutate (otherNet, mutationRate=0) { 
		//weights overwritten
		for (let i = 0; i < otherNet.charges.length; i++) {
			for (let j = 0; j < otherNet.charges[i].length; j++) {
				for (let k = 0; k < otherNet.charges[i].length; k++) {	
					this.weights[i][j] = otherNet.weights[i][j];
					if (Math.random() < mutRate)
				}
			}
		}
		//thresholds overwritten
		for (let i = 0; i < otherNet.charges.length - 1; i++)
		{
			for (let j = 0; j < otherNet.charges[i].length; j++)
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