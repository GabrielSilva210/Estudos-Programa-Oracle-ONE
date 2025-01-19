let drawnNumbersList = [];
let limitValue = 10;
let mysteryNumber = getRandomNumber();
let tries = 1;

function showTextOnScreen(tag, texto) {
    let field  = document.querySelector(tag);
    field .innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function showInitialMessage() {
    showTextOnScreen('h1', 'Jogo do número secreto');
    showTextOnScreen('p', 'Escolha um número entre 1 e 10');
}

showInitialMessage();

function checkGuess () {
    let guess = document.querySelector('input').value;
    
    if (guess == mysteryNumber) {
        showTextOnScreen('h1', 'Acertou!');
        let guessedWord = tries > 1 ? 'tentativas' : 'tentativa';
        let triesMessage = `Você descobriu o número secreto com ${tries} ${guessedWord}!`;
        showTextOnScreen('p', triesMessage);
        document.getElementById('reset').removeAttribute('disabled');
    } else {
        if (guess > mysteryNumber) {
            showTextOnScreen('p', 'O número secreto é menor');
        } else {
            showTextOnScreen('p', 'O número secreto é maior');
        }
        tries++;
        clearInput();
    }
}

document.getElementById('search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess(); 
        const search = document.getElementById('search').value;

        document.getElementById('search').value = '';
    }
});

function getRandomNumber() {
    let targetNumber = parseInt(Math.random() * limitValue + 1);
    let listLength = drawnNumbersList.length;

    if (listLength == limitValue) {
        drawnNumbersList = [];
    }
    if (drawnNumbersList.includes(targetNumber)) {
        return getRandomNumber();
    } else {
        drawnNumbersList.push(targetNumber);
        console.log(drawnNumbersList)
        return targetNumber;
    }
}

function clearInput() {
    guess = document.querySelector('input');
    guess.value = '';
}

function resetGame() {
    mysteryNumber = getRandomNumber();
    clearInput();
    tries = 1;
    showInitialMessage();
    document.getElementById('reset').setAttribute('disabled', true)
}