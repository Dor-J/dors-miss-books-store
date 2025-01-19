const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
  const [renderedText, setRenderedText] = useState(null)
  const [isTextFullDisplay, setIsTextFullDisplay] = useState(false)

  useEffect(() => {}, [])

  useEffect(() => {
    if (
      txt.split(' ').length < length ||
      (isTextFullDisplay && txt.split(' ').length > length)
    ) {
      setRenderedText((renderedText) => txt)
    } else {
      setRenderedText((renderedText) =>
        txt
          .split(' ')
          .reduce((acc, word, idx) => {
            if (idx + 1 < length) acc.push(word)
            return acc
          }, [])
          .join(' ')
      )
    }
  }, [isTextFullDisplay])

  function onToggleDisplay(ev) {
    ev.preventDefault()
    setIsTextFullDisplay((isTextFullDisplay) => !isTextFullDisplay)
  }

  function renderTextSpan() {
    return !isTextFullDisplay ? (
      <span onClick={(event) => onToggleDisplay(event)}>Read more</span>
    ) : (
      <span onClick={(event) => onToggleDisplay(event)}>Read less</span>
    )
  }

  return (
    <section className='long-txt'>
      <p>
        {renderedText && renderedText} {renderTextSpan()}
      </p>
    </section>
  )
}
