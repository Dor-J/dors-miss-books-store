const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {
  return (
    <section className='about-us'>
      <h1 className='text-center'>About Books and us...</h1>
      <h2>React is fun, read the docs</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore
        sapiente, iste animi corporis nisi atque tempora assumenda dolores.
        Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam
        necessitatibus!
      </p>

      <nav>
        <Link replace to='/about/team'>
          Team
        </Link>{' '}
        |
        <Link replace to='/about/vision'>
          Vision
        </Link>
      </nav>

      <Outlet />
    </section>
  )
}
