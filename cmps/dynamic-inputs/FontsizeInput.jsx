export function FontsizeInput({ name = 'there', onSetFooterStyle, fontSize }) {
  function onSetFontSize({ target }) {
    const fontSize = target.value + 'px'
    onSetFooterStyle({ fontSize })
  }

  return (
    <section className='fontsize-input'>
      <div className='items-container'>
        <label htmlFor='fontSize'>{fontSize}</label>
        <input
          type='range'
          name='fontSize'
          id='fontSize'
          min={14}
          max={26}
          value={parseInt(fontSize)}
          onChange={onSetFontSize}
        />
      </div>
      <h3>Hello {name}! pick a font size!</h3>
    </section>
  )
}
