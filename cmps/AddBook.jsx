import { booksService } from "../services/books.service.js"
import { SearchBooksList } from "./SearchBooksList.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service.js"

const { useState, useRef } = React
const { useNavigate } = ReactRouter

export function AddBook() {
    const [googleBooks, setGoogleBooks] = useState(null)
    const navigate = useNavigate()
    const handleSearchDebounce = useRef(utilService.debounce(handleSearch, 1500))
    // const handleSearchDebounce = utilService.debounce(handleSearch, 2000)

    function handleSearch({ target }) {
        booksService.getGoogleBooks(target.value)
            .then(books => setGoogleBooks(books))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Enter a book name!')
            })
    }

    function onSave(book) {
        booksService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/book'))
    }

    return (
        <div className='book-search'>
            <div className='add-book-title'>
                <span className='bold-txt'>Google Search: </span>
                <input
                    onChange={handleSearchDebounce.current}
                    type="text" name='title'
                    placeholder='Insert book name' />
                <button>Reset</button>
            </div>
            {googleBooks && <SearchBooksList booksList={googleBooks} onSave={onSave} />}
        </div>
    )
}