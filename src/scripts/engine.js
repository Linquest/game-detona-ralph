const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemys: document.querySelector('.enemy'),
        time: document.querySelector('#time'),
        score: document.querySelector('#score'),
    },
    values: {
        time: null,
        gameVelocity: 800,
        hitPosition: 0,
    }
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

function moveEnemy() {
    state.values.time = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (square.id == state.values.hitPosition) {
                square.classList.add('hit')
                state.values.score += 1
                state.view.score.innerHTML = state.values.score
                state.values.hitPosition = null
            }
        })
    })
}

function init() {
    randomSquare()
    addListenerHitBox()
    moveEnemy()
    state.values.time = 60
    state.values.score = 0
}

init()