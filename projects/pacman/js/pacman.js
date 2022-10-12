'use strict'

const PACMAN = '😷';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === SUPER_FOOD && gIsEatenMode) return
    if (nextCell === CHERRY) {
        updateScore(10)
        gFoodCount += 10
    }
    if (nextCell === SUPER_FOOD) {
        setGhostEatenMode(true)
        setTimeout(setGhostEatenMode, 5000, false)
    }
    else if (nextCell === GHOST && gIsEatenMode) {
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i &&
                gGhosts[i].location.j === nextLocation.j) {
                var deathGhost = gGhosts.splice(i, 1)
                gDeathGhosts.push(deathGhost)

                if (deathGhost[0].currCellContent === FOOD) {
                    updateScore(1)
                }
                renderGhosts()
                setTimeout(bringGhostesToLife, 5000)
                renderGhosts()
            }
        }
    }
    else if (nextCell === GHOST) {
        gameOver()
        gDoesWon = false
        renderCell(gPacman.location, EMPTY)
        return
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}