// The Model
var gQuests = [
    { id: 1, opts: ['Mogli', 'Tarzan'], correctOptIndex: 1, img: 'Tarzan' },
    { id: 2, opts: ['Pocahontas', 'Mulan'], correctOptIndex: 1, img: 'Mulan' },
    { id: 3, opts: ['Pinocchio', 'Geppetto'], correctOptIndex: 0, img: 'Pinocchio' },
    { id: 4, opts: ['Peter Pan', 'TinkerBell'], correctOptIndex: 0, img: 'Peter Pan' },
    { id: 5, opts: ['Red', 'Rio'], correctOptIndex: 1, img: 'Rio' },
    { id: 5, opts: ['Anna', 'Elza'], correctOptIndex: 0, img: 'Anna' },
]

var gCurrQuestIdx = 0

function onInit() {
    renderBoard()
}

function onOptClicked(elBtn) {
    var correctIdx = gQuests[gCurrQuestIdx].correctOptIndex

    console.log('gCurrQuestIdx', gCurrQuestIdx)
    if (gCurrQuestIdx === gQuests.length - 1) {
        var elVictory = document.querySelector('.victory')
        elVictory.style.display = 'block'
    }
    else if (elBtn.innerText === gQuests[gCurrQuestIdx].opts[correctIdx]) {
        alert('Correct!')
        gCurrQuestIdx++
        renderBoard()
    } else {
        alert('Try Again!')
    }
}

function restart() {
    gCurrQuestIdx = 0
    renderBoard()
    var elVictory = document.querySelector('.victory')
    elVictory.style.display = 'none'
}

function renderBoard() {
    var strHTML = '';
    strHTML += `<img src="images/${gQuests[gCurrQuestIdx].img}.png"></img>`
    strHTML += `<div><button onclick=onOptClicked(this) class="option1">${gQuests[gCurrQuestIdx].opts[0]}</button>`
    strHTML += `<button onclick=onOptClicked(this) class="option2">${gQuests[gCurrQuestIdx].opts[1]}</button></div>`

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}
