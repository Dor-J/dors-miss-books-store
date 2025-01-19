import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { demoBooks } from '../assets/demoData/books.js'

const MISS_BOOKS_KEY = 'MISS_BOOKS_DB'
_createDemoBooks()

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

    if (filterBy.pageCount) {
      books = books.filter((book) => book.pageCount >= filterBy.pageCount)
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

function _createDemoBooks() {
  let books = loadFromStorage(MISS_BOOKS_KEY)
  if (!books || !books.length) {
    books = demoBooks
    saveToStorage(MISS_BOOKS_KEY, books)
  }
}

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const books = []
  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    }
    books.push(book)
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
