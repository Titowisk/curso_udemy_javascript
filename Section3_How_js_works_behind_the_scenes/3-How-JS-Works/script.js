///////////////////////////////////////
// Lecture: Hoisting
/*
//function hoisting
calculateAge(1989);

function calculateAge(year){ // function declaration
    console.log(2018 - year);
}

// Hoisting: permits to use a function before declaring it.
// it only works with functions declarations

// retirement(1989);

var retirement = function (year){ //function expression
    console.log(65 - (2018 - year));
};

retirement(1989);

//variables hoisting


console.log(age); //undefined
var age = 23;

function foo(){
    console.log(age); //undefined
    var age = 35;
    console.log(age); // 35
}
foo();
console.log(age); //23
*/


///////////////////////////////////////
// Lecture: Scoping


// First scoping example


// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         console.log(a + b + c);
//     }
// }




// Example to show the differece between execution stack and scope chain


// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         third()
//     }
// }

// function third() {
//     var d = 'John';
//     console.log(a + b + c + d);
// }
// The function third is global, therefore the function second() has access to it. 
// But the third function doesn't have access to the function second().



///////////////////////////////////////
// Lecture: The this keyword

// console.log(this);

// calculateAge(1986); // prints 30 and window object

// function calculateAge(year){
//     console.log(2016 - year);
//     console.log(this);
// }

var john = {
    name: 'john',
    calculateAge: function (){
        console.log(this);
        /*
        function innerF (){
            console.log(this);
        }
        innerF(); // this will refer to window, because its a regular function.
        */
    }
};

john.calculateAge();

// var ball = function(){
//     console.log(this);
// }

// ball();

var mike = {
    name: 'Mike'
};

mike.calculateAge = john.calculateAge; // method borrowing
mike.calculateAge();

// in regular functions (statements or expressions) 'this' refers to global object
// in methods 'this' refers to the object created.



