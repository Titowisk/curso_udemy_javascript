(function quizGame () {

    var quizList;
    var score = 0;

    quizList = [];

    // Question constructor
    function Question(question, answearsList, correctAnswear){

        this.question = question;
        this.answearsList = answearsList;
        this.correctAnswear = correctAnswear;

    }

    //// prototype
    Question.prototype.logQuestion = function(){
        console.log(this.question);
        for(var i = 0; i < this.answearsList.length; i++){
            console.log(i + ': ' + this.answearsList[i]);
        }
    };

    Question.prototype.checkAnswear = function(answear){

        if ( answear === this.correctAnswear ){
            console.log("Correct Answear!!");
            score += 1;
            console.log("Your score is: " + score);
        } else {
            console.log("Wrong answear");
        }
    };

    // Questions creation
    var firstQuestion = new Question(
        question = 'What\'s the name of the movie with Beatrix Kiddo?',
        answearsList = [
            'The GodFather', //0
            'Kill Bill', //1
            'Wreck it Ralph' // 2
        ],
        correctAnswear = '1'
    );
    quizList.push(firstQuestion);

    var secondQuestion = new Question();
    secondQuestion.question = "One of those is a baddas, which one is it?";
    secondQuestion.answearsList = [
        "John Wick",
        "Mogli",
        "Scooby-Doo"
    ];
    secondQuestion.correctAnswear = '0';
    quizList.push(secondQuestion);

    var thirdQuestion = new Question(
        question = "Where Geralt is from?",
        answearsList = [
            "Rivia",
            "Kaer Morhen",
            "Unknown"
        ],
        correctAnswear = '2'
    );
    quizList.push(thirdQuestion);

    var fourthQuestion = new Question(
        question = "What is the name of the greates hero of Legend of Zelda?",
        answearsList = [
            "Zelda",
            "Link",
            "Blond haired elf dude"
        ],
        correctAnswear = '1'
    );
    quizList.push(fourthQuestion);

    // Quiz Game
    var random;
    var userAnswear;
    var currentQuestion;
    
    console.log("Welcome to the Quiz Game");
    while (userAnswear !== 'exit') {
        
        console.log("\n");
        random = getRandomInt(0, quizList.length);
        currentQuestion = quizList[random];
        currentQuestion.logQuestion();
        userAnswear = prompt("Please write one answear number (type 'exit' to leave)")
        currentQuestion.checkAnswear(userAnswear);
        console.log("\n------------------------------");
    }

    // Functions

    function getRandomInt (min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

})();
