var n = '10000000'; // 10,000,000

var putComma = function(number){

    if (number.length > 3) {

        number = putComma( number.substr(0, number.length - 3) ) + ',' + number.substr(number.length - 3, 3);
        return number;

    } else {

        return number;
    }

};

var res = putComma(n);

console.log(res);