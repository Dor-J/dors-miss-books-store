const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
  const [isLongTxtShown, setIsLongTxtShown] = useState(false)

  function onToggleLongTxt() {
    setIsLongTxtShown((prev) => !prev)
  }

  function getTxtToShow() {
    if (txt.length < length) return txt
    return isLongTxtShown ? txt : txt.substring(0, length) + '...'
  }

  const txtToShow = getTxtToShow()
  return (
    <section className='longTxt'>
      <p>{txtToShow}</p>
      {txt.length > length && (
        <button onClick={onToggleLongTxt}>
          {isLongTxtShown ? 'Less...' : 'More...'}
        </button>
      )}
    </section>
  )
}
