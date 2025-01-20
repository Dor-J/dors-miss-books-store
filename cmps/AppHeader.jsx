export function AppHeader({ setPage }) {
  function onSetPage(ev, page) {
    ev.preventDefault()
    setPage(page)
  }

  return (
    <header className='app-header full main-layout'>
      <section>
        <div
          className='logo'
          onClick={() => {
            onSetPage('home')
          }}
        >
          React Book App
        </div>
        <nav className='app-nav'>
          <a onClick={(ev) => onSetPage(ev, 'home')} href=''>
            Home
          </a>
          <a onClick={(ev) => onSetPage(ev, 'about')} href=''>
            About
          </a>
          <a onClick={(ev) => onSetPage(ev, 'book')} href=''>
            Books
          </a>
        </nav>
      </section>
    </header>
  )
}
