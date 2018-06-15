// BUDGET CONTROLLER
var budgetController = (function() {
    
    //some code

})();


// UI CONTROLLER
var UIController = (function () {
    
    //some code

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl){

    var ctrlAddItem = function(){
         
        // 1. Get the field input data

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

        console.log("Teste ctrlAddItem");
    };
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback
    document.addEventListener('keypress', function(event) {
        
        // .which is for older browsers
        if( event.keyCode === 13 || event.which === 13){
            event.preventDefault();
            ctrlAddItem();
        }
    });

})(budgetController, UIController);

// The controller module has access to both Budget and UI modules
// but it won't work the other way around.