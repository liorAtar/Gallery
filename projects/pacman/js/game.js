'use strict'

const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '♦'
const EMPTY = ' '
const CHERRY = '🍒';

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gDoesWon
var gFoodCount
var gCherryInterval

function init() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gDoesWon = false
    gFoodCount = getFoodCount(gBoard)
    gCherryInterval = setInterval(putCherry, 15000, gBoard)
}

function restart() {
    gDeathGhosts = []
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gDoesWon = false
    gFoodCount = getFoodCount(gBoard)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if (i === 1 && j === 1 ||
                i === SIZE - 2 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    console.log('gGame.score', gGame.score)
    console.log('gFoodCount', gFoodCount)
    if (gGame.score === gFoodCount + 1) {
        gDoesWon = true
        gameOver()
    }
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)

    var elGameOverModal = document.querySelector('.game-over-modal')
    elGameOverModal.innerText = gDoesWon ? 'Victorious!' : 'GAME OVER'
}

function getFoodCount(board) {
    var foodCount = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) foodCount++
        }
    }

    return foodCount
}

function putCherry(board) {
    var i = getRandomIntInclusive(1, 8)
    var j = getRandomIntInclusive(1, 8)

    var location = {i, j} 
    if (board[i][j] === EMPTY) {
        board[i][j] = CHERRY
        renderCell(location, CHERRY)
    } else return
}
