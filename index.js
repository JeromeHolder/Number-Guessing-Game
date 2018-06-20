// Makes readline-sync available
const readlineSync = require('readline-sync');

// Gets username and prints greeting
function getName() {
    const name = readlineSync.question('What is your name? ');
    console.log("Hello " + name);
}

// Asks user for a number input that will act as max of random number range, tests input for NaN
function getMaxFromUser() {
    let number = Number(readlineSync.questionInt('Choose a number: ', {limitMessage:'That is invalid.'}));
    return number;
}

// Accepts user's input number and returns a random number between 0 and the input
function generateRandomNumber(number) {
    let max = Math.floor(number);
    let randomNum = Math.floor(Math.random() * (max));
    return randomNum;
}

// Accepts random number and user's input number, prompts user to make a guess, tests input for NaN
function getGuessFromUser(randomNum, number) {
    console.log("Great!  Let's Play!");
    let guess = Number(readlineSync.questionInt("Guess a number between 0 and " + number + ": ", {limitMessage:'That is invalid.'}));
    return guess;
}

// Accepts user's guess and random number, tests if guess is higher or lower than random number, returns true if not (i.e. equal to random number)
function isGuessCorrect(guess, randomNum) {
    if (guess > randomNum) {
        console.log("Too high!");
        return false;
    } 
    else if (guess < randomNum) {
        console.log("Too low!");
        return false;
    } 
    else {
        return true;
    }
}

// Runs when the user guesses the correct number and asks if they want to play again
function playAgain(randomNum) {
    console.log("Correct!  The number was " + randomNum + ".");
    let playAnswer = readlineSync.keyInYNStrict("Would you like to play again? ");
    if (playAnswer === true) {
        return true;
    } 
    else {
        console.log("Thanks for playing.");
        return false;
    }
}

// Runs all other functions to play the game
function startGame() {
    getName();
    gameLoop();
    function gameLoop() {
        let score = 20;
        let oldScore = 0;
        let Max = getMaxFromUser();
        if ((Max !== 0) && (Max > 0)) {
            let rnd = generateRandomNumber(Max);
            let userGuess = getGuessFromUser(rnd, Max);
            let guessCorrect = false;
            while (!isGuessCorrect(userGuess, rnd)) {
                score = score - 1;
                userGuess = Number(readlineSync.questionInt("Try again: ", {limitMessage:'That is invalid.'}));
            }
            if (playAgain(rnd)) {
                console.log("Your score for this game is: " + score + "\nYour previous score was: " + oldScore);
                oldScore = oldScore + score;
                gameLoop();
            }
            else {
                console.log("Your score for this game is: " + score);
            }
        }
    }
}

startGame();