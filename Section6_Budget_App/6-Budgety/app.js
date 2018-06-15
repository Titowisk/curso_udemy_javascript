// UI moduloe, Data Module and Controller

var budgetController = (function() {

    var x = 23;

    var add = function(a) {
        return x + a;
    };

    return {
        publicTest: function(b) {
            console.log("add = " + add(b));
            return add(b);
        }
    };
})();

var UIController = (function () {
    //some code

})();


var controller = (function (budgetCtrl, UICtrl){
    
    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublic: function() {
            console.log("z = " + z);
        }
    };

})(budgetController, UIController);

// The controller module has access to both Budget and UI modules
// but it won't work the other way around.