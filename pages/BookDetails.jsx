import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBook)
      .catch((err) => {
        console.log('Problem getting book:', err)
      })
  }

  if (!book) return <div>Loading...</div>
  const { title, listPrice, thumbnail, description, authors } = book
  console.log('book', book)

  return (
    <section className='book-details'>
      <div className='book-details'>
        <h1>Book Title: {title}</h1>
        <h2>Book Autor: {authors}</h2>
        <h2>
          Book Price:{' '}
          {!listPrice.isOnSale
            ? listPrice.amount
            : ((
                <span className='text-line-through'>{`${listPrice.amount}`}</span>
              ),
              'Discount! ',
              (
                <span className='text-undeline'>
                  {' '}
                  {parseInt(listPrice.amount * 0.7)}
                </span>
              ))}{' '}
          {listPrice.currencyCode}
        </h2>
        <p>{description}</p>
      </div>
      <img src={`../assets/img/${thumbnail}`} alt='Book Image' />

      <button onClick={onBack}>Back</button>
    </section>
  )
}
