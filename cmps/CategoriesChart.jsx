const { useState, useEffect, useRef } = React
import { bookService } from '../services/book.service.js'

export function CategoriesChart() {
  const [categories, setCategories] = useState(null) //{ [categoryName]: count}
  const [chart, setChart] = useState(null)

  const elContainerRef = useRef()
  const elCanvasRef = useRef()
  const ctxRef = useRef(null)

  function onResize() {
    if (elContainerRef.current && elCanvasRef.current) {
      elCanvasRef.current.width = elContainerRef.current.clientWidth
      elCanvasRef.current.height = elContainerRef.current.clientHeight
      if (chart) {
        chart.resize()
      }
    }
  }

  useEffect(() => {
    ctxRef.current = elCanvasRef.current.getContext('2d')
    window.addEventListener('resize', onResize)

    setupCategories()
      .then((categories) => {
        setCategories(categories)
        return loadChart(categories)
      })
      .then(setChart)
      .catch((err) => console.error(err))

    return () => {
      window.removeEventListener('resize', onResize)
      if (chart) {
        chart.destroy()
        setChart(null) // Clear chart reference
      }
    }
  }, [])

  async function setupCategories() {
    const books = await bookService.query()
    const categoriesMap = books.reduce((acc, book) => {
      book.categories.forEach((category) => {
        if (!acc[category]) acc[category] = 0
        acc[category] += 1
      })
      return acc
    }, {})

    return categoriesMap
  }

  function loadChart(categories) {
    const categoryNames = Object.keys(categories)
    const categoryCount = Object.values(categories)

    const newChart = new Chart(ctxRef.current, {
      type: 'bar',
      data: {
        labels: categoryNames,
        datasets: [
          {
            label: 'Count',
            data: categoryCount,
            fill: true,
            backgroundColor: '#5fa2c199',
            borderWidth: 3,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Book Categories',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
    return newChart
  }

  return (
    <section className='categories-chart'>
      <h1>Categories chart</h1>

      <div ref={elContainerRef} className='canvas-container'>
        <canvas ref={elCanvasRef} className='chart'></canvas>
      </div>
    </section>
  )
}
