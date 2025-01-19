export function BookPreview({ book }) {
  const { title, listPrice, thumbnail } = book
  return (
    <article className='book-preview'>
      <h2>Vendor: {title}</h2>
      <h4>Book Speed: {listPrice.amount} km/h</h4>
      <img src={`../assets/img/${thumbnail}`} alt='Book Image' />
    </article>
  )
}
