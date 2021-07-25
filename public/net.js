
//Just a perceptron/feedforward net for now
class Net {
	constructor(...layerSizes)
	{		
		//initialize all charges to zero
		this.charges = new Array(layerSizes.length);
		for (let layer = 0; layer < layerSizes.length; layer++)
		{
			this.charges[layer] = new Array(layerSizes[layer]);
			for (let neuron = 0; neuron < layerSizes[layer]; neuron++)
				this.charges[layer][neuron] = 0;
		}
		
		//fully interconnected random weights 
		this.weights = new Array(layerSizes.length - 1);
		for (let layer = 0; layer < this.weights.length; layer++)
		{
			this.weights[layer] = new Array(layerSizes[layer]);
			for (let neuron = 0; neuron < layerSizes[layer]; neuron++)
			{
				this.weights[layer][neuron] = new Array(layerSizes[layer + 1])
				for (let w = 0; w < layerSizes[layer + 1]; w++)
					this.weights[layer][neuron][w] = (Math.random() * 2) - 1;
			}
		}
	}

	//Run the net, feeding charges forward based on weights
	activate(input) {
		this.clearCharges();
		//set first layer to input array
		this.charges[0] = input;
		
		//index of output layer
		let outputLayer = this.charges.length - 1;


		//set a standard net-wide threshold for both positive and negitive charges
		let threshold = 0.0;

		//Propagate charges forward
		//each layer
		for (let layer = 0, nextLayer = 1; layer < outputLayer; layer++, nextLayer++) {
			//each neuron
			for (let neuron = 0; neuron < this.charges[layer].length; neuron++) {
				//absolute value of charge checked against a standard threshold
				if (layer == 0 || Math.abs(this.charges[layer][neuron]) > threshold) {
					//each weight
					for (let w = 0; w < this.charges[nextLayer].length; w++)
						this.charges[nextLayer][w] += this.charges[layer][neuron] * this.weights[layer][neuron][w];
				}
			}
			//activation function on next layer's neurons after they're all charged up
			for (let neuron = 0; neuron < this.charges[nextLayer].length; neuron++) 
				this.charges[nextLayer][neuron] = this.zeroCenteredCurve(this.charges[nextLayer][neuron]);
		}
	
		//squish outputs with sigmoid
		for (let neuron = 0; neuron < this.charges[outputLayer].length; neuron++)
			this.charges[outputLayer][neuron] = this.zeroCenteredCurve(this.charges[outputLayer][neuron]);


		//return output layer
		return this.charges[outputLayer];
	}

	//reset charges to 0 (except input layer which gets replaced anyway)
	clearCharges() {
		for (let layer = 1; layer < this.charges.length; layer++)
			for (let neuron = 0; neuron < this.charges[layer].length; neuron++)
				this.charges[layer][neuron] = 0;
	}

	//copy over this net's weights with another net's weights, mutating in the process
	replaceAndMutate (otherNet, mutationRate=0) { 
		//weights overwritten
		for (let layer = 0; layer < otherNet.charges.length; layer++) {
			for (let neuron = 0; neuron < otherNet.charges[layer].length; neuron++) {
				for (let w = 0; w < otherNet.charges[layer].length; w++) {	
					this.weights[layer][neuron][w] = otherNet.weights[layer][neuron][w];
					//if (Math.random() < mutationRate)
				}
			}
		}
	}

	//Activation functions:
	//0.5-centered sigmoid (negatives cannot propagate)
	oneHalfCenteredCurve(x, base = 2) { return 1 / (1 + Math.pow(base, -x)); };
	//0-centered sigmoid (negatives can propagate)
	zeroCenteredCurve(x, base = 10) { return (2 / (1 + Math.pow(base, -x)) - 1); };
	//ReLU for hidden layer (only positives, no max positive)
	relu(x) { return Math.max(0, x); };
}

const testNet = () => {
	const net = new Net(2, 20, 2);
	console.log(net.activate([1,1]));
	console.log(net.activate([-1,-1]));
	console.log(net.activate([1,-1]));
	console.log(net.activate([-1,1]));
	console.log(net.activate([0,0]));
}
//testNet()

// module.exports = Net;