// BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

})();


// UI CONTROLLER
var UIController = (function () {
    
    // private
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    // public
    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // can be 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
            
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl){

    var setUpEventListeners = function() {

        var DOM = UICtrl.getDOMstrings(); // receives an object with DOMstrings;

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback
        document.addEventListener('keypress', function(event) {
            
            // .which is for older browsers
            if( event.keyCode === 13 || event.which === 13){
                event.preventDefault();
                ctrlAddItem();
            }
        });

    };

    var ctrlAddItem = function(){
         
        // 1. Get the field input data
        var input = UICtrl.getInput(); // receives an object with the inputs
        console.log(input);

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    return {
        init: function() {
            console.log('Application has started.');
            setUpEventListeners();
        }
    };
    
})(budgetController, UIController);

// The controller module has access to both Budget and UI modules
// but it won't work the other way around.

controller.init();