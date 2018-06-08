
var BornYears = [2010, 1989, 1956, 1987];

// var ages = [];

// for(var i = 0; i <= BornYears.length; i++){
//     ages[i] = 2018 - BornYears[i];
//     if(ages[i] >= 18){
//         console.log(ages[i]);
//     }
// }


function PrintFullAge (YearsArray){

    var ages = [];
    var output = [];

    for(var i = 0; i < BornYears.length; i++){
        ages[i] = 2018 - BornYears[i];
        if(ages[i] >= 18){
            console.log(ages[i]);
            output.push(true);
        } else {
            output.push(false);
        }
    }
    return console.log(output);
}


PrintFullAge(BornYears);
