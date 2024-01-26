const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemys: document.querySelector('.enemy'),
        time: document.querySelector('#time'),
        score: document.querySelector('#score'),
        lives: document.querySelector('#lives'),
    },
    values: {

        gameVelocity: 800,
        hitPosition: 0,
        result: 0,
        curretTime: 30,
        lives: 3,
    },
    actions: {
        time: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function resetGame() {
    state.values.curretTime = 30;
    state.values.result = 0;
    state.values.lives = 3;
    state.view.time.innerHTML = state.values.curretTime;
    state.view.score.innerHTML = state.values.result;
    state.view.lives.innerHTML = state.values.lives;
    state.actions.time = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function countDown() {
    state.values.curretTime--
    state.view.time.innerHTML = state.values.curretTime
    if (state.values.curretTime == 0) {
        clearInterval(state.values.time)
        clearInterval(state.actions.countDownTimerId)
        alert('Game Over. Score: ' + state.values.result)
        state.view.time.innerHTML = state.values.curretTime
        resetGame();
    }
}

function playSound() {
    let audio = new Audio('../src/audios/punch.mp3')
    audio.play()
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
        square.classList.remove('hit')
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id
}

function loseLife() {
    state.values.lives--
    state.view.lives.innerHTML = state.values.lives
    if (state.values.lives <= 0) {
        clearInterval(state.values.time)
        clearInterval(state.actions.countDownTimerId)
        alert('Game Over. Score: ' + state.values.result)
        state.view.time.innerHTML = state.values.curretTime
        resetGame();
    }
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (square.id == state.values.hitPosition) {
                state.values.result++
                state.view.score.innerHTML = state.values.result
                playSound()
                square.classList.add('hit')
                setTimeout(() => square.classList.remove('hit'), 300)
                randomSquare()
            } else {
                loseLife()
            }
        })
    })
}


function init() {
    randomSquare()
    addListenerHitBox()
    countDown()
}

init()