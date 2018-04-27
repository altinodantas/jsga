class Solution{

    constructor(chromosome) {
        this.chromosome = chromosome;
        this.evaluate();
      }

    evaluate(chromosome){
        this.fitness = evaluateF6(this.chromosome);
    }

}

class GA {

    constructor(populationSize, mutationRate, crossoverRate){
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.crossoverRate = crossoverRate;

        this.population = [];
        this.offspring = [];
    }

    initializePop(){
        for (let i = 0; i < this.populationSize; i++) {
            this.population.push(randomSolution());
        }
    }

    performCrossOver(){
        while (this.offspring.length < this.populationSize) {
            let fatherA = this.tournementK(3);
            let fatherB = this.tournementK(3);

            if(Math.random() < this.crossoverRate){
                let sons = this.onePointX(fatherA, fatherB);
                this.offspring.push(sons[0]);
                this.offspring.push(sons[1]);
            }else{
                this.offspring.push(new Solution(fatherA.chromosome));
                this.offspring.push(new Solution(fatherB.chromosome));
            }
        }

    }

    onePointX(fatherA, fatherB){
        let sons = [];
        let chromosomeA = [];
        let chromosomeB = [];

        let cutPoint = Math.floor(Math.random() * fatherA.chromosome.length - 1) + 1;

        for (let i = 0; i < fatherA.chromosome.length; i++) {
            if (i < cutPoint) {
                chromosomeA.push(fatherA.chromosome[i]);
                chromosomeB.push(fatherB.chromosome[i]);
            }else{
                chromosomeA.push(fatherB.chromosome[i]);
                chromosomeB.push(fatherA.chromosome[i]);
            }
        }    

        sons.push(new Solution(chromosomeA));
        sons.push(new Solution(chromosomeB));

        return sons;
    }

    mutation(){
        for (let i = 0; i < this.offspring.length; i++) {
            for (let j = 0; j < this.offspring[i].chromosome.length; j++) {
                if (Math.random() < this.mutationRate) {
                    if (this.offspring[i].chromosome[j] == 1) {
                        this.offspring[i].chromosome[j] = 0;
                    }else {
                        this.offspring[i].chromosome[j] = 1;
                    }
                    this.offspring[i].evaluate();
                }
            }
        }
    }

    tournementK(k){

        let listK = Array.from({length: k}, () => Math.floor(Math.random() * this.populationSize));
        listK.sort(function(a,b){
            return b - a;
        });

        return this.population[listK[0]];
    }

    mergePop(){
        this.offspring.forEach(element => {
            this.population.push(new Solution(element.chromosome));
        });
        this.offspring = [];
        this.population.sort(orderPop);
        this.population.splice(this.populationSize);
    }

    average(){
        let sum = 0;
        this.population.forEach(element => {
            sum += element.fitness;
        });
        return sum;
    }
}

function orderPop(a,b){
    if(a.fitness > b.fitness){
        return -1;
    }
    if(a.fitness < b.fitness){
        return 1;
    }
    return 0;
}

function randomSolution(){
   return new Solution(Array.from({length: 44}, () => Math.floor(Math.random() * 2)));
}

function evaluate(chromosome){
    let fitness = 0.0;
    chromosome.forEach(gene => {
        fitness += gene;
    });
    return fitness;
}

function evaluateF6(chromosome){
    let x = 0;
    let y = 0;
    let xsqrdysqrd = 0;
    let bound = chromosome.length / 2;
		
    let bin_x = []; 
    let bin_y = [];
    
    for (let i = 0; i < bound; i++) {
        bin_x[i] = chromosome[i];
        bin_y[i] = chromosome[i + bound];
    }
    
    for (let i = 0; i < bound; i++) {
        x += bin_x[i] * Math.pow(2, bound - i - 1);
        y += bin_y[i] * Math.pow(2, bound - i - 1);
    }
    
    x = -100 + x * (200) / (Math.pow(2, bound) - 1);
    y = -100 + y * (200) / (Math.pow(2, bound) - 1);
    
    xsqrdysqrd = x * x + y * y;
    
    return ((0.5 - (Math.pow(Math.sin(  Math.sqrt(xsqrdysqrd)),2) - 0.5) / Math.pow((1 + 0.001 * xsqrdysqrd), 2)));
}

function printF6(chromosome){
    let x = 0;
    let y = 0;
    
    let bound = chromosome.length / 2;
		
    let bin_x = []; 
    let bin_y = [];
    
    for (let i = 0; i < bound; i++) {
        bin_x[i] = chromosome[i];
        bin_y[i] = chromosome[i + bound];
    }
    
    for (let i = 0; i < bound; i++) {
        x += bin_x[i] * Math.pow(2, bound - i - 1);
        y += bin_y[i] * Math.pow(2, bound - i - 1);
    }
    
    x = -100 + x * (200) / (Math.pow(2, bound) - 1);
    y = -100 + y * (200) / (Math.pow(2, bound) - 1);
    
    console.log("x: " + x + " y: " + y);
}

function runOneGeneration() {
    ga.performCrossOver();
    ga.mutation();
    ga.mergePop();
    ga.population.sort(orderPop);
   
    count++;
   
    if (count == 500) {
        stopFunction();
        printF6(ga.population[0].chromosome);
    }

    //console.log(ga.average());
    console.log(ga.population[0].fitness)
}

function stopFunction() {
    clearInterval(runningVar);
}

var ga = new GA(100, 0.02, 0.8);
let count = 0;

ga.initializePop();

runningVar = setInterval(function(){ runOneGeneration() }, 100);

