import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookFilter({ filterBy, handleSetFilter, booksStats }) {
  //* { title, authors, categories, price, pages }
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    handleSetFilter(filterByToEdit)
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

      default:
        break
    }
    setFilterByToEdit((filterBy) => ({ ...filterBy, [field]: value }))
  }
  const { minPrice, maxPrice, minPages, maxPages } = booksStats
  const { title, price, authors, categories, pages } = filterByToEdit
  return (
    <section className='book-filter'>
      <h2>Filter Our Books</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          name='title'
          onChange={handleChange}
          value={title}
          type='text'
          placeholder='Enter book title'
        />

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
          className='text-center'
        />

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
          className='text-center'
        />

        <label htmlFor='authors'>Authors</label>
        <input
          id='authors'
          name='authors'
          onChange={handleChange}
          value={authors}
          type='text'
          placeholder='Enter author name'
        />

        <label htmlFor='categories'>Category</label>
        <input
          id='categories'
          name='categories'
          onChange={handleChange}
          value={categories}
          type='text'
          placeholder='Enter category'
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
