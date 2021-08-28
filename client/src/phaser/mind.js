const Net = require('./net');

class Mind {
    constructor(numInputs = 4, numOutputs = 3){
        this.inputs = new Array(numInputs);
        this.outputs = new Array(numOutputs);

        this.numInputsPerNet = numInputs;
        this.numHiddensPerHiddenNet = 2;
        this.numOutputsPerHiddenNet = 2;

        //Feedforward Neural Network
        this.senseNet = new Net({isRecurrent: false, isLongTerm: false}, numInputs, 12, numOutputs);
        this.behaviorNet = new Net({isRecurrent: false, isLongTerm: false}, numInputs, 12, numOutputs);

        this.buildRegions();
    }

    buildRegions() {
        let magicNum = 3;
        let numRegionInputs = this.senseNet.charges[this.senseNet.charges.length - 1].length;
        this.nets = new Array(magicNum);
        for (let region=0; region < this.nets.length; region++) {
            this.nets[region] = new Array(magicNum);
            let numNextRegionInputs = 0;
            for (let net=0; net < this.nets[region].length; net++) {
                this.nets[region][net] = new Net({isRecurrent: false, isLongTerm: false}, numRegionInputs, this.numHiddensPerHiddenNet, this.numOutputsPerHiddenNet);
                numNextRegionInputs += numRegionInputs;
            }
            numRegionInputs = numNextRegionInputs;
        }
    }

    activateRegions() {
        //Feed senseNet's output into every net of the first region.
        // const firstRegion = this.nets[0];
        const senses = this.senseNet.charges[this.senseNet.charges.length - 1]
        const outputRegion = this.nets.length - 1;

        //map outputs of senseNet into first region's inputs
        //regionInputs set to regionOuputs at the end of each inner loop (lezz hope this works!:D)
        let regionInputs = senses.map((charge) => charge);
        for (let region=0, nextRegion=1; region < this.nets.length; region++, nextRegion++) {
            let regionOutputs = [];
            for (let net=0; net < this.nets[region].length; net++) {
                const currentNet = this.nets[region][net];
                currentNet.activate(regionInputs);

                const currentOutputs = currentNet.charges[currentNet.charges.length - 1];
                regionOutputs = regionOutputs.concat(currentOutputs);
            }
            regionInputs = regionOutputs;
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
        this.senseNet.activate(inputs);
        //Activate all inner brain regions
        this.activateRegions();

        // this.outputs = this.net.activate(inputs);

        return this.behaviorNet.outputs;
    }

    //For exact same architectures
    cloneMind(cloned, mutRate) {
        //this.net.cloneNet(cloned.net);
        this.senseNet.cloneNet(cloned.senseNet);
        this.behaviorNet.cloneNet(cloned.behaviorNet);

        for (let region in this.nets) {
            for (let net in this.nets[region]) {
                this.nets[region][net].cloneNet(cloned.nets[region][net], mutRate) 
            }
        }
    }
    //This is replaced with offspring of mating
    mateMind(mom, dad, mutRate) {
        //this.net.mateNets(mom.net, dad.net, mutRate);
        this.senseNet.mateNets(mom.senseNet, dad.senseNet, mutRate);
        this.behaviorNet.mateNets(mom.behaviorNet, dad.behaviorNet, mutRate);

        for (let region in this.nets) {
            for (let net in this.nets[region]) {
                this.nets[region][net].mateNets(mom.nets[region][net], dad.nets[region][net], mutRate) 
            }
        }
    }
}

module.exports = Mind;