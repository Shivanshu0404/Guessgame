let random = Math.floor((Math.random() * 100) + 1);

const submit = document.querySelector("#subt");
const userinput = document.querySelector("#guessFeild");
const guessslot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const Startover = document.querySelector(".resultparas");

const p = document.createElement('p');
const prevguess = [];
let numguess = 1;

let playgame = true;

if (playgame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = Number(userinput.value); // Convert input to a number
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) { // Correct usage of isNaN
        alert(`Please enter a valid number`);
    } else if (guess < 1 || guess > 100) {
        alert(`Please enter a number in range 1-100`);
    } else {
        prevguess.push(guess);
        if (numguess >= 10) { // Changed condition to allow 10 guesses
            displayGuess(guess);
            displayMessage(`Game Over — Random Number was ${random}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === random) {
        displayMessage('CONGRATULATIONS! You guessed it right!');
        endGame();
    } else if (guess < random) {
        displayMessage(`Number is too low`);
    } else if (guess > random) {
        displayMessage(`Number is too high`);
    }
}

function displayGuess(guess) {
    userinput.value = '';
    guessslot.innerHTML += `${guess}; `;
    numguess++;
    remaining.innerHTML = `${11 - numguess}`; // Show remaining guesses
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
    lowOrHi.style.color='red'
}

function newGame() {
    const newgamebutton = document.querySelector('#newgame');
    newgamebutton.addEventListener('click', function (e) {
        random = Math.floor((Math.random() * 100) + 1);
        prevguess.length = 0;
        numguess = 1;
        guessslot.innerHTML = '';
        remaining.innerHTML = `${11 - numguess}`;
        userinput.removeAttribute('disabled');
        Startover.removeChild(p);
        playgame = true;
    });
}

function endGame() {
    userinput.value = '';
    userinput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newgame">Start New Game</h2>`;
    p.style.backgroundColor='green'
    p.style.textAlign='center'
    p.style.borderRadius='10px'
    Startover.appendChild(p);
    playgame = false;
    newGame();
}
