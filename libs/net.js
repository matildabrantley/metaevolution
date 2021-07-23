
//Just a perceptron/feedforward net for now
class Net {
	constructor(...layerSizes)
	{
		this.numLayers = layerSizes.length;
		
		//initialize all charges to zero
		this.charges = new Array(this.numLayers);
		for (let i = 0; i < this.numLayers; i++)
		{
			this.charges[i] = new Array(this.layerSizes[i].length);
			for (let j = 0; j < this.layerSizes[i].length; j++)
				this.charges[i][j] = 0;
		}
		
		
		//fully interconnected random weights 
		this.weights = new Array(this.numLayers);
		for (let i = 0; i < this.numLayers; i++)
		{
			this.weights[i] = new Array(this.layerSizes[i].length);
			if (i < this.numLayers - 1) //this prevents the net from linking the output to a non-existent layer
				for (let j = 0; j < this.layerSizes[i].length; j++)
				{
					this.weights[i][j] = new Array(this.layerSizes[i + 1])
					for (let k = 0; k < this.layerSizes[i + 1].length; k++)
						this.weights[i][j][k] = Math.random();
				}
		}
		
		//random thresholds
		this.thresholds = new Array(this.numLayers);
		for (let i = 0; i < this.numLayers - 1; i++)
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
		for (let i = 0; i <this.numLayers; i++)
		{
			if (i <this.numLayers - 1) //this prevents the net from feeding outputs to a non-existent layer
				for (let j = 0; j <this.layerSizes[i].length; j++)
					if (i == 0 ||this.charges[i][j] > this.thresholds[i][j])
						for (let k = 0; k <this.layerSizes[i + 1].length; k++)
						this.charges[i + 1][k] +=this.charges[i][j] * this.weights[i][j][k];
		}
		//return output layer
		return this.charges[this.numLayers-1];;
	}

	//copy over this net's weights with another net's weights, mutating in the process
	replaceAndMutate (otherNet, mutationRate=0)
	{ 
	//weights overwritten
	for (var i = 0; i < otherNet.numLayers; i++)
	{
		for (var j = 0; j < otherNet.layerSizes[i].length; j++)
		{
			for (var k = 0; k < otherNet.layerSizes[i].length; k++)
			{	
				this.weights[i][j] = otherNet.weights[i][j];
				if (Math.random() < mutRate)
			}
		}
	}
	//thresholds overwritten
	for (var i = 0; i < otherNet.numLayers - 1; i++)
	{
		for (var j = 0; j < otherNet.layerSizes[i].length; j++)
			this.thresholds[i][j] = otherNet.thresholds[i][j];
	}
}
}

module.exports = Net;