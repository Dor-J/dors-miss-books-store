const { useRef } = React

import { animateCSS } from '../services/util.service.js'

export function HomePage() {
  const h1Ref = useRef()
  const h2Ref = useRef()

  function onActivate() {
    animateCSS(h1Ref.current, 'rubberBand').then(() => {
      animateCSS(h2Ref.current, 'bounceOut', false)
    })
  }

  return (
    <section className='home'>
      <h1 ref={h1Ref} className='text-center'>
        Do Books Hhop!
      </h1>
      <h2 ref={h2Ref}>Welcome to ReactBook Book Shop!!!</h2>
      <button onClick={onActivate}>Do not Press</button>

      <p>This book shop is made just for you!</p>
    </section>
  )
}
