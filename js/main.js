'use-strict'

$(init)

function init() {
    console.log('start')
    renderProjs()
}

function renderProjs() {
    const projs = getProjs()
    var strHtml = ''

    for (let i = 0; i < projs.length; i++) {
        strHtml +=
            `<div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="return renderProjsModals(${i});">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="img/portfolio/${projs[i].id}-thumbnail.jpg" >
            </a>
            <div class="portfolio-caption">
                <h4>${projs[i].name}</h4>
                <p class="text-muted">${projs[i].title}</p>
            </div>
        </div>`
    }

    $('#portfolio-proj').html(strHtml)
}

function renderProjsModals(i) {
    const projs = getProjs()

    var strHtml =
        `<div>
            <h2>${projs[i].name}</h2>
            <p class="item-intro text-muted">${projs[i].title}</p>
            <img class="img-fluid d-block mx-auto" src="img/portfolio/${projs[i].id}-full.jpg" alt="">
            <p>${projs[i].desc}</p>
            <ul class="list-inline">
                <li>Date: ${projs[i].publishedAt}</li>
                <li>Client: ${projs[i].labels[0]}</li>
                <li>Category: ${projs[i].labels[1]}</li>
            </ul>
            <a class="link-to-proj" href="${projs[i].url}">Link to project</a>
            <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project
            </button>
        </div>`

    $('.modal-body').html(strHtml)

    $('.contact-icon').hide()
}

function contact() {
    const subject = $('.contact-subject').val()
    const msg = $('.contact-msg').val()

    if (subject && msg) {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=liorat18@gmail.com&su=${subject}&body=${msg}`)
        $('.contact-email').val('')
        $('.contact-subject').val('')
        $('.contact-msg').val('')
    }
    else $('.p-warning').show()

}

function closeModal() {
    $('.contact-icon').show()
    $('.p-warning').hide()
}
