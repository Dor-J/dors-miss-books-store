import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
  //* { txt: '', minSpeed: '' }
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function onSubmit(ev) {
    ev.preventDefault()
    console.log('Submit filter')
    onSetFilter(filterByToEdit)
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

  // function onTxtChange(ev) {
  //     setFilterByToEdit(filterBy => ({ ...filterBy, txt: ev.target.value }))
  // }

  // function onMinSpeedChange(ev) {
  //     setFilterByToEdit(filterBy => ({ ...filterBy, minSpeed: ev.target.value }))
  // }

  const { txt, minSpeed } = filterByToEdit
  return (
    <section className='book-filter'>
      <h2>Filter Our Books</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='txt'>Vendor</label>
        <input
          id='txt'
          name='txt'
          onChange={handleChange}
          value={txt}
          type='text'
        />

        <label htmlFor='minSpeed'>Min Speed</label>
        <input
          id='minSpeed'
          name='minSpeed'
          onChange={handleChange}
          value={minSpeed || ''}
          type='number'
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
