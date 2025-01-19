import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log('Problem getting books:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
      })
      .catch((err) => {
        console.log('Problems removing book:', err)
      })
  }

  function handleSetFilter(filterByToEdit) {
    // console.log('filterByToEdit - index:', filterByToEdit)
    setFilterBy((filterBy) => ({ ...filterBy, ...filterByToEdit }))
  }

  function onSetSelectedbookId(bookId) {
    setSelectedBookId(bookId)
  }

  if (!books) return <div>Loading...</div>
  const { title, price } = filterBy
  return (
    <section className='book-index'>
      <h1 className='text-center'>Miss Book Shop</h1>
      {selectedBookId ? (
        <BookDetails
          onBack={() => setSelectedBookId(null)}
          bookId={selectedBookId}
        />
      ) : (
        <React.Fragment>
          <BookFilter
            handleSetFilter={handleSetFilter}
            filterBy={{ title, price }}
          />
          {/* <BookFilter2 onSetFilter={onSetFilter} filterBy={{ price }} /> */}
          <BookList
            onSetSelectedbookId={onSetSelectedbookId}
            onRemoveBook={onRemoveBook}
            books={books}
          />
        </React.Fragment>
      )}
    </section>
  )
}
