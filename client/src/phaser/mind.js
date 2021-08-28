const Net = require('./net');

class Mind {
    constructor(numInputs = 4, numOutputs = 3){
        this.inputs = new Array(numInputs);
        this.outputs = new Array(numOutputs);

        this.numInputsPerNet = numInputs;
        this.numOutputsPerNet = numOutputs;

        //Feedforward Neural Network
        this.inputNet = new Net({isRecurrent :true, isLongTerm: false}, numInputs, 12, numOutputs);
        this.outputNet = new Net({isRecurrent :true, isLongTerm: false}, numInputs, 12, numOutputs);

        this.buildRegions;
    }

    buildRegions(){
        let magicNum = 5;
        const this.nets = new Array(magicNum);
        for (let region=0; region < this.nets.length; region++) {
            this.nets[region] = new Array(magicNum);
            for (let net=0; net < this.nets[region].length; net++) {
                this.nets[region][net] = new Net({isRecurrent :true, isLongTerm: false}, this.numInputsPerNet, 12, this.numOutputsPerNet);;
            }
        }
    }

    activateRegions() {
        const outputRegion = this.charges.length - 1;

        for (let region=0, nextRegion=1; region < this.nets.length; region++, nextRegion++) {
            for (let net=0; net < this.nets[region].length; net++) {
                const currentNet = this.nets[region][net];
                currentNet.activate();
                const currentOutputs = currentNet.charges[currentNet.charges.length - 1];

                //Concatenate the outputs of current net to the inputs of each net in next region
                for (let nextNet=0; nextNet < this.nets[nextRegion].length; nextNet++) {                   
                    const nextNet = this.nets[nextRegion][nextNet];
                    let nextInputs = nextNet.charges[0];
                    nextInputs = nextInputs.concat(currentOutputs);
                }
            }
        }
    }

    update(inputs) {
        this.inputs = inputs;
        //TODO: Auto-Normalize inputs here if needed

        this.activateRegions();
        
        this.outputs = this.net.activate(inputs);

        return this.outputs;
    }
}

module.exports = Mind;