export function ReviewPreview({ review }) {
  function getRatingInStars(rating) {
    return '⭐'.repeat(rating)
  }

  const { fullname, rating, readAt } = review
  return (
    <article className='review-preview'>
      <div className='review-card-details'>
        <div className='review-card-detail'>
          <span className='review-card-details-title'>Full Name:</span>
          <span className='review-card-details-info'>{fullname}</span>
        </div>
        <div className='review-card-detail'>
          <span className='review-card-details-title'>Rating:</span>
          <span className='review-card-details-info'>
            {getRatingInStars(rating)}
          </span>
        </div>
        <div className='review-card-detail'>
          <span className='review-card-details-title'>Read at Date:</span>
          <span className='review-card-details-info'>{readAt}</span>
        </div>
      </div>
    </article>
  )
}
