import Net from './net';

class Mind {
    constructor(numSenses = 4, numBehaviors = 3, simple = true){
        this.simple = simple;
        //Sensory Net takes in input from world
        this.senseNet = new Net({isRecurrent: true, isLongTerm: false}, numSenses, numSenses+10, 10, 10, 10, 10, 10, 5, 3);

        //Keeping this here for now so I can control Mind building inside class better
        if (!simple)
            this.buildRegions(numSenses, numBehaviors, {regionHiddens:4}, 3, 3);
    }

    buildRegions(numSenses, numBehaviors, {regionHiddens=4, regionOutputs=2}={}, ...regionSizes) {

        let numRegionInputs = this.senseNet.charges[this.senseNet.charges.length - 1].length;
        this.nets = new Array(regionSizes);
        for (let region=0; region < this.nets.length; region++) {
            this.nets[region] = new Array(regionSizes[region]);
            let numNextRegionInputs = 0;
            for (let net=0; net < this.nets[region].length; net++) {
                this.nets[region][net] = new Net({isRecurrent: true, isLongTerm: false}, numRegionInputs, regionHiddens, regionHiddens,  regionOutputs);
                numNextRegionInputs += numRegionInputs;
            }
            numRegionInputs = numNextRegionInputs;
        }

        //Behavior Net outputs actions
        this.behaviorNet = new Net({isRecurrent: false, isLongTerm: false}, numRegionInputs, numBehaviors, numBehaviors);
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
        const finalRegion = this.nets[outputRegion];

        //Pass the accumulated outputs of final regions into behaviorNet and return output
        return this.behaviorNet.activate(regionInputs);

    }

    update(inputs) {
        //TODO: Auto-Normalize inputs here if needed

        //Perception with inputNet
        const processed = this.senseNet.activate(inputs);
        if (this.simple) //Return basic processed senses if simple net
            return processed;
        else //Activate all inner brain regions
            return this.activateRegions();

        // this.outputs = this.net.activate(inputs);
    }

    //For exact same architectures
    cloneMind(cloned, mutRate) {
        //this.net.cloneNet(cloned.net);
        this.senseNet.cloneNet(cloned.senseNet);
        if (!this.simple){
            this.behaviorNet.cloneNet(cloned.behaviorNet);
            for (let region in this.nets) {
                for (let net in this.nets[region]) {
                    this.nets[region][net].cloneNet(cloned.nets[region][net], mutRate) 
                }
            }
        }
    }
    //This is replaced with offspring of mating
    mateMind(mom, dad, mutRate) {
        //this.net.mateNets(mom.net, dad.net, mutRate);
        this.senseNet.mateNets(mom.senseNet, dad.senseNet, mutRate);
        if (!this.simple){
            this.behaviorNet.mateNets(mom.behaviorNet, dad.behaviorNet, mutRate);
            for (let region in this.nets) {
                for (let net in this.nets[region]) {
                    this.nets[region][net].mateNets(mom.nets[region][net], dad.nets[region][net], mutRate) 
                }
            }
        }
    }
}

export default Mind;