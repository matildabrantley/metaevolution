//Ecosystem harbors all Species
import Group from './group';
import Species from './species';
const Phaser = require('phaser');



class Ecosystem {
    constructor({world, scene, config, tiles, seesTiles = false} = {},
                {speciesSelectionFreq = 100, maxSpeciesSelectionFreq = 600, deltaSelectionFreq = 50} = {}, species = []){

        this.world = world;
        this.scene = scene;            
        this.config = config;            
        this.tiles = tiles;    
        this.seesTiles = seesTiles;        

        this.species = species;
        this.timer = 0;
        this.speciesSelectionFreq = speciesSelectionFreq;
        this.maxSpeciesSelectionFreq = maxSpeciesSelectionFreq;
    }
    
    setupEcosystem({preyGroups = [], predatorGroups = []}={}){
        for (const specie of this.species) {
            specie.setupSpecies({preyGroups: preyGroups, predatorGroups: predatorGroups});
        }
        //just set "best" species to first species for now
        this.bestSpecies = this.species[0];
    }

    //Create a new species with all subgroups having same initial attributes (animation config, genetic config, fitness config)
    createSpecies({sprite=null, spritesheet=null, key=null, firstFrame=null, scale = 1} = {}, //anim config
        {numGroups = 4, pop = 200, groupPop = 50, mutRate = 0.11, selectionCutoff = 0.1, //population config
            maxGenLength = 250, initialGenLength = 10, deltaGenLength = 5} = {}) { 

                
            //Create Species object with general configuration and defaults for everything else
            const newSpecies = new Species({world: this.world, scene: this.scene, config: this.config, ecosystem: this,
                                             tiles: this.tiles, seesTiles: this.seesTiles});
                
            let popPerGroup = Math.floor(pop / numGroups);
            for (let i=0; i < numGroups; i++) {
                newSpecies.createGroup({sprite, spritesheet, key, firstFrame, scale},
                            {pop: popPerGroup}
                )
            }
        

        this.species.push(newSpecies);
        return newSpecies;
    }

    //Let's pretend "specie" is the correct singular of "species" =)
    addSpecies(specie){
        this.species.push(specie);
    }
    
    //set a new population for each species
    setGroupPopulation(pop){
        for (const specie of this.species) 
            specie.setGroupPopulation(pop);
    }

    update() {
        this.timer++;
        let allSpeciesFitness = [];
        for (let specie of this.species) {
            specie.update();
            // allSpeciesFitness.push(specie.speciesFitness);
        }
        // this.ecosystemFitness = average(allSpeciesFitness);

        // if (this.timer % this.speciesSelectionFreq == 0)
        //     this.speciesSelection();
    }

    // cloneEcosystem(clonedEcosystem){
    //     //Replace each species in a ecosystem with another ecosystem' species
    //     for (let s in this.species){
    //         this.cloneSpecies(clonedEcosystem.species[s]);
    //     }
    // }

    speciesSelection() {
        this.species.sort((b, a) => (a.speciesFitness > b.speciesFitness) ? 1 : -1);

        this.species[this.species.length-1].cloneSpecies(this.species[0]);
        this.bestSpecies = this.species[0];

        //set mutation of mutation rate and reset fitness
        for (let s=0; s < this.species.length - 1; s++){
            this.species[s].mutMutRate = s/(this.species.length*15) + 0.02; 
            this.species[s].speciesFitness = 0;
        }
        
        if (this.speciesSelectionFreq + this.deltaSelectionFreq <= this.maxSpeciesSelectionFreq)
            this.speciesSelectionFreq += this.deltaSelectionFreq;
    }

    getBestInEcosystem(){
        return this.bestSpecies.bestGroup.bestMind;
    }
}

export default Ecosystem;

const total = (nums) => nums.reduce((a, b) => (a + b));
const average = (nums) => total(nums) / nums.length;
