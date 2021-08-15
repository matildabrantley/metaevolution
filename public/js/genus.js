//Genus-Species mirrors Species-Group relationship at a higher level
class Genus {
    constructor(species = []){
        this.species = species;
        this.timer = 0;
        this.speciesSelectionFreq = 600;
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

    cloneSpecies(replacedSpecies, clonedSpecies){
        //Replace each group in a species with another species' groups
        for (let g in replacedSpecies.groups){
            replacedSpecies.cloneGroup(replacedSpecies.groups[g], clonedSpecies.groups[g]);
        }
    }

    speciesSelection() {
        this.species.sort((b, a) => (a.speciesFitness > b.speciesFitness) ? 1 : -1);

        this.cloneSpecies(this.species[0], this.species[this.species.length-1]);
    }
}