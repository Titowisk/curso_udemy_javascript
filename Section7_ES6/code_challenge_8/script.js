// Code Challenge 8

class UrbanElement {

    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Street extends UrbanElement {

    constructor(name, buildYear, length, size = 'normal') {
        super(name, buildYear);
        this.length = length; 
        this.size = size; // tiny/small/normal/big/huge
    }

    sizeToString () {

        let sizeDescription = `${this.name} is a ${this.size} street.`;
        return sizeDescription;
    }

}

class Park extends UrbanElement {

    constructor(name, buildYear, area, trees) {
        super(name, buildYear);
        this.area = area;
        this.trees = trees;
    }

    treeDensity () {

        let density = this.trees/this.area;
        return density.toFixed(2);
    }

    treeDensityToString () {

        return `The density of the ${this.name} is of ${this.treeDensity()} trees per km.`;
    }

    calculateAge () {
        return 2018 - this.buildYear;
    }
}

let allParks = [
    new Park('Green Park', 1956, 30, 3500),
    new Park('National Park', 1942, 50, 5900),
    new Park('Jurassic Park', 2010, 500, 150600)
];

// Calculates averageAges
let sumAges;

allParks.forEach(park => {
    sumAges += park.calculateAge();
})
let averageAge = sumAges / allParks.length

// prints each park
function printParks(parkArr) {
    parkArr.forEach( park => console.log(park.treeDensityToString()) );
}

// finds the park with the greater number of trees
function greaterPark (parkArr) {
    
    let maxTrees = 0;
    let greaterPark;

    parkArr.forEach(park => {
        if (park.trees >= maxTrees) {
            maxTrees = park.trees;
            greaterPark = park.name;
        }
    });

    console.log(`${greaterPark} has the most quantity of trees: ${maxTrees} trees`)

}

let allStreets = [
    new Street('Baker Street', 1850, 2, 'small'),
    new Street('Raul Leite Street', 1980, 7),
    new Street('Harley Street', 1868, 12, 'big'),
    new Street("Elm's Street", 1928, 9, 'huge')
];

// calculates total lenght
let totalLength = 0;
for ( let street of allStreets) {
    totalLength += street.length;
}
//  = street1.length + street2.length + street3.length + street4.length;
let averageLenght = totalLength / allStreets.length;


// Park Report
// Tree density of each park
// Average age of all town's park
// name of the park with the most quantity of trees
console.log('--- Park Report ---');
printParks(allParks);
console.log(`Our 3 parks have an average of ${averageAge.toFixed(0)} years of existence.`);
greaterPark(allParks);

// Street Report
// Total and average street lenght
// size classification of all streets
console.log('\n--- Street Report ---');
for ( let street of allStreets ) {
    console.log(street.sizeToString());
}
console.log(`The total lenght of the streets are ${totalLength} km and the average lenght is ${averageLenght.toFixed(2)} km`);
