export function BookPreview({ book }) {
  const { title, listPrice, thumbnail, authors, language } = book
  const { amount, currencyCode, isOnSale } = listPrice
  return (
    <article className='book-preview'>
      <div className='book-card-select-book'>
        <h2 className='book-card-title capitalize'>{book.title}</h2>
        <div className={`image-container ${isOnSale && 'on-sale'}`}>
          <img
            src={`${thumbnail}`}
            alt='Book Image'
            className='book-card-thumbnail'
            onError={({ currentTarget }) =>
              (currentTarget.src = '../assets/img/default-book.png')
            }
          />
        </div>
      </div>

      <div className='book-card-details'>
        <div className='book-card-detail'>
          <span className='book-card-details-title'>Author:</span>
          <span className='book-card-details-info'>{authors}</span>
        </div>

        <div className='book-card-detail'>
          <h4 className='book-card-details-title'>Price:</h4>
          <h4 className='book-card-details-info'>
            {!isOnSale ? (
              amount
            ) : (
              <React.Fragment>
                <span className='text-line-through'>{`${amount}`}</span>,
                <span className='text-undeline'>
                  {' Discount! '}
                  {parseInt(amount * 0.7).toLocaleString(language, {
                    style: 'currency',
                    currency: currencyCode,
                  })}
                </span>
              </React.Fragment>
            )}
          </h4>
        </div>
      </div>
    </article>
  )
}
