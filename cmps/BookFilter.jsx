const { useState, useEffect, useRef } = React
import { bookService } from '../services/book-service.js';
import { debounce } from '../services/util-service.js';

export function BookFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(debounce(onSetFilter, 500)).current

    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { title, price } = filterByToEdit

    return (
        <section className='filter-container'>
            <div className='filter-inside-container'>
                <h2 className='filter-header'>Filter books:</h2>
                <form className='books-filter' onSubmit={onFilter}>
                    <div className='filter-section'>
                        <label htmlFor='byTitle'>Title:</label>
                        <input
                            type='text'
                            id='byTitle'
                            name='title'
                            value={title}
                            onChange={handleChange}
                            className='input'
                            placeholder='Search by title...'
                        />
                    </div>

                    <div className='filter-section'>
                        <label htmlFor='byAuthor'>Price:</label>
                        <input
                            type='number'
                            id='price'
                            name='price'
                            value={price}
                            onChange={handleChange}
                            className='input'
                            placeholder='Search by price'
                        />
                    </div>
                    <button className='filter-btn'>Filter</button>
                </form>
            </div>
        </section>
    )
}


// let isFirst = true
// function main() {
//     if (isFirst) {
//         isFirst = false
//         return
//     }
//     console.log('BABABAB')
// }