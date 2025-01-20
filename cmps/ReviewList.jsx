import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ book, onRemoveReview }) {
  const { title } = book

  return (
    <section className='review-list'>
      <h3>Reviews for {title}</h3>
      <ul className='book-list'>
        {book.reviews.map((review) => (
          <li key={review.id}>
            <ReviewPreview review={review} />
            <button onClick={() => onRemoveReview(book.id, review.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
