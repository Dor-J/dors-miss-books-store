import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookFilter({ filterBy, handleSetFilter }) {
  //* { txt: '', price: '' }
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

  const { title, price } = filterByToEdit
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
        />

        <label htmlFor='price'>Min Price</label>
        <input
          id='price'
          name='price'
          onChange={handleChange}
          value={`${price}` || ''}
          type='number'
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
