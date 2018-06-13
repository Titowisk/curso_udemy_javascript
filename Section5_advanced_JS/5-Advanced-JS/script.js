// function constructor

/*
// one way to create object
// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

// constructor way
var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // this.calculateAge = function() {
    //     console.log(2018 - this.yearOfBirth);
    // };
};

// Adds a method to the constructors prototype
// each object created will imherit it
Person.prototype.calculateAge = function (){
    console.log(2018 - this.yearOfBirth);
};

// Adds a attribute to the constructors prototype
// each object created will imherit it
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher'); // instantiation
// 'new' make the 'this' variable inside the constructor to point to this newly created object
// when the function constructor is called

var mike = new Person('Mike', 1985, 'designer');
var jake = new Person('Jake', 1986, 'police');
// each object created have a calculateAge method wich is no very efficient
// it's better that each object have access to the method but doesn't keep a copy of it inside itself.
// Prototype is the way to go then.

john.calculateAge();
mike.calculateAge();
jake.calculateAge();

console.log(mike.lastName);

// javascript inheritance works through prototypes
*/

/*
// Object.create method
var personProto = {};

var john =  Object.create(personProto);
// john object HAS this attributes
john.name = 'John';
john.yearOfBirth = 1990;

var jane = Object.create(personProto, {
    // jane object INHERIT DIRECTLY this objects
    name: { value: 'jane'},
    yearOfBirth: { value: 1984 }
});
*/

/*
// Primitives x Objects
// variables saves primitives in themselves 
var a = 23;
var b = a;
a = 46;
console.log(a); // prints 46
console.log(b); // prints 23

// but with objects, they only saves the pointer
// so both obj1 and obj2 points to the same object
var obj1 = { name: 'john', age: 25 };
var obj2 = obj1;
obj1.age = 88;
console.log(obj1.age); // prints 88
console.log(obj2.age); // prints 88

// functions
// the same thing happens with functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a,b){
    a = 30;
    b.city = 'tokyo';
}

change(age, obj); // the function change receives a copy of the 'age' value and the address (pointer) of the object 'obj'

console.log(age);
console.log(obj.city);
*/

/*
/////////////////////////////////////////////
// Lecture: Passing functions as arguments (callback functions)

var years = [1990, 1965, 1937, 2005, 1998];

// arrayCalc receives a function fn as an argument
function arrayCalc(arr, fn){
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

// each of the functions below are passed as arguments into the function arrayCalc
function calculateAge(year){
    return (2018 - year);
}

function isFullAge(age){
    return age >= 18;
}

function maxHeartRate(age){
    if(age >= 18 && age <= 81){
        return Math.round(206.9 - (0.67 * age));
    } else {
        return -1;
    }
}

var ages = arrayCalc(years, calculateAge);
console.log(ages);

fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);

rates = arrayCalc(ages, maxHeartRate);
console.log(rates);
*/

/////////////////////////////////////////////
// Lecture: Functions returning functions

function interviewQuestion(job){
    if ( job === 'designer'){
        return function(name){
            console.log(name + ' can you please explain what UX design is?');
        }
    } else if (job === 'teacher'){
        return function(name){
            console.log('What subject do you teach, ' + name + ' ?');
        }
    } else {
        return function(name){
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('Luke');

// One can make a double call to call the functions
interviewQuestion()('Robert');
interviewQuestion('designer')('Katie');