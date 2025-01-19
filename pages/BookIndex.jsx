import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [cars, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  const [selectedbookId, setSelectedbookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log('Problem getting cars:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((cars) => cars.filter((book) => book.id !== bookId))
      })
      .catch((err) => {
        console.log('Problems removing book:', err)
      })
  }

  function onSetFilter(filterByToEdit) {
    // console.log('filterByToEdit - index:', filterByToEdit)
    setFilterBy((filterBy) => ({ ...filterBy, ...filterByToEdit }))
  }

  function onSetSelectedbookId(bookId) {
    setSelectedbookId(bookId)
  }

  if (!cars) return <div>Loading...</div>
  const { txt, minSpeed } = filterBy
  return (
    <section className='book-index'>
      <h1>Book Index!</h1>
      {selectedbookId ? (
        <BookDetails
          onBack={() => setSelectedbookId(null)}
          bookId={selectedbookId}
        />
      ) : (
        <React.Fragment>
          <BookFilter onSetFilter={onSetFilter} filterBy={{ txt, minSpeed }} />
          {/* <BookFilter2 onSetFilter={onSetFilter} filterBy={{ price }} /> */}
          <BookList
            onSetSelectedbookId={onSetSelectedbookId}
            onRemoveBook={onRemoveBook}
            cars={cars}
          />
        </React.Fragment>
      )}
    </section>
  )
}
