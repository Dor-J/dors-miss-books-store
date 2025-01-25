const { Link, Outlet } = ReactRouterDOM
const { useState } = React

export function AboutUs() {
  const [cmpType, setCmpType] = useState('hello')

  function handleGreetClick(value) {
    console.log(`${value} Click!`)
  }

  function ReadDocs({ name, handleClick, age = 0 }) {
    return (
      <h1 onClick={() => handleClick('Hello')}>
        Hello there {name}, Good job reading those docs.
      </h1>
    )
  }

  function NotReadDocs({ name, handleClick, age = 0 }) {
    return (
      <h1 onClick={() => handleClick('Welcome Back')}>
        Hi {name}, you should read the docs.. seriously..
      </h1>
    )
  }

  function DynamicCmp(props) {
    const dynamicCmpsMap = {
      read: <ReadDocs {...props} />,
      notRead: <NotReadDocs {...props} />,
    }

    return dynamicCmpsMap[props.cmpType]
  }

  return (
    <section className='about-us'>
      <h2 className='text-center'>About Do Books and us...</h2>
      <p>
        Do Books from the owners of DoApp platfom and DoMail and DoKeep amazing
        producs
      </p>
      <h2>React is fun, read the docs</h2>

      <label htmlFor='readDocs'>Did you read the docs?</label>
      <select
        id={'readDocs'}
        name={'readDocs'}
        value={cmpType}
        onChange={(ev) => setCmpType(ev.target.value)}
      >
        <option value={''}>(Uncertain)</option>
        <option value={'notRead'}>Not Read</option>
        <option value={'read'}>Read</option>
      </select>

      <section className='dynamic-cmps'>
        <DynamicCmp
          age={50}
          cmpType={cmpType}
          name='Popo'
          handleClick={handleGreetClick}
        />
      </section>

      <nav>
        <Link replace to='/about/team'>
          Our Team
        </Link>
        {' | '}
        <Link replace to='/about/goal'>
          Our Goals
        </Link>
        {' | '}
        <Link replace to='/about/dashboard'>
          DashBoard
        </Link>
      </nav>

      <Outlet />
    </section>
  )
}
