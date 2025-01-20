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
        console.error('Problem getting books:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
      })
      .catch((err) => {
        console.error('Problems removing book:', err)
      })
  }

  function handleSetFilter(filterByToEdit) {
    setFilterBy((filterBy) => ({ ...filterBy, ...filterByToEdit }))
  }

  function handleSetSelectedbookId(bookId) {
    setSelectedBookId(bookId)
  }

  function getBooksStats(books) {
    const booksStats = books.reduce(
      (acc, book) => {
        const bookPrice = book.listPrice.amount
        const bookPages = book.pageCount

        if (bookPrice < acc) acc.minPrice = bookPrice
        if (bookPrice > acc) acc.maxPrice = bookPrice

        if (bookPages < acc) acc.minPages = bookPages
        if (bookPages > acc) acc.maxPages = bookPages

        return acc
      },
      { minPrice: 1000000, maxPrice: 0, minPages: 1000000, maxPages: 0 }
    )
    return booksStats
  }

  if (!books) return <div>Loading...</div>
  const { title, price, authors, categories, pages } = filterBy
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
            filterBy={{ title, price, authors, categories, pages }}
            booksStats={getBooksStats(books)}
          />

          {!!books.length && (
            <BookList
              handleSetSelectedbookId={handleSetSelectedbookId}
              onRemoveBook={onRemoveBook}
              books={books}
            />
          )}
        </React.Fragment>
      )}
    </section>
  )
}
