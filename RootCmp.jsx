import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { HomePage } from './pages/HomePage.jsx'

const { useState } = React

export function App() {
  const [page, setPage] = useState('book')

  function onSetPage(newPage) {
    setPage(newPage)
  }

  return (
    <section className='app'>
      <AppHeader setPage={onSetPage} />

      <main className='main-layout'>
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutUs />}
        {page === 'book' && <BookIndex />}
      </main>
    </section>
  )
}
