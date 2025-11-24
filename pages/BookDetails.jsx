import { LongTxt } from "../cmps/LongTxt.jsx";
import { bookService } from "../services/book-service.js";

const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

export function BookDetails() { //{ book, onGoBack, onGoEdit }
    const { bookId } = useParams()
    const [book, setBook] = useState(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (bookId) {
            loadBook()
        }
    }, [])

    function loadBook() {
        setIsLoading(true)
        bookService.getById(bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot find book')
            })
            .finally(() => setIsLoading(false))
    }

    function getBookLng(lng) {

        const lngMap = {
            he: 'Hebrew',
            sp: 'Spanish',
            eng: 'English'
        }
        return lngMap[lng] || lngMap['eng']
    }

    function getPublishDate() {
        const currYear = new Date().getFullYear()
        let diff = currYear - book.publishedDate
        if (diff > 10) return 'Vintage'
        else if (diff < 1) return 'NEW'
        return ''
    }

    function getPageCount() {

        if (book.pageCount > 500) return 'Long reading'
        else if (book.pageCount > 200) return 'Decent reading'
        else if (book.pageCount < 100) return 'Light reading'
        return ''
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
        return ''
    }

    function onBack() {
        navigate('/book')
    }

    function onEdit(){
        navigate('/book/edit/'+bookId)
    }

    if (!book) return <div>Loading...</div>
    const {
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice
    } = book

    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className="book-details-container">
            <div className="book-details-title">{title}</div>
            <div className="book-details-subtitle">{subtitle}</div>
            <div className="book-thumbnail-container">
                {listPrice.isOnSale && <div className="book-details-on-sale">On-sale!</div>}
                <img src={thumbnail} />
            </div>

            <div className="book-details-info">
                <section>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Year publish:</span>
                        <span className="book-details-info-text">{book.publishedDate} - {getPublishDate()}</span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Author{(authors.length > 1) ? 's' : ''}:</span>
                        <span className="book-details-info-text">{authors.join(', ')}</span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Language:</span>
                        <span className="book-details-info-text">{getBookLng(language)}</span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Categories:</span>
                        <span className="book-details-info-text">{categories.join(', ')}</span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Pages:</span>
                        <span className="book-details-info-text">{book.pageCount} - {getPageCount()}</span>
                    </div>

                    <div className="book-details-info-row">
                        <span className="book-details-info-title">Price:</span>
                        <span className={`book-details-info-text ${getPriceClass()}`}>
                            {listPrice.amount} {listPrice.currencyCode}
                        </span>
                    </div>

                    <div className="book-details-buy-container">
                        {(book.listPrice.isOnSale) &&
                            <button className="buy-book-btn" onClick={() => alert(`HA! ma ze po hanut?`)}>
                                Buy it now!
                            </button>
                        }
                        <div className="actions-btns">
                            <button className="go-back-btn" onClick={onBack}>⬅ Go back</button>
                            <button className="go-edit-btn" onClick={onEdit}>Go Edit ➡</button>
                        </div>
                    </div>
                </section>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Description:</span>
                    <LongTxt txt={description} />
                </div>
            </div>
        </section>
    )
}