import { bookService } from "../services/book-service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {


    const [bookToEdit, setBookToEdit] = useState(bookService.getNewBook())
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        setIsLoading(true)
        bookService.getById(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleListPriceChange({ target }) {

        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...bookToEdit.listPrice, [field]: value } }))

    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit, bookId !== undefined).then((savedBook) => {
            console.log('savedBook:', savedBook)
            navigate('/book')
            showSuccessMsg('Book saved!')
        })
            .catch(err => {
                console.log('err:', err, bookToEdit)
                showErrorMsg('Problem saving book')
            })
    }



    return (
        <section className='book-edit'>
            <h2 className='edit-book-header'>Edit Book</h2>
            <form onSubmit={onSaveBook}>
                <div className='book-edit-info-row'>
                    <label className='book-details-info-title'>Title:</label>
                    <input
                        type='text'
                        placeholder='Enter New Title'
                        name='title'
                        value={bookToEdit.title}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-edit-info-row'>
                    <label className='book-details-info-title'>Price:</label>
                    <input
                        type='number'
                        placeholder='Set Price'
                        name='amount'
                        onChange={handleListPriceChange}
                        value={bookToEdit.listPrice.amount}
                    />
                </div>

                <div className='book-edit-actions-container'>
                    <button className='save-edit-btn' >Save ✔</button>
                    <button className='cancel-edit-btn' type="button"><Link to="/book">Cancel ✖</Link></button>
                </div>

            </form>
        </section>
    )
}
