import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

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
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg(`Cannot get book `)
      })
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

    if (
      field !== 'amount' &&
      field !== 'currencyCode' &&
      field !== 'isOnSale'
    ) {
      setBookToEdit((prevBookToEdit) => ({ ...prevBookToEdit, [field]: value }))
    } else {
      setBookToEdit((prevBookToEdit) => ({
        ...prevBookToEdit,
        listPrice: { ...prevBookToEdit.listPrice, [field]: value },
      }))
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()

    bookService
      .save(bookToEdit)
      .then((savedBook) => {
        showSuccessMsg(`Book saved successfuly`)
        navigate('/book')
      })
      .catch((err) => {
        console.log('error onSaveBook', err)
        showErrorMsg(`Cannot save book `)
      })
  }

  const { title, listPrice, thumbnail, authors, language } = bookToEdit
  const { amount, currencyCode, isOnSale } = listPrice
  return (
    <section className='book-edit'>
      <h1>{bookId ? 'Book Edit' : 'Book Add'}</h1>

      <form onSubmit={onSaveBook}>
        <div className='form-section'>
          <label htmlFor='title'>Title:</label>
          <input
            value={title}
            onChange={handleChange}
            type='text'
            id='title'
            name='title'
            placeholder='Enter Title'
            required
          />
        </div>

        <div className='form-section'>
          <label htmlFor='amount'>Price:</label>
          <input
            value={listPrice.amount}
            onChange={handleChange}
            type='number'
            id='amount'
            name='amount'
            required
          />
        </div>

        <button>Save</button>
      </form>
    </section>
  )
}
