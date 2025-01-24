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

type GenreObject = {
    id: number
    title: string
}

// Gets the list of genres in the database. 
async function onFetchGenresClick() {
    const response = await fetch("http://localhost:3000/genres")
    const genreList = await response.json()

    const genresHtml = genreList.map((genre: GenreObject) => {
      return `<div class="bg-light rounded mt-5">
        <h3>${genre.title}</h3>
        <p>id: ${genre.id}</p>
      </div>`
    }).join("")

    const genresContainer = document.getElementById("genres-container") as HTMLDivElement
    genresContainer.innerHTML = genresHtml
}

// Set the inner HTML of the #app container
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container mt-5">
      <h1 class="text-center">List of Books Read This Year (2025)</h1>
      <button id="fetch-books-button" class="btn btn-primary btn-lg">Get Books</button>
      <button id="create-book-button" class="btn btn-success mx-3 btn-lg">Create Test Book</button>
      <button id="delete-book-button" class="btn btn-danger mx-3 btn-lg">Delete Test Book</button>
      <div id="books-container"></div>

      <hr class="my-5"/>
      <!--Genre list-->
      <div class="d-flex text-nowrap">
          <button id="fetch-genres-button" class="btn btn-primary btn-lg">Fetch Genres</button>
      </div>
      <div id="genres-container" class="mt-3"></div>
  </div>
`

// Event listenter for the fetch-books-button 
const fetchBooksButton = document.getElementById("fetch-books-button") as HTMLButtonElement
fetchBooksButton.addEventListener("click", onFetchBooksClick)

// Event listener for the create-book-button
const createBookButton = document.getElementById("create-book-button") as HTMLButtonElement
createBookButton.addEventListener("click", onCreateBookClick)

// Event listener for the delete-book-button
const deleteBookButton = document.getElementById("delete-book-button") as HTMLButtonElement
deleteBookButton.addEventListener("click", onDeleteBookClick)



// Add the event listener for the fetch-genres-button
const fetchGenresButton = document.getElementById("fetch-genres-button") as HTMLButtonElement
fetchGenresButton.addEventListener("click", onFetchGenresClick)