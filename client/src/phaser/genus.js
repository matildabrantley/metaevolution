//Genus-Species mirrors Species-Group relationship at a higher level
const Species = require('./species');


class Genus {
    constructor({speciesSelectionFreq = 100, maxSpeciesSelectionFreq = 600, deltaSelectionFreq = 50} = {}, species = []){
        this.species = species;
        this.timer = 0;
        this.speciesSelectionFreq = speciesSelectionFreq;
        this.maxSpeciesSelectionFreq = maxSpeciesSelectionFreq;
    }

    //Let's pretend "specie" is the correct singular of "species" =)
    addSpecies(specie){
        this.species.push(specie);
    }

    update() {
        this.timer++;
        let allSpeciesFitness = [];
        for (let specie of this.species) {
            specie.update();
            allSpeciesFitness.push(specie.speciesFitness);
        }
        this.genusFitness = average(allSpeciesFitness);

        if (this.timer % this.speciesSelectionFreq == 0)
            this.speciesSelection();
    }

    // cloneGenus(clonedGenus){
    //     //Replace each species in a genus with another genus' species
    //     for (let s in this.species){
    //         this.cloneSpecies(clonedGenus.species[s]);
    //     }
    // }

    speciesSelection() {
        this.species.sort((b, a) => (a.speciesFitness > b.speciesFitness) ? 1 : -1);

          this.species[this.species.length-1].cloneSpecies(this.species[0]);

        //reset fitness
        for (let specie of this.species)
            specie.groupFitness = 0;
        
        if (this.speciesSelectionFreq + this.deltaSelectionFreq <= this.maxSpeciesSelectionFreq)
            this.speciesSelectionFreq += this.deltaSelectionFreq;
    }
}

module.exports = Genus;

const total = (nums) => nums.reduce((a, b) => (a + b));
const average = (nums) => total(nums) / nums.length;
