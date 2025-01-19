import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { demoBooks } from '../assets/demoData/books.js'

const MISS_BOOKS_KEY = 'MISS_BOOKS_DB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(MISS_BOOKS_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }
    if (filterBy.price) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.price)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(MISS_BOOKS_KEY, bookId)
}

function remove(bookId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(MISS_BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(MISS_BOOKS_KEY, book)
  } else {
    return storageService.post(MISS_BOOKS_KEY, _createBook(book.title))
  }
}

function getDefaultFilter() {
  return { title: '', price: '' }
}

function _createBooks() {
  let books = loadFromStorage(MISS_BOOKS_KEY)
  if (!books || !books.length) {
    books = demoBooks
    saveToStorage(MISS_BOOKS_KEY, books)
  }
}

function _createBook(title) {
  const book = _getEmptyBook(title)
  if (!book.id) book.id = makeId(11)
  return book
}

function _getEmptyBook(
  title = '',
  price = 0,
  publishedDate = new Date.now().getFullYear()
) {
  return {
    title,
    subtitle: '',
    authors: [],
    publishedDate,
    description: '',
    pageCount: 0,
    categories: [],
    thumbnail: '',
    language: '',
    listPrice: {
      amount: price,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
}
