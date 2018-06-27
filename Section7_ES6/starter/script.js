//////////////////////////////////////////////////////////////////////
// Lecture: let and const
/*
// ES5
var name5 = 'Bob';
name5 = 'Chad'; // it can change

// ES6
const name6 = 'Bob'; // It cannot be changed
let age6 = '23'; // it can be changed.

//var and let can vary but const cannot

//// function scope x block scope
// let and const works in block scope, var works in function scope

// ES5
function PrintTest5() {
    console.log(variable + ' inside block scope'); // logs undefined because of hoisting

    if (2 > 0){
         var variable = 'variable';
        console.log(variable + ' inside block scope');
    }
    console.log(variable + ' inside function scope');
}

PrintTest5();

// ES6
function PrintTest6() {
    if (2 > 0){
        let lettest = 'variable';
        const constest = 'const test';
        console.log(lettest + ' inside block scope');
        console.log(constest + ' inside block scope');
    }
    // it wont log because the variables are inside the if block. (throws an error)
    //console.log(lettest + ' inside block scope');
    //console.log(constest + ' inside function scope');
}

PrintTest6();

var i = 23;

for (var i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i); // logs 5 because variables are function scoped

let j = 23;

for(let j = 0; j < 5; j++) {
    console.log(j);
}

console.log(j); // logs 23 because let is block scoped
*/

//////////////////////////////////////////////////////////////////////
// Lecture: let and const

// ES6
/*
{
    // works like an IIFE (they exists only inside the block)
    let a = 1;
    const b = 2;
}

// ES5
(function () {
    var c = 1;
})();
*/

//////////////////////////////////////////////////////////////////////
// Lecture: let and const

let firstName = 'John';
let lastName = 'Snow';
const yearOfBirth = '1995';
function calcAge(yearOfBirth){
    return 2018 - yearOfBirth;
}

// Template literals, works like python "string {0} bla bla bla {1}".format(value1, value2)
console.log(`The man ${firstName} ${lastName}, knows nothing. He is ${calcAge(yearOfBirth)} years old.`);
