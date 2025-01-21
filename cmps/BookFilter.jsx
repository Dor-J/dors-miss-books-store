import { bookService } from '../services/book.service.js'

const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, handleSetFilter, booksStats }) {
  //* { title, authors, categories, price, pages }
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const initialFilterBy = useRef({ ...filterBy })
  const onSetFilterDebounce = useRef(
    utilService.debounce(handleSetFilter, 500)
  ).current

  useEffect(() => {
    onSetFilterDebounce(filterByToEdit)
  }, [filterByToEdit])

  function onSubmit(ev) {
    ev.preventDefault()
    handleSetFilter(filterByToEdit)
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
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function reset() {
    setFilterByToEdit(initialFilterBy.current)
  }

  const { minPrice, maxPrice, minPages, maxPages } = booksStats
  const { title, price, authors, categories, pages } = filterByToEdit
  return (
    <section className='book-filter'>
      <h2 className='filter-header'>Filter Our Books</h2>
      <form className='books-filter' onSubmit={onSubmit}>
        <div className='filter-section'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            name='title'
            onChange={handleChange}
            value={title}
            type='text'
            placeholder='Enter book title'
            className='input'
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='price'>Min Price</label>
          <input
            id='price'
            name='price'
            onChange={handleChange}
            value={`${price}` || ''}
            type='number'
            min={minPrice || 0}
            max={maxPrice || 1000}
            step='10'
            className='input text-center'
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='pages'>Min Pages</label>
          <input
            id='pages'
            name='pages'
            onChange={handleChange}
            value={`${pages}` || ''}
            type='number'
            min={minPages || 0}
            max={maxPages || 1000}
            step='10'
            className='input text-center '
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='authors'>Authors</label>
          <input
            id='authors'
            name='authors'
            onChange={handleChange}
            value={authors}
            type='text'
            placeholder='Enter author name'
            className='input'
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='categories'>Category</label>
          <input
            id='categories'
            name='categories'
            onChange={handleChange}
            value={categories}
            type='text'
            placeholder='Enter category'
            className='input'
          />
        </div>

        <div className='.btns-container'>
          <button>Submit</button>
          <button onClick={reset}>Reset</button>
        </div>
      </form>
    </section>
  )
}
