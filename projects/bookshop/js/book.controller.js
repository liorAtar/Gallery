'use strict'
var gCurrBook

function onInit() {
    var modal = getModal()
    var layout = getFavLayout()
    var numOfPages = parseInt(getAllBooksLength() / PAGE_SIZE)
    
    renderFilterByQueryStringParams()
    layout === 'table' ? renderBooksByTable() : renderBooksByCards()

    if (modal.isOpen) {
        onReadBook(modal.currBook.id)
    }


    updatePrevNextDiableState()

    renderPaging()
    onUpdatePageIndex(0, numOfPages)
    // renderVendorsInFilter()
}

function renderBooksByTable() {
    var books = getBooks()
    updateFavLayout('table')

    var strHtmls = books.map(book => `
        <tr>
            <td><h5>${book.id}</h5></td>
            <td><h5>${book.name}</h5></td>
            <td><h6>${book.price}</h6></td>
            <td><button class="btn-read" onclick="onReadBook('${book.id}')">Read</button></td>
            <td><button class="btn-update" onclick="onUpdateBook('${book.id}')">Update</button></td>
            <td><button class="btn-remove" onclick="onDeleteBook('${book.id}')">Dalete</button></td>
        </tr>
        `
    )

    document.querySelector('.books-cards').style.display = 'none'
    document.querySelector('.books-tb').innerHTML = strHtmls.join('')
    document.querySelector('.books-table').style.display = 'block'
}

function renderBooksByCards() {
    var books = getBooks()
    updateFavLayout('cards')

    var strHtmls = books.map(book => `
        <article class="book-preview">
            <button class="btn-remove" onclick="onDeleteBook('${book.id}')">X</button>
            <h5>${book.name}</h5>
            <h6>${book.price}</h6>
            <img src="${book.imgUrl}" alt="Book by ${book.imgUrl}">
        </article> 
        `
    )

    document.querySelector('.books-cards').innerHTML = strHtmls.join('')
    document.querySelector('.books-table').style.display = 'none'
    document.querySelector('.books-cards').style.display = 'flex'
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    updateCurrModall(true, book)
    _saveModalToStorage()
    gCurrBook = book
    var elRateValue = document.querySelector('.rate-value')
    elRateValue.value = book.rate
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4').innerText = book.price + '₪'
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
    var bookRate = parseInt(document.querySelector('.rate-value').value)
    updateRate(bookRate > 0 && bookRate < 11, bookRate)
    updateCurrModall(false)
    _saveModalToStorage()
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Price?')
    if (newPrice) {
        const book = updateBook(bookId, newPrice)
        getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
        // flashMsg(`Price updated to: ${book.price}`)
    }
}

function onAddBook(e) {
    e.preventDefault()
    var name = document.querySelector('.name').value
    var price = document.querySelector('.price').value
    var desc = document.querySelector('.desc').value
    var imgUrl = document.querySelector('.img').value
    if (name && price && desc && imgUrl) {
        const book = addBook(name, price, desc, imgUrl)
        document.querySelector('.name').value = ''
        document.querySelector('.price').value = 0
        document.querySelector('.desc').value = ''
        document.querySelector('.img').value = ''
        updatePrevNextDiableState()
        getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
        // flashMsg(`Book Added (id: ${book.id})`)
    }
}


function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function onLowerRate() {
    var bookRate = parseInt(document.querySelector('.rate-value').value)
    updateRate(bookRate > 0, --bookRate)
}

function onAddRate() {
    var bookRate = parseInt(document.querySelector('.rate-value').value)
    updateRate(bookRate < 11, ++bookRate)
}

function updateRate(bol, bookRate) {
    if (bol) {
        console.log('enter')
        updateBookRate(gCurrBook.id, bookRate)
        var book = getBookById(gCurrBook.id)
        console.log('book.rate', book.rate)
        var elRateValue = document.querySelector('.rate-value')
        elRateValue.value = book.rate
    }
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    console.log('filterBy', filterBy)
    updatePageIdx(0)
    updatePrevNextDiableState()
    getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
    const queryStringParams = `?name=${filterBy.name}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked
    onSort(prop, isDesc)
   
}

function onSort(prop, isDesc = 1) {
    const sortBy = {
        [prop]: isDesc
    }

    setBookSort(sortBy)
    getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        name: queryStringParams.get('name') || '',
    }

    if (!filterBy.name) return

    document.querySelector('.search-filter').value = filterBy.name
    setBookFilter(filterBy)
}

function onNextPage(elBtn) {
    var pageIdx = getPageIdx()
    var allBooks = getBooks().length

    if (pageIdx * PAGE_SIZE <= allBooks) {
        var elPrev = document.querySelector('.prev-btn')
        elPrev.disabled = false
        nextPage()
        pageIdx + 1 === (allBooks / PAGE_SIZE) ? elBtn.disabled = true : elBtn.disabled = false
        getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
    } else {
        elBtn.disabled = true
    }
}

function onPrevPage(elBtn) {
    var pageIdx = getPageIdx()
    var allBooks = getBooks().length

    if (pageIdx > 0) {
        prevPage()
        pageIdx - 1 === 0 ? elBtn.disabled = true : elBtn.disabled = false
        var elNext = document.querySelector('.next-btn')
        pageIdx - 1 === (allBooks / PAGE_SIZE) ? elNext.disabled = true : elNext.disabled = false
        getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
    } else {
        elBtn.disabled = true
    }
}

function updatePrevNextDiableState() {
    const prop = document.querySelector('.search-filter').value

    var allBooks = prop ? getBooks().length : getAllBooksLength()

    var elNext = document.querySelector('.next-btn')
    var elPrev = document.querySelector('.prev-btn')
    var pageIdx = getPageIdx()
    pageIdx === 0 ? elPrev.disabled = true : elPrev.disabled = false
    allBooks <= PAGE_SIZE ? elNext.disabled = true : elNext.disabled = false
}

function renderPaging() {
    var numOfPages = parseInt(getAllBooksLength() / PAGE_SIZE)
    var strHtmls = []

    for (let index = 0; index < numOfPages; index++) {
        strHtmls.push(`<button class="btn-page-${index}" onclick="onUpdatePageIndex(${index}, ${numOfPages})">${index + 1}</button>`)
    }

    document.querySelector('.pagin-numbers').innerHTML = strHtmls.join('')
}

function onUpdatePageIndex (index, numOfPages) {
    updatePageIdx(index)

    for (let i = 0; i < numOfPages; i++) {
        i === index? 
        document.querySelector(`.btn-page-${i}`).style.color = 'black' :
        document.querySelector(`.btn-page-${i}`).style.color = 'whitesmoke'
    }

    getFavLayout() === 'table' ? renderBooksByTable() : renderBooksByCards()
}
