const { Link } = ReactRouterDOM

import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <section className='books-list-container'>
      <ul className='book-list'>
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />
            <div className='btns-container'>
              <button onClick={() => onRemoveBook(book.id)}>Remove</button>
              <button>
                <Link to={`/book/${book.id}`}>Details</Link>
              </button>
              <button>
                <Link to={`/book/edit/${book.id}`}>Edit</Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
