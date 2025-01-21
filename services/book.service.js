import { storageService } from './async-storage.service.js'
import {
  loadFromStorage,
  makeId,
  saveToStorage,
  makeLorem,
  getRandomIntInclusive,
} from './util.service.js'
import { demoBooks } from '../assets/demoData/books.js'

const BOOKS_KEY = 'booksDB'
const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}
// _createBooks()
_createDemoBooks()

export const bookService = {
  // Book CRUDL
  query,
  get,
  remove,
  save,
  getEmptyBook,
  // Filter
  getDefaultFilter,
  getFilterFromSearchParams,
  // Reviews
  addReview,
  getEmptyReview,
  getReviews,
  removeReview,
  getDefaultReview,
  // Google
  getGoogleBooks,
  addGoogleBook,
}

// Add bookService to window
window.bs = bookService

/////////////////////////////////////// CRUDL//////////////////////////////////////////
function query(filterBy = {}) {
  return storageService.query(BOOKS_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }

    if (filterBy.authors) {
      const regExp = new RegExp(filterBy.authors, 'i')
      books = books.filter((book) => {
        if (book.authors.length === 1) return regExp.test(book.authors)
        return book.authors.some((author) => regExp.test(author))
      })
    }

    if (filterBy.categories) {
      const regExp = new RegExp(filterBy.categories, 'i')
      books = books.filter((book) => {
        if (book.categories.length === 1) return regExp.test(book.categories)
        return book.categories.some((categorie) => regExp.test(categorie))
      })
    }

    if (filterBy.price) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.price)
    }

    if (filterBy.pages) {
      books = books.filter((book) => book.pageCount >= filterBy.pages)
    }

    return books
  })
}

function getDefaultFilter() {
  return { title: '', price: '', categories: '', authors: '', pages: '' }
}

function getFilterFromSearchParams(searchParams) {
  const title = searchParams.get('title') || ''
  const price = searchParams.get('price') || ''
  const categories = searchParams.get('categories') || ''
  const authors = searchParams.get('authors') || ''
  const pages = searchParams.get('pages') || ''
  return {
    title,
    price,
    categories,
    authors,
    pages,
  }
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId).then((book) => {
    if (!book) {
      console.error('Book not found:', bookId)
      throw new Error('Book not found')
    }
    return _setNextPrevBookId(book)
  })
}

function _setNextPrevBookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]
    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id
    return book
  })
}

function remove(bookId) {
  // return Promise.reject('DEBUG: Promise rejected')
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOKS_KEY, book)
  } else {
    const newBook = _createBook(book.title, book.amount)
    return storageService.post(BOOKS_KEY, newBook)
  }
}

function _createDemoBooks() {
  let books = loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    books = demoBooks
    saveToStorage(BOOKS_KEY, books)
  }
}

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const books = []
  for (let i = 0; i < 20; i++) {
    const book = {
      id: makeId(),
      title: makeLorem(2),
      subtitle: makeLorem(4),
      authors: [makeLorem(1)],
      publishedDate: getRandomIntInclusive(1950, 2024),
      description: makeLorem(20),
      pageCount: getRandomIntInclusive(20, 600),
      categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    }
    books.push(book)
  }
}

function _createBook(title, amount) {
  const book = getEmptyBook(title, amount)
  if (!book.id) book.id = makeId(11)
  return book
}

function getEmptyBook(
  title = '',
  amount = '',
  description = '',
  pageCount = '',
  language = 'en',
  authors = ''
) {
  return {
    title,
    subtitle: '',
    authors,
    publishedDate: getRandomIntInclusive(1950, 2024),
    description,
    pageCount,
    categories: [],
    thumbnail: `/assets/booksImages/${getRandomIntInclusive(1, 20)}.jpg`,
    language,
    listPrice: {
      amount,
      currencyCode: 'EUR',
      isOnSale: Math.random() > 0.7,
    },
  }
}

/////////////////////////////////////// REVIEWS//////////////////////////////////////////
function addReview(bookId, newReview) {
  newReview.id = makeId(5)
  return get(bookId)
    .then((book) => {
      if (!book.reviews) book.reviews = []
      book.reviews.push(newReview)
      return storageService.put(BOOKS_KEY, book).then((book) => book)
    })
    .catch((err) => console.error('error adding review' + err))
}

function removeReview(bookId, reviewId) {
  return get(bookId)
    .then((book) => {
      if (!book.reviews) {
        console.error('no reviews found for this book')
        throw new Error('no reviews to remove')
      }

      book.reviews = book.reviews.filter((review) => review.id !== reviewId)
      return book
    })
    .then((book) => storageService.put(BOOKS_KEY, book))
    .catch((err) => console.error('error remiving review' + err))
}

function getReviews(bookId) {
  const book = get(bookId)
  if (!book.reviews || !book.reviews.length) return null
  return book.reviews
}

function getEmptyReview() {
  return {
    fullname: '',
    rating: 0,
    readAt: new Date().toISOString().slice(0, 10),
    txt: '',
  }
}

function getDefaultReview() {
  return {
    fullName: 'new name',
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    txt: '',
    selected: 0,
  }
}

/////////////////////////////////////// GOOGLE //////////////////////////////////////////
function addGoogleBook(book) {
  if (book.id === '' || !book.id) {
    book.id = makeId(10)
  }
  return storageService.post(BOOKS_KEY, book, false)
}

function getGoogleBooks(bookName) {
  if (!bookName) return Promise.reject('No book name!')
  const googleBooks = gCache[bookName]
  if (googleBooks) {
    console.log('data from storage...', googleBooks)
    return Promise.resolve(googleBooks)
  }

  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
  return axios.get(url).then((res) => {
    const data = res.data.items
    console.log('data from network...', data)
    const books = _formatGoogleBooks(data)
    gCache[bookName] = books
    utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
    return books
  })
}

function _formatGoogleBooks(googleBooks) {
  return googleBooks.map((googleBook) => {
    const { volumeInfo } = googleBook
    const book = {
      id: googleBook.id,
      title: volumeInfo.title,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      authors: volumeInfo.authors,
      categories: volumeInfo.categories,
      publishedDate: volumeInfo.publishedDate,
      language: volumeInfo.language,
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
      reviews: [],
    }
    if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
    return book
  })
}
