import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { AddReview } from '../cmps/AddReview.jsx'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.error('Problem getting book:', err)
      })
  }

  function onBack() {
    navigate('/book')
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

  function getBookLng(lng) {
    switch (lng) {
      case 'he':
        return 'Hebrew'
      case 'sp':
        return 'Spanish'
      default:
        return 'English'
    }
  }

  function onRemoveReview(bookId, reviewId) {
    bookService
      .removeReview(bookId, reviewId)
      .then(() => {
        showSuccessMsg(`Review ${reviewId} Removed`)
        setBook((prevBook) => ({
          ...prevBook,
          reviews: prevBook.reviews.filter((review) => review.id !== reviewId),
        }))
      })
      .catch((err) => {
        console.error('Problems removing review:', err)
        showErrorMsg(`Cannot Remove review ${reviewId}`)
      })
  }

  function onAddReview(bookWithReview) {
    return setBook((prevBook) => ({
      ...prevBook,
      ...bookWithReview,
    }))
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
    categories,
    subtitle,
    language,
    prevBookId,
    nextBookId,
  } = book

  const { amount, currencyCode, isOnSale } = listPrice

  return (
    <section className='book-details'>
      <div className='book-details'>
        <h1 className='book-details-title'>Book Title: {title}</h1>
        <h4 className='book-details-subtitle'>{subtitle}</h4>

        <div className='book-details-info'>
          <div className='book-details-info-row'>
            <h2 className='book-details-info-title'>Publihed Year:</h2>
            <h3 className='book-details-info-text>'>
              {publishedDate}{' '}
              <span
                className={`text-underline ${publishedDateHighlight(
                  publishedDate
                )}`}
              >
                {publishedDateText(publishedDate)}
              </span>
            </h3>
          </div>

          <div className='book-details-info-row'>
            <h2 className='book-details-info-title'>
              Author{authors.length > 1 ? 's' : ''}:
            </h2>
            <span className='book-details-info-text'>
              {typeof authors !== 'string'
                ? authors.length > 1
                  ? `Autors: ${authors.map((author) => ` ${author}`)}`
                  : `Autor: ${authors}`
                : `Autor: ${authors}`}
            </span>
          </div>

          <div className='book-details-info-row'>
            <h3 className='book-details-info-title'>Language:</h3>
            <span className='book-details-info-text'>
              {getBookLng(language)}
            </span>
          </div>

          <div className='book-details-info-row'>
            <h4 className='book-details-info-title'>Categories</h4>
            <ul className='book-details-info-text categories-list w100'>
              {categories.map((category) => (
                <li key={category}>{`${category}`}</li>
              ))}
            </ul>
          </div>

          <div className='book-details-info-row'>
            <h2 className='book-details-info-title'>Pages:</h2>
            <span className='book-details-info-text'>
              {pageCount}{' '}
              <span
                className={`text-underline ${pageCountHighlight(pageCount)}`}
              >
                {pageCountText(pageCount)}
              </span>
            </span>
          </div>

          <div className='book-details-info-row'>
            <h2 className='book-details-info-title'>Price:</h2>
            <span className={'book-details-info-text'}>
              for only{' '}
              {!isOnSale ? (
                amount
              ) : (
                <React.Fragment>
                  <span
                    className={`text-line-through ${priceHighlight(amount)}`}
                  >{`${amount}`}</span>
                  ,
                  <span className='text-undeline'>
                    {' Discount! '}
                    {parseInt(amount * 0.7)}
                  </span>
                </React.Fragment>
              )}{' '}
              {currencyCode}
            </span>
          </div>
          <h2></h2>
          <div className='book-details-info-row'>
            <h4 className='book-details-info-title'>Description</h4>
            <LongTxt txt={description} />
          </div>
        </div>

        <div className='book-thumbnail-container'>
          <div className={`image-container ${isOnSale && 'on-sale'}`}>
            <img src={`${thumbnail}`} alt='Book Image' />
          </div>
        </div>
      </div>

      <div className='btns flex align-center justify-center w100'>
        <div className='actions-btns'>
          <button className='btn-back' onClick={onBack}>
            <Link to='/book/'>⬅ Go back</Link>
          </button>
          {prevBookId && (
            <button className='btn-prev'>
              <Link to={`/book/${prevBookId}`}>Previous Book</Link>
            </button>
          )}
          {nextBookId && (
            <button className='btn-next'>
              <Link to={`/book/${nextBookId}`}>Next Book</Link>
            </button>
          )}
        </div>

        {
          <button
            className='buy-book-btn'
            onClick={() => alert(`feature in development...`)}
          >
            Buy it now! {isOnSale && "It's on sale!"}
          </button>
        }
      </div>

      <section className='reviews'>
        {book.reviews && (
          <ReviewList book={book} onRemoveReview={onRemoveReview} />
        )}
        <AddReview book={book} onAddReview={onAddReview} />
      </section>
    </section>
  )
}
