const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function AddReview({ book, onAddReview }) {
  const [bookReview, setBookReview] = useState(bookService.getEmptyReview())
  const navigate = useNavigate()
  const inputRef = useRef()
  const spanRating = useRef(1)
  const [cmpType, setCmpType] = useState('RateBySelect')

  useEffect(() => {
    inputRef.current.focus()
  }, [])

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

  function handleRateChange(value) {
    setBookReview((prevBookReview) => ({ ...prevBookReview, rating: value }))
    spanRating.current = value
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

  function RateBySelect({ val, onRateChange }) {
    return (
      <select value={val} onChange={(ev) => onRateChange(+ev.target.value)}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    )
  }

  function RateByTextbox({ val, onRateChange }) {
    return (
      <input
        type='number'
        min='1'
        max='5'
        value={val}
        onChange={(ev) => onRateChange(+ev.target.value)}
      />
    )
  }

  function RateByStars({ val, onRateChange }) {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            style={{
              cursor: 'pointer',
              color: num <= val ? 'gold' : 'black',
            }}
            onClick={() => onRateChange(num)}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  function DynamicCmp({ cmpType, val, onRateChange }) {
    const dynamicCmpsMap = {
      RateBySelect: <RateBySelect val={val} onRateChange={onRateChange} />,
      RateByTextbox: <RateByTextbox val={val} onRateChange={onRateChange} />,
      RateByStars: <RateByStars val={val} onRateChange={onRateChange} />,
    }

    return dynamicCmpsMap[cmpType] || null
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
            ref={inputRef}
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='rating'>
            Rating: <span>{rating}</span>
          </label>
          <select
            value={cmpType}
            onChange={(ev) => setCmpType(ev.target.value)}
          >
            <option>RateBySelect</option>
            <option>RateByTextbox</option>
            <option>RateByStars</option>
          </select>

          <div className='dynamic-cmps'>
            <DynamicCmp
              cmpType={cmpType}
              val={rating}
              name='rating'
              id='rating'
              onRateChange={handleRateChange}
            />
          </div>
        </div>

        {/* <div className='form-section'>
          
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
          
        </div> */}
        <div className='filter-section'>
          <label htmlFor='rating'>Rating:</label>
          <h4>
            Current rating:
            <span ref={spanRating}> {rating}</span>
          </h4>
          <select
            value={cmpType}
            onChange={(ev) => setCmpType(ev.target.value)}
          >
            <option>RateBySelect</option>
            <option>RateByTextbox</option>
            <option>RateByStars</option>
          </select>

          <div className='dynamic-cmps'>
            <DynamicCmp
              cmpType={cmpType}
              val={rating}
              name='rating'
              id='rating'
              onRateChange={handleRateChange}
            />
          </div>
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
