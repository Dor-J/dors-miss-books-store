import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, handleSetSelectedbookId }) {
  return (
    <section className='books-list-container'>
      <ul className='book-list'>
        {books.map((book) => (
          <li key={book.id}>
            <BookPreview book={book} />
            <section>
              <button onClick={() => onRemoveBook(book.id)}>Remove</button>
              <button onClick={() => handleSetSelectedbookId(book.id)}>
                Select
              </button>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}
