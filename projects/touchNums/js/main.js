// The Model
var gCurrNum = 1
var gMaxNum = 25

var gIntervalTimer
var gStartTime;

function onInit() {
    gCurrNum = 1
    gMaxNum = 25
    gStartTime = Date.now()
    renderBoard()
}

function restart() {
    gCurrNum = 1
    gMaxNum = 25
    gStartTime = Date.now()
    var elTimerLabel = document.querySelector('.timer')
    elTimerLabel.innerHTML = '0.000'
    renderBoard()
}

function renderBoard() {
    var arr = getNumbersArray(gMaxNum).sort((a, b) => 0.5 - Math.random());
    var strHTML = '<tbody>';

    for (let i = 0; i < Math.sqrt(gMaxNum); i++) {
        strHTML += '<tr>'
        for (let j = 0; j < Math.sqrt(gMaxNum); j++) {
            var currNum = arr.pop();
            strHTML += `<td class="id${currNum}" onClick=cellClicked(${currNum})>${currNum}</td>`
        }
        strHTML += '</tr>'
    }

    strHTML += '</tbody>'
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function cellClicked(clickedNum) {
    console.log('clickedNum', clickedNum)

    if (clickedNum === gCurrNum) {
        
        if (clickedNum === gMaxNum) {
            clearInterval(gIntervalTimer)
        }

        gCurrNum++
        var elCell = document.querySelector(`.id${clickedNum}`)
        elCell.style.backgroundColor = 'grey'
        if (clickedNum === 1) {
            gIntervalTimer = setInterval(startTimer, 100);
        }

    }
}

function startTimer() {
    var elapsedTime = Date.now() - gStartTime;
    var elTimerLabel = document.querySelector('.timer')
    elTimerLabel.innerHTML = (elapsedTime / 1000).toFixed(3);
}

function getNumbersArray(num) {
    var array = []
    for (let i = 1; i <= num; i++) {
        array[i - 1] = i
    }

    return array
}