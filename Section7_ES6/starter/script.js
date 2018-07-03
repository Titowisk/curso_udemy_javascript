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
// Lecture: Blocks and IIFES

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
// Lecture: Strings

/*
let firstName = 'John';
let lastName = 'Snow';
const yearOfBirth = '1995';
function calcAge(yearOfBirth){
    return 2018 - yearOfBirth;
}

// Template literals, works like python "string {0} bla bla bla {1}".format(value1, value2)
console.log(`The man ${firstName} ${lastName}, knows nothing. He is ${calcAge(yearOfBirth)} years old.`);
*/

//////////////////////////////////////////////////////////////////////
// Lecture: Arrow Functions
/*
// ES5
const years = [1990, 1965, 1982, 1937];

var ages5 = years.map(function (year){
    return 2018 - year;
});

console.log(ages5);

// ES6: three ways to code arrow functions

var ages6 = years.map(year => 2018 - year);
console.log(ages6);

ages6 = years.map((year, index) => `Age ${index + 1}: ${2018 - year}`);
console.log(ages6);

ages6 = years.map((year, index) => {
    return `TiAge ${index + 1}: ${2018 - year}`;
});
console.log(ages6);
*/

//////////////////////////////////////////////////////////////////////
// Lecture: Arrow Functions and 'this' variable
/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function (){
        var self = this; // this won't work otherwise
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box ' + self.color + ', number ' + self.position;
            alert(str);
        });
    }
};

// when inside a method, 'this' points to the object to wich the method belongs
// but when inside a regular function, 'this' points to the window object

//box5.clickMe();

// ES6
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function (){
        document.querySelector('.green').addEventListener('click',() =>{
            var str = 'This is box ' + this.color + ', number ' + this.position;
            alert(str);
        });
    }
};
// using arrow functions, the 'this' keyword works again, pointing to the box6 object
// it shares the lexicall this keyword with its surroundings

// box6.clickMe();

var box66 = {
    color: 'green',
    position: 1,
    clickMe: () => { // using the arrow function here, makes the 'this' keyword to point to the global object window
        document.querySelector('.green').addEventListener('click',() =>{
            var str = 'This is box ' + this.color + ', number ' + this.position;
            alert(str);
        });
    }
};
// using arrow functions, the 'this' keyword works again, pointing to the box6 object
// it shares the lexicall this keyword with its surroundings

// box66.clickMe();

function Person(name){
    this.name = name;
}

// ES5 
Person.prototype.myFriends5 = function (friends){
    var arr = friends.map(function(friend){
        return this.name + ' is friends with ' + friend;
    });

    console.log(arr);
};

// var friends = ['Tim', 'Bob'];
// new Person('John').myFriends5(friends); // this already works despite what the professor said

// ES6
Person.prototype.myFriends5 = (friends) => {
        let arr = friends.map(function(friend){
        return `${this.name} is friends with THE ${friend}`;
    });

    console.log(arr);
};

let friends = ['Tim', 'Bob'];
new Person('John').myFriends5(friends);
*/

//////////////////////////////////////////////////////////////////////
// Lecture: Destructuring

// ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];

// ES6 
// const [name, age] = ['John', 26];

// this destructuring can be used to unpack the returned values of a function :)


//////////////////////////////////////////////////////////////////////
// Lecture: Arrow Functions and 'this' variable
/*
var boxesArr = document.querySelectorAll('.box'); // NodeList

boxesArr.forEach(function (cur){
    cur.style.backgroundColor = 'dodgerblue';
});

//ES5
for (var i = 0; i < boxesArr.length; i++) {

    if (boxesArr[i].className === 'box blue'){
        continue;
    }
    boxesArr[i].textContent = 'I changed to Blue';
}

//ES6
for (const cur of boxesArr){

    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    if ( cur.className.includes('blue') ){
        continue;
    }
    cur.textContent = 'I changed to Blue';
}

// ES5 
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur){
    return cur >= 18;
});
console.log(full.indexOf(true));


// ES6
console.log(ages.findIndex(cur => cur >= 18));
*/

//////////////////////////////////////////////////////////////////////
// Lecture: Spread Operator
/*
function addFourAges(a,b,c,d){
    return a+b+c+d;
}
var sum1 = addFourAges(18, 12, 15, 25);
console.log(sum1);

// ES5

var ages = [18, 12, 15, 25];
var sum2 = addFourAges.apply(null, ages); // apply loops through each element of the array or array-like object
console.log(sum2);

// ES6 - spread operator

var sum3 = addFourAges(...ages); // each value inside the array is assigned as one argument
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familySmiters = ['Mary', 'Bob', 'Flanders'];
const bigFamily = [...familySmith, ...familySmiters];
console.log(bigFamily);
*/

//////////////////////////////////////////////////////////////////////
// Lecture: Rest parameters
/*
// ES5
function isFullAge5(){
    //console.log(arguments); https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
    var argsArr = Array.prototype.slice.call(arguments);
    argsArr.forEach(function(cur){
        console.log(2018 - cur >= 18);
    });
}

// isFullAge5(1990, 2005, 1965);

// ES6
function isFullAge6(limit, ...years) { // receives multiple individual arguments
    years.forEach(cur => console.log(2018 - cur >= limit));
}

isFullAge6(21, 1990, 1999, 1980);
isFullAge6(18, ...[1990, 1999, 1980]); // rest parameters with spred operator
*/

//////////////////////////////////////////////////////////////////////
// Lecture: Default Parameters
/*
// ES5
// In ES5, to use default parameters one must use if statements in order to do so

// ES6
// we can just assigned a default value in the arguments location
function SmithPerson(fName, lName = 'Smith', yearOfBirth, nationality = 'American'){
   
    this.fName = fName;
    this.lName = lName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;

}
*/

//////////////////////////////////////////////////////////////////////
// Lecture: Maps

// maps seems like dictionaries in python
// professor said that is better to use maps over objects, in order to use hashmaps