const { NavLink } = ReactRouterDOM

export function AppHeader() {
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
