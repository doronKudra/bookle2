import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookEdit } from './BookEdit.jsx'

const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onSelectBook(book) {
        setSelectedBook(book)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter((b) => b.id !== bookId))
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div>Loading...</div>

    console.log('books:', books)
    return (
        <main>
            {!selectedBook && (
                <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    {!!books.length && <BookList books={books} onSelectBook={onSelectBook} onRemoveBook={onRemoveBook} />}
                    {!books.length && <div> No Books found...</div>}
                </React.Fragment>
            )}

            {selectedBook && 
                <section>
                    <BookEdit book={selectedBook}/>
                    <BookDetails book={selectedBook}/>
                </section>
            }
            {/* <button>
                <Link to="/book/edit">Add Book</Link>
            </button> */}
        </main>
    )
}
