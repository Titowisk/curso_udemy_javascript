/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

///////////////////////////////////////////////////////////////////////////////////////
// Game Inital Settings

//// Global Variables
var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll, matchGoal;

gameStartSettings();

///////////////////////////////////////////////////////////////////////////////////////
// Functions

function gameStartSettings() {

    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousDiceRoll = 0;

    //match goal
    matchGoal = document.getElementById('match-goal').value;

    //// sets all numbers to 0 (game start)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none'; // do not display dice untils its used

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}

function getRandomInt (min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextPlayer () {
    //Next player
    document.getElementById('current-' + activePlayer).textContent = '0'; //set the curent to 0
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active'); // removes 'active' from previous player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // switch players
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active'); // add 'active' to new player
    roundScore = 0;
    previousDiceRoll = 0;
    // instead of 'add' and 'remove' I could use 'toggle'
}



//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);


///////////////////////////////////////////////////////////////////////////////////////
// Roll Dice Buton
document.querySelector('.btn-roll').addEventListener('click', function() {
    // https://developer.mozilla.org/en-US/docs/Web/Events

    if(gamePlaying) {

        // 1. Random Number
        var dice = getRandomInt(1, 6); // both inclusive

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; // displays the dice once its rolled
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT 1
        if(dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if((previousDiceRoll === 6) && (dice === 6)){
                roundScore = 0;
                nextPlayer();
            }
            previousDiceRoll = dice;
            
        } else {
            //Next player
            nextPlayer();
        }
    }
    
    
});



///////////////////////////////////////////////////////////////////////////////////////
// Hold Score button
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying){

        // Add player's Current score to Global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won
        if(scores[activePlayer] >= matchGoal){

            document.querySelector('.player-' + activePlayer + '-panel ').classList.add('winner');
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        } 
    }
   
});

///////////////////////////////////////////////////////////////////////////////////////
// New Game Button

document.querySelector('.btn-new').addEventListener('click', gameStartSettings);