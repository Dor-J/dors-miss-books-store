const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function AddReview({ book, onAddReview }) {
  const [bookReview, setBookReview] = useState(bookService.getEmptyReview())
  const navigate = useNavigate()

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
    if (field === 'rating') spanRating.current = value

    setBookReview((prevBookReview) => ({ ...prevBookReview, [field]: value }))
  }

  function onSaveReview(ev) {
    ev.preventDefault()

    bookService
      .addReview(book.id, bookReview)
      .then((bookWithReview) => {
        showSuccessMsg(`Review added successfuly`)
        onAddReview(bookWithReview)
      })
      .catch((err) => {
        console.error('error adding review', err)
        showErrorMsg(`Cannot add Review `)
      })
  }

  const { fullname, readAt, rating, txt } = bookReview
  return (
    <section className='add-review'>
      <h2>Add Review</h2>
      <form onSubmit={onSaveReview}>
        <div className='form-section'>
          <label htmlFor='fullname'>Full Name:</label>
          <input
            value={fullname}
            onChange={handleChange}
            type='text'
            id='fullname'
            name='fullname'
            placeholder='Enter Full Name'
            required
            autoComplete='name'
          />
        </div>

        <div className='form-section'>
          <label htmlFor='rating'>Rating:</label>
          <input
            value={rating}
            onChange={handleChange}
            type='range'
            id='rating'
            name='rating'
            required
            min={1}
            max={5}
            step={1}
          />
          <span>{rating}</span>
        </div>

        <div className='form-section'>
          <label htmlFor='readAt'>Date read:</label>
          <input
            value={readAt}
            onChange={handleChange}
            type='date'
            id='readAt'
            name='readAt'
            required
          />
        </div>

        <div className='form-section'>
          <label htmlFor='txt'>Review Content:</label>
          <textarea
            value={txt}
            onChange={handleChange}
            id='txt'
            name='txt'
            required
            autoComplete='off'
            placeholder='Write your review here...'
          />
        </div>

        <button>Save Review</button>
      </form>
    </section>
  )
}
