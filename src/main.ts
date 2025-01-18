import "bootstrap/dist/css/bootstrap.min.css"
//Books 

const booksContainer = document.getElementById("books-container") as HTMLDivElement

type BookObject = {
    id: number
    title: string
    genreId: string
}

//Gets the list of books from the database.
async function onFetchBooksClick() {
    const response = await fetch("http://localhost:3000/books")
    const bookList = await response.json()

    booksContainer.innerHTML = bookList.map(
        function list(book: BookObject) {`<div class="bg-light rounded mt-5">
            <h3>${book.title}</h3>
            <p>${book.genreId}</p>
        </div>`
        }
    ).join("")
}

let lastCreatedItem: null | BookObject = null

// Adds a Test Book to the list.
async function onCreateBookClick() {
    const testBook = { title: "Test Book", genreId: 2 }
    const response = await fetch("http://localhost:3000/books", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(testBook) 
    })
   
    const newlyCreatedItem = await response.json()
    lastCreatedItem = newlyCreatedItem
}

//Deletes the Test book from the list.
async function onDeleteBookClick() {
    if(lastCreatedItem === null) {
        console.log("No item created yet to delete")
        return
    }
    
    fetch("http://localhost:3000/books/" + lastCreatedItem.id, {
        method: "DELETE", 
    })
}

// Genres 

const genresContainer = document.getElementById("genres-container") as HTMLDivElement
type GenreObject = {
    id: number
    title: string
}

// Gets the list of genres in the database. 
async function onFetchGenresClick() {
    const response = await fetch("http://localhost:3000/genres")
    const genreList = await response.json()

    genresContainer.innerHTML = genreList.map(
        function listgen(genre: GenreObject) {`<div class="bg-light rounded mt-5">
            <h3>${genre.title}</h3>
            <p>id: ${genre.id}</p>
        </div>`}
    ).join("")
}

