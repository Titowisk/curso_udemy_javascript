////////////////////////////////////////////////////////////////
// BUDGET CONTROLLER
////////////////////////////////////////////////////////////////

var budgetController = (function() {
    
    // Expense Constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Income Constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // calculates the total of exp or inc
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    // data structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 // -1 indicates that it doesn't exist yet
    };

    return {
        addItem: function(type, description, value){
            var newItem, ID;

            // creates ID
            if(data.allItems[type].length === 0){
                ID = 0;
            } else {
                // brackets notation for objects
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                //data.allItems['inc'][1].id
            }
            
            // creates each item by its type (Expense or Income)
            if( type === 'exp'){
                newItem = new Expense(ID, description, value);
            } else if( type === 'inc'){
                newItem = new Income(ID, description, value);
            }

            // saves each item in a list
            data.allItems[type].push(newItem);

            // return the newly created item
            return newItem;
        },
        calculateBudget: function() {
           
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
           
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp; // budget means orçamento

            // calculate the percentage of income spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },
        getBudget: function() {
          return {
              budget: data.budget,
              totalInc: data.totals.inc,
              totalExp: data.totals.exp,
              percentage: data.percentage
          };  
        },
        test: function(){
            return data;
        }
    };

})();

////////////////////////////////////////////////////////////////
// UI CONTROLLER
////////////////////////////////////////////////////////////////
var UIController = (function () {
    
    // private
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    };
    
    // public
    return {
        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholdertext
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if(type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id); // the %<something>% facilitates the identification of the replacement spots
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //insert HTML into the DOM
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function() {
            // my choice
            // document.querySelector(DOMstrings.inputDescription).value = "";
            // document.querySelector(DOMstrings.inputValue).value = "";

            // another choice

            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            // https://developer.mozilla.org/en-US/docs/Web/API/NodeList
            fields.forEach(function(current, index, obj) {
                current.value = "";
            });

            fields[0].focus();
            //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus

        },
        displayBudget: function(obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;

            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // can be 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
            };
            
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

////////////////////////////////////////////////////////////////
// GLOBAL APP CONTROLLER
////////////////////////////////////////////////////////////////

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

        // event delegation
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };

    var updateBudget = function() {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function(){
         var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput(); // receives an object with the inputs: {type, description, value}

        if (!isNaN(input.value) && input.description !== "" && input.value > 0){

            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and Update budget
            updateBudget();
        }
    };
    
    var ctrlDeleteItem = function(event){ // custom callback function of EventListener
        var itemID, splitID, type, ID;

        itemID = event.path[4].id; // inc-1 or exp-1
        
        // professor code
        // var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // console.log(itemID);

        if(itemID){

            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];
        }
        
        // 1. delete the item from the data structure

        // 2. delete the item from UI

        // 3. update and show the new budget

    };

    return {
        init: function() {
            console.log('Application has started.');
            var initialBudget = budgetCtrl.getBudget(); // this will get all values from data that is empty yet
            UICtrl.displayBudget(initialBudget);
            setUpEventListeners();
        }
    };
    
})(budgetController, UIController);

// The controller module has access to both Budget and UI modules
// but it won't work the other way around.

controller.init();