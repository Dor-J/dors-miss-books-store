export function BookPreview({ book }) {
  const { title, listPrice, thumbnail } = book
  return (
    <article className='book-preview'>
      <h2 className='capitalize'>Title: {title}</h2>
      <h4>
        Price:{' '}
        {!listPrice.isOnSale ? (
          listPrice.amount
        ) : (
          <React.Fragment>
            <span className='text-line-through'>{`${listPrice.amount}`}</span>,
            <span className='text-undeline'>
              {' Discount! '}
              {parseInt(listPrice.amount * 0.7)}
            </span>
          </React.Fragment>
        )}
        {' ' + listPrice.currencyCode}
      </h4>
      <img src={`../assets/img/${thumbnail}`} alt='Book Image' />
    </article>
  )
}
