// function constructor

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