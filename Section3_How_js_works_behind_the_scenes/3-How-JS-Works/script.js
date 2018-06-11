///////////////////////////////////////
// Lecture: Hoisting

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


var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
// The function third is global, therefore the function second() has access to it. 
// But the third function doesn't have access to the function second().



///////////////////////////////////////
// Lecture: The this keyword









