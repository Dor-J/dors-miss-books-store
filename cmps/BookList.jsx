import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, onSetSelectedbookId }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id}>
          <BookPreview book={book} />
          <section>
            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
            <button onClick={() => onSetSelectedbookId(book.id)}>Select</button>
          </section>
        </li>
      ))}
    </ul>
  )
}
