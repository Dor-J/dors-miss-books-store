import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => console.log('err:', err))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    setBookToEdit((prevBookToEdit) => ({ ...prevBookToEdit, [field]: value }))
  }

  function onSaveBook(ev) {
    ev.preventDefault()

    console.log('bookToEdit:', bookToEdit)
    bookService.save(bookToEdit).then((savedBook) => {
      console.log('savedBook:', savedBook)
      navigate('/book')
    })
  }

  const { vendor, speed } = bookToEdit
  return (
    <section className='book-edit'>
      <h1>{bookId ? 'Book Edit' : 'Book Add'}</h1>

      <form onSubmit={onSaveBook}>
        <label htmlFor='vendor'>Vendor:</label>
        <input
          value={vendor}
          onChange={handleChange}
          type='text'
          id='vendor'
          name='vendor'
        />

        <label htmlFor='speed'>Speed:</label>
        <input
          value={speed}
          onChange={handleChange}
          type='number'
          id='speed'
          name='speed'
        />

        <button>Save</button>
      </form>
    </section>
  )
}
