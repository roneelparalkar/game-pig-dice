let activePlayer,
    diceImg,
    getDiceScore,
    holdButton,
    isGamePlayRunning,
    roundScores,
    rollDiceButton,
    scores,
    toWinPoints;

function startGamePlay() {
    isGamePlayRunning = true;
    activePlayer = 0;
    scores = [0, 0];
    toWinPoints = 101;
    roundScores = [0, 0];

    diceImg = document.querySelector('.dice');
    diceImg.style.display = "none";

    resetValues()

}

function resetValues() {
    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;

    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

}

getDiceScore = () => Math.ceil(Math.random() * 6);

function changeTurn() {
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer = activePlayer ? 0 : 1;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
}

function calculateDicePoints(diceScore) {
    roundScores[activePlayer] = diceScore === 1 ? 0 : roundScores[activePlayer] + diceScore;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScores[activePlayer];
    if (diceScore === 1) changeTurn();
}

function addToGlobalScore() {
    scores[activePlayer] += roundScores[activePlayer];
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    roundScores[activePlayer] = 0;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScores[activePlayer];
    if (scores[activePlayer] >= toWinPoints) {
        playerWins()
    } else {
        changeTurn();
    }
}

function playerWins() {
    document.querySelector(`#name-${activePlayer}`).textContent = "WINNER!";
    isGamePlayRunning = false;
}

function init() {

    newGameButton = document.querySelector('.btn-new');
    newGameButton.addEventListener('click', startGamePlay)

    holdButton = document.querySelector('.btn-hold');
    holdButton.addEventListener('click', () => {
        if (isGamePlayRunning) {
            addToGlobalScore();
        }
    });

    rollDiceButton = document.querySelector('.btn-roll');
    rollDiceButton.addEventListener('click', () => {
        if (isGamePlayRunning) {
            let points = getDiceScore();
            diceImg.src = `dice-${points}.png`;
            diceImg.style.display = "flex";
            calculateDicePoints(points)
        }
    });

    startGamePlay()
}

init()