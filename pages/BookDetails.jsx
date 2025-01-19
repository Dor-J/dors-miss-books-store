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

  function pageCountText(pageCount) {
    if (pageCount > 500) {
      return 'Serious Reading'
    } else if (pageCount > 200) {
      return 'Descent Reading'
    } else if (pageCount > 100) {
      return ''
    } else {
      return 'Light Reading'
    }
  }
  function pageCountHighlight(pageCount) {
    if (pageCount > 500) {
      return 'page-count-high'
    } else if (pageCount > 200) {
      return 'page-count-medium'
    } else if (pageCount > 100) {
      return 'page-count-low'
    } else {
      return ''
    }
  }
  function publishedDateText(publishedDate) {
    const currYear = new Date().getFullYear()
    if (currYear - publishedDate >= 10) {
      return 'Vintage'
    } else if (currYear - publishedDate <= 1) {
      return 'New'
    } else return ''
  }

  function publishedDateHighlight(publishedDate) {
    const currYear = new Date().getFullYear()
    if (currYear - publishedDate >= 10) {
      return 'page-count-high'
    } else if (currYear - publishedDate <= 1) {
      return 'page-count-medium'
    } else return ''
  }
  function priceHighlight(price) {
    if (price > 150) {
      return 'color-red'
    } else if (price < 20) {
      return 'color-green'
    } else return ''
  }

  if (!book) return <div>Loading...</div>
  const {
    title,
    listPrice,
    thumbnail,
    description,
    authors,
    pageCount,
    publishedDate,
  } = book

  return (
    <section className='book-details'>
      <div className='book-details'>
        <h1>Book Title: {title}</h1>
        <h2>
          Book{' '}
          {authors.length > 1
            ? `Autors: ${authors.map((author) => ` ${author}`)}`
            : `Autor: ${authors}`}
        </h2>
        <h2>
          Number of Pages: {pageCount}{' '}
          <span className={`text-underline ${pageCountHighlight(pageCount)}`}>
            {pageCountText(pageCount)}
          </span>
        </h2>
        <h2>
          Publihed Year: {publishedDate}{' '}
          <span
            className={`text-underline ${publishedDateHighlight(
              publishedDate
            )}`}
          >
            {publishedDateText(publishedDate)}
          </span>
        </h2>
        <h2>
          Book Price:{' '}
          {!listPrice.isOnSale ? (
            listPrice.amount
          ) : (
            <React.Fragment>
              <span
                className={`text-line-through ${priceHighlight(
                  listPrice.amount
                )}`}
              >{`${listPrice.amount}`}</span>
              ,
              <span className='text-undeline'>
                {' Discount! '}
                {parseInt(listPrice.amount * 0.7)}
              </span>
            </React.Fragment>
          )}{' '}
          {listPrice.currencyCode}
        </h2>
        <p>{description}</p>
      </div>
      <div className={`image-container ${listPrice.isOnSale && 'on-sale'}`}>
        <img src={`../assets/img/${thumbnail}`} alt='Book Image' />
      </div>

      <button onClick={onBack}>Back</button>
    </section>
  )
}
