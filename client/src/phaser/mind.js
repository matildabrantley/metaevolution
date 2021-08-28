const Net = require('./net');

class Mind {
    constructor(numInputs = 4, numOutputs = 3){
        this.inputs = new Array(numInputs);
        this.outputs = new Array(numOutputs);

        this.numInputsPerNet = numInputs;
        this.numOutputsPerNet = numOutputs;

        //Feedforward Neural Network
        this.net = new Net({isRecurrent :true, isLongTerm: false}, numInputs, 12, numOutputs);
        this.behaviorNet = new Net({isRecurrent :true, isLongTerm: false}, numInputs, 12, numOutputs);

        this.buildRegions();
    }

    buildRegions() {
        let magicNum = 5;
        this.nets = new Array(magicNum);
        for (let region=0; region < this.nets.length; region++) {
            this.nets[region] = new Array(magicNum);
            for (let net=0; net < this.nets[region].length; net++) {
                this.nets[region][net] = new Net({isRecurrent :true, isLongTerm: false}, this.numInputsPerNet, 12, this.numOutputsPerNet);;
            }
        }
    }

    activateRegions() {
        //Feed senseNet's output into every net of the first region.
        const firstRegion = this.nets[0];
        const senses = this.senseNet.charges[this.senseNet.charges.length - 1]

        for (const net of firstRegion)
            net.charges[0] = senses.map((charge) => charge);
        
        const outputRegion = this.nets.length - 1;

        for (let region=0, nextRegion=1; region < this.nets.length; region++, nextRegion++) {
            for (let net=0; net < this.nets[region].length; net++) {
                const currentNet = this.nets[region][net];
                currentNet.activate();
                const currentOutputs = currentNet.charges[currentNet.charges.length - 1];

                //Concatenate the outputs of current net to the inputs of each net in next region
                for (let nextNet=0; nextNet < this.nets[nextRegion].length; nextNet++) {                   
                    const nextNet = this.nets[nextRegion][nextNet];
                    nextNet.charges[0] = nextNet.charges[0].concat(currentOutputs);
                }
            }
        }

        //Concatenate all the charges of the final region's output layers into the behaviorNet
        const finalRegion = this.nets[outputRegion];
        for (const net of finalRegion) {
            this.behaviorNet = this.behaviorNet.concat(net.charges[net.charges.length - 1]);
        }

    }

    update(inputs) {
        //TODO: Auto-Normalize inputs here if needed

        //Perception with inputNet
        //this.senseNet.activate(inputs);
        //Activate all inner brain regions
        //this.activateRegions();

        this.outputs = this.net.activate(inputs);

        return this.outputs;
    }

    //For exact same architectures
    cloneMind(cloned, mutRate) {
        this.mind.net.cloneNet(cloned.mind.net);

        for (let region in this.nets) {
            for (let net in this.nets[region]) {
                this.nets[region][net].cloneNet(cloned.nets[region][net], mutRate) 
            }
        }
    }
    //This is replaced with offspring of mating
    mateMind(mom, dad, mutRate) {
        //TODO: For each tier of Nets
        this.mind.net.mateNet(mom.mind.net, dad.mind.net, mutRate);

        for (let region in this.nets) {
            for (let net in this.nets[region]) {
                this.nets[region][net].mateNets(cloned.nets[region][net], mutRate) 
            }
        }
    }
}

module.exports = Mind;