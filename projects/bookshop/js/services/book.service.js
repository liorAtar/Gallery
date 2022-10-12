'use strict'

const STORAGE_KEY = 'bookDB'
const STORAGE_KEY_MODAL = 'modalOpen'
const STORAGE_KEY_FAV_LAYOUT = 'layout'
const PAGE_SIZE = 5

var gBooks
var gFilteredLength
var gFilterBy = { name: '' }
var gModal = {
    currBook: {},
    isOpen: false
}
var gFavLayout = 'table'
var gPageIdx = 0

_createBooks()

function getAllBooksLength() {
    return gBooks.length
}

function getBooks() {
    // Filtering:
    var books = gBooks.filter(book => book.name.toLowerCase().includes(gFilterBy.name))

    // Paging:
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function getModal() {
    return gModal
}

function getFavLayout() {
    return gFavLayout
}

function getPageIdx() {
    return gPageIdx
}

function _createBook(name, price, desc, rate, imgUrl) {
    return {
        id: makeId(),
        name,
        price,
        desc,
        rate,
        imgUrl
    }
}

function _createBooks() {
    var modal = loadFromStorage(STORAGE_KEY_MODAL)
    var favLayout = loadFromStorage(STORAGE_KEY_FAV_LAYOUT)
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []

        var book = _createBook(
            'Learning Laravel',
            18.90,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            9,
            'https://th.bing.com/th/id/R.36ff2c0e2a567dd2bf5c1a72f9cfcbf6?rik=798wB3NmZAtn7Q&pid=ImgRaw&r=0')
        books.push(book)
        book = _createBook(
            'Beginning with Laravel',
            6.65,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            2,
            'https://images-na.ssl-images-amazon.com/images/I/416sUGMPWqL.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
        book = _createBook(
            'Java for developers',
            7.20,
            'For former FBI-agent-turned-thief Blair Morgan, the world’s most unbreakable vault is her most irresistible target.' +
            '\nBlair Morgan has embraced her second career—as an elite thief.\nHer heist crew has set their sights on their latest target: the Sierra Diamond, an 872-carat stone worth $27.3 million.' +
            '\nIt will be encased in a new vault known as the Sky Safe, a revolutionary strong room built into the side of a Los Angeles high rise.' +
            '\nThe FBI says the Sky Safe is impenetrable. Naturally, Blair and her crew think otherwise…and if they succeed, it will be the greatest heist ever pulled.' +
            '\nBut Blair’s corrupt former boss at the FBI has other plans. He knows Blair will be coming for the diamond and intends to catch her in the act…along with her entire team.' +
            '\nAs a dangerous game of cat-and-mouse unfolds over the streets of downtown LA, Blair must go head-to-head against the most cunning adversary from her past—or see herself and her crew imprisoned forever.',
            5,
            'https://wsvincent.com/assets/images/bestjavascriptbooks/js_for_impatient_programmers.jpg')
        books.push(book)
    }

    gBooks = books

    if (!modal) {
        modal = {
            currBook: gBooks[0],
            isOpen: false
        }
    }

    if (!favLayout) {
        favLayout = 'table'
    }

    gModal = modal
    gFavLayout = favLayout
    _saveBooksToStorage()
    _saveModalToStorage()
    _saveToLayourStorage()
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function updateFavLayout(layout) {
    gFavLayout = layout
    _saveToLayourStorage()
}

function updateBookRate(bookId, newRate) {
    const book = gBooks.find(book => book.id === bookId)
    book.rate = newRate
    _saveBooksToStorage()
    return book
}

function addBook(name, price, desc, imgUrl) {
    const book = _createBook(name, price, desc, 1, imgUrl)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function setBookFilter(filterBy = {}) {
    console.log('filterBy', filterBy)
    if (filterBy.searchValue !== undefined) gFilterBy.name = filterBy.searchValue
    return gFilterBy
}

function setBookSort(sortBy = {}) {
    if (sortBy.price !== undefined) {
        gBooks.sort((b1, b2) => (b2.price - b1.price) * sortBy.price)
    } else if (sortBy.rate !== undefined) {
        gBooks.sort((b1, b2) => (b1.rate - b2.rate) * sortBy.rate)
    } else if(sortBy.name !== undefined) {
        gBooks.sort((b1, b2) => b1.name.localeCompare(b2.name) * sortBy.name)
    }
}

function updateCurrModall(isOpen, book = {}) {
    gModal.isOpen = isOpen
    if (book) {
        gModal.currBook = book
    }
}

function _saveToLayourStorage() {
    saveToStorage(STORAGE_KEY_FAV_LAYOUT, gFavLayout)
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function _saveModalToStorage() {
    saveToStorage(STORAGE_KEY_MODAL, gModal)
}

function nextPage() {
    gPageIdx++
}

function prevPage() {
    gPageIdx--
}

function updatePageIdx(num) {
    gPageIdx = num
}