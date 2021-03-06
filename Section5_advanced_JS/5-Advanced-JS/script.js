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

/*
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
*/

/*
/////////////////////////////////////////////
// Lecture: Immediately invoked Function Expressions (IIFE)

// function game(){
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

// (function () {})() => function inside parentheses + call
(function (arg) {
    var score = Math.random() * 10;
    console.log(score >= 5);
    console.log(arg);
})(12);
*/

/*
/////////////////////////////////////////////
// Lecture: Closures

// after a function closes its context exectuion, the variables inside that function are still
// accessible. So, inner functions inside that function still have access to those variables because
// of the scope chain.

// function retirement(retirementAge){
//     a = ' years left until retirement';

//     return function(yearOfBirth){
//         var age = 2018 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//     };
// }

// var retirementBR = retirement(65);
// retirementBR(1989);

// retirement(70)(1990);

//// mini challenge rewrite interviewQuestion with closures

function interviewQuestion(job){
    d = ", tell me what is UX.";
    t = ', tell me about teaching skills';
    g = ', what do you do?';

    return function(name){
        if (job === 'designer'){
            console.log(name + d);
        } else if (job === 'teacher') {
            console.log(name + t);
        } else {
            console.log(name + g);
        }
    };
}

var designQuestion = interviewQuestion('designer');
designQuestion('Kylrn');

interviewQuestion('teacher')('Moana');
*/

/////////////////////////////////////////////
// Lecture: Bind, call and apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay){
        if (style === 'formal'){
            console.log('Good ' + timeOfDay + ', ladies and gentleman! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if(style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay);
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('friendly', 'morning');

john.presentation.call(emily, 'formal', 'afternoon'); // method borrowing using 'call'

john.presentation.apply(emily, ['friendly', 'night']); // method borrowing using 'apply'

var johnFriendly = john.presentation.bind(john, 'friendly');
var emilyFriendly = john.presentation.bind(emily, 'formal', 'morning');

console.log('Bind Method');

johnFriendly('afternoon;')
emilyFriendly();


//// another bind example
//// in this case arrayCalc receveis a function fn with only one argument
//// but if the function receveid had more than one arguments, then its
//// necessary to bind them, so we can pre set the necessary arguments
//// and with that the function arrayCalc continues to recevei
//// functions fn with only one argument
var years = [1990, 1965, 1937, 2005, 1999];

function arrayCalc(arr, fn){
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(year){
    return (2018 - year);
}

function isFullAge(limit, age){
    return age >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullAgeJapan = arrayCalc(ages, isFullAge.bind(this, 20));
///// bind creates a copy of the isFullAge with the argument
//// 'limit' pre set to 20.
console.log(ages);
console.log(fullAgeJapan);
