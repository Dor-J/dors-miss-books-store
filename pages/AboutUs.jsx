const { Link, Outlet } = ReactRouterDOM
const { useState } = React
import { Accordion } from '../cmps/Accordion.jsx'

export function AboutUs() {
  const [cmpType, setCmpType] = useState('hello')

  function handleGreetClick(value) {
    console.log(`${value} Click!`)
  }

  function Hello({ name, handleClick, age = 0 }) {
    return (
      <h1 onClick={() => handleClick('Hello')}>
        Hello there {name}, you are {age}
      </h1>
    )
  }

  function WelcomeBack({ name, handleClick, age = 0 }) {
    return (
      <h1 onClick={() => handleClick('Welcome Back')}>
        Welcome back {name}, you are {age}
      </h1>
    )
  }

  function DynamicCmp(props) {
    const dynamicCmpsMap = {
      hello: <Hello {...props} />,
      welcomeBack: <WelcomeBack {...props} />,
    }

    return dynamicCmpsMap[props.cmpType]
  }

  return (
    <section className='about-us'>
      <h1 className='text-center'>About Books and us...</h1>
      <h2>React is fun, read the docs</h2>

      <select value={cmpType} onChange={(ev) => setCmpType(ev.target.value)}>
        <option>hello</option>
        <option>welcomeBack</option>
      </select>

      <section className='dynamic-cmps'>
        <DynamicCmp
          age={50}
          cmpType={cmpType}
          name='Popo'
          handleClick={handleGreetClick}
        />
      </section>

      <section>
        <Accordion title='Introduction to Quantum Computing'>
          Quantum computing is an area of computing focused on developing
          computer technology based on the principles of quantum theory. Quantum
          computers use qubits, which can represent and store data in multiple
          states simultaneously.
          <p>🍎</p>
          <button>Btn</button>
        </Accordion>
        <Accordion title='Understanding Machine Learning'>
          Machine learning is a subset of artificial intelligence that focuses
          on building systems that learn from data, improve their performance
          over time without being explicitly programmed, and make decisions
          based on data patterns.
        </Accordion>
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
