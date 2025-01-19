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

  function getBooksStats(books) {
    const booksStats = { minPrice: 0, maxPrice: 0, minPages: 0, maxPages: 0 }
    booksStats.minPrice = books.reduce((acc, book) => {
      const bookPrice = book.listPrice.amount
      if (bookPrice < acc) acc = bookPrice
      return acc
    }, 100000)
    booksStats.maxPrice = books.reduce((acc, book) => {
      const bookPrice = book.listPrice.amount
      if (bookPrice > acc) acc = bookPrice
      return acc
    }, 0)
    booksStats.minPages = books.reduce((acc, book) => {
      const bookPages = book.pageCount
      if (bookPages < acc) acc = bookPages
      return acc
    }, 100000)
    booksStats.maxPages = books.reduce((acc, book) => {
      const bookPages = book.pageCount
      if (bookPages > acc) acc = bookPages
      return acc
    }, 0)
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
