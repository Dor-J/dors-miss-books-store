const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { getTruthyValues } from '../services/util.service.js'

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    bookService.getFilterFromSearchParams(searchParams)
  )
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    setSearchParams(getTruthyValues(filterBy))
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.error('Problem getting books:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book ${bookId} Removed`)
      })
      .catch((err) => {
        console.error('Problems removing book:', err)
        showErrorMsg(`Cannot Remove Book ${bookId}`)
      })
  }

  function handleSetFilter(filterByToEdit) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterByToEdit }))
  }

  function handleSetSelectBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function getBooksStats(books) {
    const booksStats = books.reduce(
      (acc, book) => {
        const bookPrice = book.listPrice.amount
        const bookPages = book.pageCount

        if (bookPrice < acc.minPrice) acc.minPrice = bookPrice
        if (bookPrice > acc.maxPrice) acc.maxPrice = bookPrice

        if (bookPages < acc.minPages) acc.minPages = bookPages
        if (bookPages > acc.maxPages) acc.maxPages = bookPages

        return acc
      },
      { minPrice: 10000, maxPrice: 0, minPages: 1000000, maxPages: 0 }
    )
    return booksStats
  }

  if (!books) return <div>Loading...</div>
  const booksStats = getBooksStats(books)
  const { title, price, authors, categories, pages } = filterBy
  return (
    <section className='book-index'>
      <h1 className='text-center'>React Book Shop</h1>
      {selectedBookId ? (
        <BookDetails
          onBack={() => handleSetSelectBookId(null)}
          bookId={selectedBookId}
        />
      ) : (
        <React.Fragment>
          <BookFilter
            handleSetFilter={handleSetFilter}
            filterBy={{ title, price, authors, categories, pages }}
            booksStats={booksStats}
          />

          <button>
            <Link to='/book/edit'>Add Book</Link>
          </button>

          {!!books.length && (
            <BookList onRemoveBook={onRemoveBook} books={books} />
          )}
        </React.Fragment>
      )}
    </section>
  )
}
