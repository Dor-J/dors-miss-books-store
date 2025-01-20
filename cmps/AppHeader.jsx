const { NavLink } = ReactRouterDOM

export function AppHeader({ setPage }) {
  function onSetPage(ev, page) {
    ev.preventDefault()
    setPage(page)
  }

  return (
    <header className='app-header full main-layout'>
      <section>
        <div className='logo'>React Book App</div>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About Us</NavLink>
          <NavLink to='/book'>Books</NavLink>
        </nav>
      </section>
    </header>
  )
}
