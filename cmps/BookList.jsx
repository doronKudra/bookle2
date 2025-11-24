import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM


export function BookList({ books, onSelectBook, onRemoveBook }) {
    return (
        <section className="books-lst-container">
            {books.map((book) => (
                <div key={book.id} className="book-card">
                    <BookPreview book={book} />
                    <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                    <button ><Link to={`/book/${book.id}`}>Details</Link></button>
                    <button ><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                </div>
            ))}
        </section>
    )
}
