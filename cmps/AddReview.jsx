import { bookService } from '../services/book-service.js';

const { useParams } = ReactRouterDOM

export function AddReview() {

    const { bookId } = useParams()
    function onSaveReview(ev) {
        ev.preventDefault()
        let data = {}
        const formData = new FormData(ev.target)
        for (const [name, value] of formData.entries()) {
            data[name] = value
        }
        if(data.fullname && data.rating && data.readAt) bookService.addReview(bookId,data)
        else{
            // do something when input not provided
        }
    }

    return (
        <form onSubmit={onSaveReview} className='book-review-container'>
            <div className='book-review-info-row'>
                <label className='book-details-info-title'>Full Name:</label>
                <input
                    type='text'
                    placeholder='Enter Your Name'
                    name='fullname'
                />
            </div>

            {/* <div className='book-review-info-row'>
                <label className='book-details-info-title'>Review:</label>
                <input
                    type='number'
                    placeholder='Tell Us More..'
                    name='description'
                    onChange={onEdit}
                />
            </div> */}

            <div className='book-review-info-row'>
                <label className='book-details-info-title'>Rating:</label>
                <input
                    type='range'
                    min='1'
                    max='5'
                    name='rating'
                />
            </div>

            <div className='book-review-info-row'>
                <label className='book-details-info-title'>Read At:</label>
                <input
                    type='date'
                    min='1'
                    max='5'
                    name='readAt'
                />
            </div>

            <div className='book-edit-actions-container'>
                <button className='save-edit-btn' >Add Review ✔</button>
            </div>

        </form>
    )
}