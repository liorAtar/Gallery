'use-strict'

var gProjs = [
    {
        id: "minesweeper",
        name: "Minesweeper",
        title: "Find all mines",
        desc: "Minesweeper rules are very simple. The board is divided into cells, with mines randomly distributed. To win, you need to open all the cells. The number on a cell shows the number of mines adjacent to it. Using this information, you can determine cells that are safe, and cells that contain mines. Cells suspected of being mines can be marked with a flag using the right mouse button.",
        url: "projects/minesweeper",
        publishedAt: "September 2022",
        labels: ["For All Ages", "Game"],
    },
    {
        id: "inPicture",
        name: "In-Picture Game",
        title: "Guess What is in the picture",
        desc: "In this short A reading comprehension game, Floyd serves as a helpful guide as your kid picks out sentences that accurately describe the pictures. By way of reading and selecting sentences, your kid will get a firm handle on the short A sound. He'll also work out spelling skills, spotting the differences between similar sounding words. What's more, he'll make the connection between the words and what they represent in real life.",
        url: "projects/inPicture",
        publishedAt: "September 2022",
        labels: ["For All Ages", "Game"],
    },
    {
        id: "touchNums",
        name: "Touch Nums",
        title: "Touch numbers by order",
        desc: "Touch the numbers from 1 to 25 as fast as you can, and become a world record holder! 'Touch the Numbers' is a simple game for training your reflexes and peripheral vision.",
        url: "projects/touchNums",
        publishedAt: "September 2022",
        labels: ["For All Ages", "Game"],
    },
    {
        id: "pacman",
        name: "Pacman",
        title: "Eat all food",
        desc: "Simply score as many points as you can eating the small dots all around the maze.",
        url: "projects/Pacman",
        publishedAt: "September 2022",
        labels: ["For All Ages", "Game"],
    },
    {
        id: "bookshop",
        name: "bookshop",
        title: "Books to shop",
        desc: "Books to shop by name, price and rate.",
        url: "projects/Bookshop",
        publishedAt: "October 2022",
        labels: ["Book Readers", "Shopping"],
    },
    {
        id: "bootstrap",
        name: "bootstrap",
        title: "Bootstrap Exercisec",
        desc: "Bootstrap examples like: navbar, card, table ect.",
        url: "projects/Bootstrap",
        publishedAt: "October 2022",
        labels: ["Developers", "Learning"],
    },
]


function getProjs() {
    return gProjs
}